import * as React from 'react'
import { ViewState } from 'react-map-gl'
import { AppMap } from '../AppMap'
import { Container } from './Container'
import { CaseTree } from './CaseTree'
import { FeatureMarkerLayer } from '../FeatureMarkerLayer'
import { FeatureCollection, Point, Feature, Geometry } from 'geojson'
import { IFeatureProperties, ILayer, UserFeature, IUserFeatureProperties, IFeatureIndex, FeatureId, IUserFeatureSchema } from '../../app/types'
import { Button, Select, Drawer, Spin, Icon, Switch, Modal, Dropdown, Menu } from 'antd'
import { createFeatureInLocation, deleteFeatureId, updateFeature, createLayer, deleteLayer, updateLayer, createFeatureInLocationAndAssignToLayer } from '../../app/api'
import { filterFeatures, replaceFeatureWithProperties, updateFeaturePointLocation, addFeature, createGeojson, changeFeatureProperties } from '../../lib/geojson'
import { makeUnique } from '../../lib/text'
import { Json } from '../Json'
import { createFeatureFilter } from './lib'

import '../../style.css'
import { LayerPanel } from '../LayerPanel'
import { FeatureAttributesEditor } from '../FeatureAttributesEditor';
import { sleep } from '../../lib/time';
import { EditLayerModal } from '../EditLayerModal'
import { ActionButton } from '../ActionButton'
import { UserFeatureEditor } from '../UserFeatureEditor'

type FC = FeatureCollection<Point, IFeatureProperties>
const ADD_FEATURE_TOOL = 'ADD_FEATURE_TOOL'
const MOVE_FEATURE_TOOL = 'MOVE_FEATURE_TOOL'

const ACTION_LAYER_ADD = 'ACTION_LAYER_ADD'
const ACTION_LAYER_DELETE = 'ACTION_LAYER_DELETE'
const ACTION_LAYER_SET = 'ACTION_LAYER_SET'
const ACTION_FEATURE_DELETE = 'ACTION_FEATURE_DELETE'
const ACTION_FEATURE_SET = 'ACTION_FEATURE_SET'
const ACTION_FEATURE_SET_PROPERTY = 'ACTION_FEATURE_SET_PROPERTY'
const ACTION_FEATURE_SET_PROPERTIES = 'ACTION_FEATURE_SET_PROPERTIES'

function numToStr(value: number): string {
    return value ? `${value}` : ''
}

function createDefaultScheme(): IUserFeatureSchema {
    return {
        editor: "custom",
        fields: [
            { field: 'name', view: ['input'] }
        ]
    }
}

function resolveUserFeatureSchema(code: string): IUserFeatureSchema {
    try {
        const schema = JSON.parse(code)
        const editor = schema['editor']
        if (['case-table', 'json'].includes(editor)) {
            return {
                editor,
                fields: []
            }
        }

        if (Array.isArray(schema['fields'])) {
            return schema
        }

        return createDefaultScheme()
    } catch (error) {
        return createDefaultScheme()
    }
}

export enum ViewMode {
    all = 'all',
    liked = 'liked',
}

export interface IMapViewport extends ViewState {
    transitionDuration?: number
}

export interface IAppProps {
    mapboxToken: string
    center: [number, number]
    zoom: number
    layers: {
        name: string
        color: string
        data: FeatureCollection<Point, { [name: string]: any }>
    }[]
    userLayers: ILayer[]
    featureIndex: IFeatureIndex<any, Point>
    data: FC
    defaultCheckedCaseKeys: string[]
    drawerPlacement: 'right' | 'left' | 'bottom' | 'top'
    mapStyle: string
    mapStyleOption: string
    mapStyleOptions: { value: string, name: string }[]
    onChangeMapStyleOption: (value: string) => void
}

function selectFeatures<T, G extends Geometry = Geometry>(featureIndex: IFeatureIndex<T, G>, featureIds: number[] = []): FeatureCollection<G, T> {
    const features = featureIds
        .map(id => featureIndex[id])
        .filter(Boolean)
    return createGeojson(features)
}

function featuresIndexReducer(state: any, action) {
    if (action.type === ACTION_FEATURE_SET) {
        const feature: UserFeature = action.payload
        return {
            ...state,
            [feature.id]: feature,
        }
    }

    if (action.type === ACTION_FEATURE_DELETE) {
        const featureId: FeatureId = action.payload.featureId
        const newState = {
            ...state,
        }
        delete newState[featureId]
        return newState
    }

    if (action.type === ACTION_FEATURE_SET_PROPERTY) {
        const featureId: number = action.payload.featureId
        const key: string = action.payload.key
        const value: string = action.payload.value
        const feature = state[featureId]

        return {
            ...state,
            [featureId]: changeFeatureProperties(feature, {
                ...feature.properties,
                [key]: value,
            }),
        }
    }

    if (action.type === ACTION_FEATURE_SET_PROPERTIES) {
        const featureId: number = action.payload.featureId
        const properties: {[name: string]: any} = action.payload.properties
        const feature = state[featureId]

        return {
            ...state,
            [featureId]: changeFeatureProperties(feature, {
                ...feature.properties,
                ...properties,
            }),
        }
    }

    return state
}

type LayerAction = {
    type: string,
    // payload: ILayer | Partial<ILayer>
    payload: any
}

function layersReducer(state: ILayer[], action: LayerAction): ILayer[] {
    if (action.type === ACTION_LAYER_ADD) {
        return [
            ...state,
            action.payload as ILayer,
        ]
    }

    if (action.type === ACTION_LAYER_SET) {
        return state.map(layer => layer.id !== action.payload.id ? layer : {
            ...layer,
            ...action.payload,
        })
    }

    if (action.type === ACTION_LAYER_DELETE) {
        return state.filter(layer => layer.id !== action.payload.id)
    }

    return state
}

const App: React.FC<IAppProps> = props => {
    const caseLayerIndex = props.layers.length // todo: dirty hack. check in out later
    const [layerHided, setLayerHided] = React.useState<{ [id: string]: boolean }>({
        // [caseLayerIndex]: true
    })
    const [featuresIndex, dispatchFeaturesIndex] = React.useReducer<React.Reducer<any, any>>(featuresIndexReducer, props.featureIndex)
    const [userLayers, dispatchLayers] = React.useReducer<React.Reducer<ILayer[], LayerAction>>(layersReducer, props.userLayers)
    const hasLayers = userLayers.length > 0
    const [currentUserLayerId, setCurrentUserLayerId] = React.useState<number>(hasLayers ? userLayers[0].id : null)
    const currentUserLayer = userLayers.find(x => x.id === currentUserLayerId)
    const [geojson, setGeojson] = React.useState(props.data)
    const [mapboxMap, setMapboxMap] = React.useState<mapboxgl.Map>(null)
    const [drawerVisible, setDrawerVisibile] = React.useState(false)
    const [tool, setTool] = React.useState<[string, any]>(null)
    const [checkedCaseKeys, setCheckedCaseKeys] = React.useState(props.defaultCheckedCaseKeys)
    // const [
    //     [activeFeatureIndex, activeFeatureLayerIndex, activeFeature],
    //     setActiveFeatureIndex] = React.useState<[number, number, Feature<Point>]>([null, null, null])
    const activeFeatureLayerIndex = null
    const [[activeFeatureLayer, activeFeatureId], setActive] = React.useState<[ILayer, FeatureId]>([null, null])
    const activeFeature = activeFeatureId ? featuresIndex[activeFeatureId] : null
    const [editLayer, setEditLayer] = React.useState<ILayer>(null)
    const [isSavingLayer, setIsSavingLayer] = React.useState<boolean>(false)
    const [isSyncing, setSyncing] = React.useState<boolean>(false)
    const [isAdding, setAdding] = React.useState<boolean>(false)
    const [isFeatureDeleting, setFeatureDeleting] = React.useState<boolean>(false)
    const isCurrentTool = (x: string) => Array.isArray(tool)
        ? tool[0] === x
        : false

    const isLayerVisible = (layerId: number) => {
        if (layerId in layerHided) {
            return layerHided[layerId]
        }

        return true
    }

    const filteredGeojson = filterFeatures(geojson, createFeatureFilter(checkedCaseKeys, true))
    // const currentCaseFeature = activeFeatureIndex === null ? null : (
    //     filteredGeojson.features[activeFeatureIndex]
    // )
    const currentCaseFeature = null
    const popupCoord = !activeFeature ? null : ({
        longitude: activeFeature.geometry.coordinates[0],
        latitude: activeFeature.geometry.coordinates[1],
    })
    const isCaseFeature = false//activeFeatureLayerIndex === caseLayerIndex

    const selectedFeatureColor = '#1890ff'
    const getPinColor = (feature: Feature, color: string) => feature === activeFeature ? selectedFeatureColor : color

    const updateUserFeature = React.useCallback(async (feature: UserFeature) => {
        const updatedFeature = await updateFeature(activeFeature)

        dispatchFeaturesIndex({
            type: ACTION_FEATURE_SET,
            payload: updatedFeature,
        })
    }, [activeFeature]); // The empty array causes this callback to only be created once per component instance

    const deleteFeature = React.useCallback(async (featureId: FeatureId) => {
        setFeatureDeleting(true)
        await deleteFeatureId(featureId)
        dispatchFeaturesIndex({
            type: ACTION_FEATURE_DELETE,
            payload: {
                featureId,
            },
        })
        setFeatureDeleting(false)
    }, [])

    const addNewFeatureInLocation = React.useCallback(async (layer: ILayer, latLng: [number, number]) => {
        // // setActiveFeature([null, null, null])
        setActive([null, null])
        setTool(null)
        setAdding(true)

        const [newFeature, newLayer] = await createFeatureInLocationAndAssignToLayer(layer, latLng, {
            // cases: [],
            name: '<new feature>',
        })

        dispatchFeaturesIndex({
            type: ACTION_FEATURE_SET,
            payload: newFeature,
        })
        dispatchLayers({
            type: ACTION_LAYER_SET,
            payload: newLayer,
        })
        setAdding(false)
    }, []); // The empty array causes this callback to only be created once per component instance

    return (
        <Container>
            <style jsx>{`
                section {
                    position: absolute;
                    background-color: rgba(255, 255, 255, 0.9);
                    width: 100%;
                    top: 0;
                    left: 0;

                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    padding: 5px 10px;
                }

                div {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                header {
                    height: 45px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                h1 {
                    margin: 0;
                    padding: 0 10px;
                    font-size: 1.75em;
                }
            `}</style>

            <AppMap
                onLoad={map => {
                    console.log('MapboxGL Loaded', map)
                    setMapboxMap(map)
                }}
                center={props.center}
                zoom={props.zoom}
                mapStyle={props.mapStyle}
                mapboxToken={props.mapboxToken}
                popup={popupCoord}
                renderPopup={() => {
                    const schema = resolveUserFeatureSchema(activeFeatureLayer.schemaContent)

                    if (schema.editor === 'json') {
                        return (
                            <Json
                                style={{
                                    maxWidth: 600,
                                }}
                                data={activeFeature.properties}
                            />
                        )
                    } else if (schema.editor === 'case-table') {
                        return (
                            <FeatureAttributesEditor
                                feature={activeFeature}
                                renderActions={feature => (
                                    <>
                                        {/* <Button
                                                onClick={() => {
                                                    // setTool([MOVE_FEATURE_TOOL, currentCaseFeature])
                                                }}
                                                style={{
                                                    marginRight: 10,
                                                }}
                                            >Move Feature</Button> */}

                                        <Button
                                            disabled={isFeatureDeleting}
                                            loading={isFeatureDeleting}
                                            onClick={() => {
                                                deleteFeature(feature.id)
                                            }}
                                        >Delete Feature</Button>
                                    </>
                                )}
                                onChange={(feature, properties) => {
                                    dispatchFeaturesIndex({
                                        type: ACTION_FEATURE_SET_PROPERTIES,
                                        payload: {
                                            featureId: feature.id,
                                            properties,
                                        }
                                    })
                                }}
                            />
                        )
                    }

                    return (
                        <UserFeatureEditor
                            schema={schema}
                            feature={activeFeature}
                            renderActions={feature => (
                                <>
                                    {/* <Button>Move</Button> */}
                                    {/* <Button>Layer</Button> */}
                                    <Button
                                        disabled={isFeatureDeleting}
                                        loading={isFeatureDeleting}
                                        onClick={() => {
                                            deleteFeature(feature.id)
                                        }}
                                    >Delete</Button>
                                </>
                            )}
                            onChange={(feature, key, value) => {
                                dispatchFeaturesIndex({
                                    type: ACTION_FEATURE_SET_PROPERTY,
                                    payload: {
                                        featureId: feature.id,
                                        key,
                                        value,
                                    }
                                })
                            }}
                        />
                    )
                }}
                onClosePopup={async () => {
                    await updateUserFeature(activeFeature)
                    setActive([null, null])
                }}
                onClickMap={async event => {
                    console.log('click', event.lngLat)
                    const latLng = event.lngLat

                    if (isCurrentTool(ADD_FEATURE_TOOL)) {
                        addNewFeatureInLocation(currentUserLayer, latLng)
                    } else if (isCurrentTool(MOVE_FEATURE_TOOL)) {
                        const id = (tool[1] as Feature<Point, IFeatureProperties>).properties.id

                        setTool(null)
                        setGeojson(updateFeaturePointLocation(geojson, latLng, f => f.properties.id === id))
                    }
                }}
            >
                {/* {props.layers.map((layer, layerIndex) => !isLayerVisible(layerIndex) ? null : (
                    <FeatureMarkerLayer<any>
                        key={layerIndex}
                        features={layer.data}
                        map={mapboxMap}
                        pinColor={feature => getPinColor(feature, layer.color)}
                        pinText={feature => ''}
                        onClickFeature={(feature, featureIndex) => {
                            setActiveFeatureIndex([featureIndex, layerIndex, feature])
                        }}
                    />
                ))} */}

                {userLayers.map(layer => !isLayerVisible(layer.id) ? null : (
                    <FeatureMarkerLayer<IUserFeatureProperties>
                        key={layer.id}
                        features={selectFeatures(featuresIndex, layer.featureIds)}
                        map={mapboxMap}
                        pinColor={feature => getPinColor(feature, layer.color)}
                        pinText={feature => ''}
                        onClickFeature={(feature, featureIndex) => {
                            // setActiveFeatureIndex([null, layerIndex, feature])
                            setActive([layer, feature.id])
                        }}
                    />
                ))}

                {/* {!isLayerVisible(caseLayerIndex) ? null : (
                    <FeatureMarkerLayer<IFeatureProperties>
                        features={filteredGeojson}
                        map={mapboxMap}
                        pinColor={feature => getPinColor(feature, feature.properties.cases.length
                            ? 'tomato'
                            : 'gray')}
                        pinText={feature => numToStr(feature.properties.cases.length)}
                        onClickFeature={(feature, index) => {
                            setActiveFeatureIndex([index, caseLayerIndex, feature])
                        }}
                    />
                )} */}
            </AppMap>

            <section>
                <header>
                    <h1>Oymyakon</h1>
                    {!isSyncing ? null : (
                        <Spin indicator={(
                            <Icon type="loading" style={{ fontSize: 24 }} spin />
                        )} />
                    )}
                </header>

                <div>
                    <ActionButton
                        style={{
                            marginRight: 5,
                        }}
                        icon={'plus'}
                        loading={isAdding}
                        disabled={!hasLayers || isAdding || isCurrentTool(ADD_FEATURE_TOOL)}
                        onClick={() => {
                            setTool([ADD_FEATURE_TOOL, null])
                        }}
                        options={userLayers
                            .filter(x => isLayerVisible(x.id))
                            .map(x => ({
                                name: x.name,
                                key: `${x.id}`,
                            }))
                        }
                        optionsTitle={currentUserLayer && currentUserLayer.name}
                        onSelectOption={key => {
                            setCurrentUserLayerId(Number(key))
                        }}
                    />

                    <Button
                        icon={'menu'}

                        onClick={() => {
                            setDrawerVisibile(!drawerVisible)
                        }}
                    />
                </div>
            </section>

            <Drawer
                title={'Oymyakon Options'}
                width={'35%'}
                placement={props.drawerPlacement}
                mask={false}
                onClose={() => { setDrawerVisibile(false) }}
                visible={drawerVisible}
                className={'app-drawer'}
            >
                <LayerPanel
                    style={{
                        marginBottom: 15,
                    }}
                    items={[
                        // ...props.layers.map((layer, i) => ({
                        //     layer: {
                        //         id: i,
                        //         name: layer.name,
                        //         color: layer.color,
                        //         readonly: true,
                        //         featureIds: [],
                        //     },
                        //     visible: isLayerVisible(i),
                        //     info: `${layer.data.features.length}`,
                        // })),
                        // {
                        //     layer: {
                        //         id: 0,
                        //         name: 'Cases & New',
                        //         color: 'tomato',
                        //         readonly: true,
                        //         featureIds: [],
                        //     },
                        //     info: `${geojson.features.length}`,
                        //     visible: isLayerVisible(caseLayerIndex),
                        //     render: () => (
                        //         <CaseTree
                        //             disabled={!isLayerVisible(caseLayerIndex)}
                        //             checkedKeys={checkedCaseKeys}
                        //             onCheck={setCheckedCaseKeys}
                        //         />
                        //     )
                        // },
                        ...userLayers.map(layer => ({
                            layer,
                            visible: isLayerVisible(layer.id),
                            canHide: layer.id !== currentUserLayer.id
                        }))
                    ]}
                    onChangeVisible={(layer, visible) => {
                        setLayerHided({
                            ...layerHided,
                            [layer.id]: visible,
                        })
                    }}
                    onAddLayer={async () => {
                        const names = userLayers.map(x => x.name)
                        const newLayer = await createLayer({
                            name: makeUnique('New layer', names),
                            color: 'gray',
                            readonly: false,
                            featureIds: [],
                        })

                        dispatchLayers({
                            type: ACTION_LAYER_ADD,
                            payload: newLayer
                        })
                    }}
                    onDeleteLayer={async id => {
                        await deleteLayer(id)

                        dispatchLayers({
                            type: ACTION_LAYER_DELETE,
                            payload: {
                                id,
                            },
                        })
                    }}
                    onClickLayerEdit={layer => {
                        setEditLayer(layer)
                    }}
                />

                <Select
                    defaultValue={props.mapStyleOption}
                    style={{
                        width: '100%',
                        marginRight: 5,
                        marginBottom: 15,
                    }}
                    onChange={props.onChangeMapStyleOption}
                >
                    {props.mapStyleOptions.map(x => (
                        <Select.Option
                            key={x.value}
                            value={x.value}
                        >
                            {x.name}
                        </Select.Option>
                    ))}
                </Select>
            </Drawer>

            <EditLayerModal
                layer={editLayer}
                visible={!!editLayer}
                onSubmit={async (layer) => {
                    const updatedLayer = await updateLayer(layer)

                    dispatchLayers({
                        type: ACTION_LAYER_SET,
                        payload: updatedLayer,
                    })
                    setEditLayer(null)
                }}
                onCancel={() => {
                    setEditLayer(null)
                }}
                onChange={part => {
                    setEditLayer({
                        ...editLayer,
                        ...part,
                    })
                }}
            />
        </Container >
    )
}

export default App
