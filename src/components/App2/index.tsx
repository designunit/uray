import * as React from 'react'
import { ViewState } from 'react-map-gl'
import { AppMap } from '../AppMap'
import { Container } from './Container'
import { CaseTree } from './CaseTree'
import { FeatureMarkerLayer } from '../FeatureMarkerLayer'
import { FeatureCollection, Point, Feature } from 'geojson'
import { IFeatureProperties, ILayer } from '../../app/types'
import { Button, Select, Drawer, Spin, Icon, Switch, Modal } from 'antd'
import { createFeature, deleteFeatureId, updateFeature } from '../../app/api'
import { filterFeatures, replaceFeatureWithProperties, updateFeaturePointLocation, addFeature } from '../../lib/geojson'
import { Json } from '../Json'
import { createFeatureFilter } from './lib'

import '../../style.css'
import { LayerPanel } from '../LayerPanel'
import { FeatureAttributesEditor } from '../FeatureAttributesEditor';
import { sleep } from '../../lib/time';
import { EditLayerModal } from '../EditLayerModal';

type FC = FeatureCollection<Point, IFeatureProperties>
const ADD_FEATURE_TOOL = 'ADD_FEATURE_TOOL'
const MOVE_FEATURE_TOOL = 'MOVE_FEATURE_TOOL'

const ACTION_LAYER_ADD = 'ACTION_LAYER_ADD'
const ACTION_LAYER_DELETE = 'ACTION_LAYER_DELETE'
const ACTION_LAYER_CHANGE = 'ACTION_LAYER_CHANGE'

function numToStr(value: number): string {
    return value ? `${value}` : ''
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
    data: FC
    defaultCheckedCaseKeys: string[]
    drawerPlacement: 'right' | 'left' | 'bottom' | 'top'
    mapStyle: string
    mapStyleOption: string
    mapStyleOptions: { value: string, name: string }[]
    onChangeMapStyleOption: (value: string) => void
}

function featuresIndexReducer(state, action) {
    return state
}

async function createLayer() {
    await sleep(1000)

    return {
        id: Math.random(),
        name: 'New layer',
        readonly: false,
    }
}

function layersReducer(state, action) {
    if (action.type === ACTION_LAYER_ADD) {
        return [
            ...state,
            {
                ...action.payload,
                color: 'gray',
                visible: true,                
            }
        ]
    }

    if (action.type === ACTION_LAYER_CHANGE) {
        return state.map(layer => layer.id !== action.id ? layer : {
            ...layer,
            ...action.payload,
        })
    }

    if (action.type === ACTION_LAYER_DELETE) {
        return state.filter(layer => layer.id !== action.id)
    }

    return state
}

const App: React.FC<IAppProps> = props => {
    const caseLayerIndex = props.layers.length // todo: dirty hack. check in out later
    const [layerVisibity, setLayerVisibity] = React.useState({
        [caseLayerIndex]: true
    })
    const [geojson, setGeojson] = React.useState(props.data)
    const [mapboxMap, setMapboxMap] = React.useState<mapboxgl.Map>(null)
    const [drawerVisible, setDrawerVisibile] = React.useState(false)
    const [tool, setTool] = React.useState<[string, any]>(null)
    const [checkedCaseKeys, setCheckedCaseKeys] = React.useState(props.defaultCheckedCaseKeys)
    const [
        [activeFeatureIndex, activeFeatureLayerIndex, activeFeature],
        setActiveFeatureIndex] = React.useState<[number, number, Feature<Point>]>([null, null, null])
    const [editLayer, setEditLayer] = React.useState<ILayer>(null)
    const [isSavingLayer, setIsSavingLayer] = React.useState<boolean>(false)
    const [isSyncing, setSyncing] = React.useState<boolean>(false)
    const [isAdding, setAdding] = React.useState<boolean>(false)
    const isCurrentTool = (x: string) => Array.isArray(tool)
        ? tool[0] === x
        : false

    const isLayerVisible = (layerIndex: number) => Boolean(layerVisibity[layerIndex])

    const filteredGeojson = filterFeatures(geojson, createFeatureFilter(checkedCaseKeys, true))
    const currentCaseFeature = activeFeatureIndex === null ? null : (
        filteredGeojson.features[activeFeatureIndex]
    )
    const popupCoord = !activeFeature ? null : ({
        longitude: activeFeature.geometry.coordinates[0],
        latitude: activeFeature.geometry.coordinates[1],
    })
    const isCaseFeature = activeFeatureLayerIndex === caseLayerIndex

    const selectedFeatureColor = '#1890ff'
    const getPinColor = (feature: Feature, color: string) => feature === activeFeature ? selectedFeatureColor : color

    const [featuresIndex, dispatchFeaturesIndex] = React.useReducer(featuresIndexReducer, new Map())
    const [userLayers, dispatchLayers] = React.useReducer(layersReducer, [])

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
                    if (activeFeatureLayerIndex !== caseLayerIndex) {
                        return (
                            <Json
                                style={{
                                    maxWidth: 600,
                                }}
                                data={activeFeature.properties}
                            />
                        )
                    }

                    return (
                        <FeatureAttributesEditor
                            feature={currentCaseFeature}
                            onChangeFeatureCases={(feature, cases) => {
                                setGeojson(replaceFeatureWithProperties(geojson, activeFeatureIndex, feature => ({
                                    ...feature.properties,
                                    cases,
                                })))
                            }}
                            onChangeFeature={(feature, partial) => {
                                setGeojson(replaceFeatureWithProperties(geojson, activeFeatureIndex, feature => ({
                                    ...feature.properties,
                                    ...partial,
                                })))
                            }}
                            onDeleteFeature={async () => {
                                const id = currentCaseFeature.properties.id

                                await deleteFeatureId(id)

                                setGeojson(
                                    filterFeatures(geojson, feature => feature.properties.id !== id)
                                )
                                setActiveFeatureIndex([null, null, null])
                            }}
                            onMoveFeature={() => {
                                setTool([MOVE_FEATURE_TOOL, currentCaseFeature])
                            }}
                        />
                    )
                }}
                onClosePopup={async () => {
                    setActiveFeatureIndex([null, null, null])

                    if (isCaseFeature) {
                        setSyncing(true)

                        await updateFeature(currentCaseFeature)

                        setSyncing(false)
                    }
                }}
                onClickMap={async event => {
                    console.log('click', event.lngLat)
                    const latLng = event.lngLat

                    if (isCurrentTool(ADD_FEATURE_TOOL)) {
                        setActiveFeatureIndex([null, null, null])
                        setTool(null)
                        setAdding(true)

                        const newFeature = await createFeature(latLng, {
                            cases: [],
                            name: '<new feature>',
                        })

                        setGeojson(addFeature(geojson, newFeature))
                        setAdding(false)
                    }
                    else if (isCurrentTool(MOVE_FEATURE_TOOL)) {
                        const id = (tool[1] as Feature<Point, IFeatureProperties>).properties.id

                        setTool(null)
                        setGeojson(updateFeaturePointLocation(geojson, latLng, f => f.properties.id === id))
                    }
                }}
            >
                {props.layers.map((layer, layerIndex) => !isLayerVisible(layerIndex) ? null : (
                    <FeatureMarkerLayer<any>
                        features={layer.data}
                        map={mapboxMap}
                        pinColor={feature => getPinColor(feature, layer.color)}
                        pinText={feature => ''}
                        onClickFeature={(feature, featureIndex) => {
                            setActiveFeatureIndex([featureIndex, layerIndex, feature])
                        }}
                    // cluster={{
                    //     minZoom: 0,
                    //     maxZoom: 16,
                    //     radius: 100,
                    // }}
                    />
                ))}

                {!isLayerVisible(caseLayerIndex) ? null : (
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
                )}
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
                    <Button
                        icon={'plus'}
                        loading={isAdding}
                        disabled={isAdding || isCurrentTool(ADD_FEATURE_TOOL)}
                        style={{
                            marginRight: 5,
                        }}
                        onClick={() => {
                            setTool([ADD_FEATURE_TOOL, null])
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
                        ...props.layers.map((layer, i) => ({
                            name: layer.name,
                            color: layer.color,
                            visible: isLayerVisible(i),
                            info: `${layer.data.features.length}`,
                            readonly: true,
                        })),
                        {
                            name: 'Cases & New',
                            color: 'tomato',
                            visible: isLayerVisible(caseLayerIndex),
                            info: `${geojson.features.length}`,
                            readonly: true,
                            render: () => (
                                <CaseTree
                                    disabled={!isLayerVisible(caseLayerIndex)}
                                    checkedKeys={checkedCaseKeys}
                                    onCheck={setCheckedCaseKeys}
                                />
                            )
                        },
                        ...userLayers,
                    ]}
                    onChangeVisible={(visible, index) => {
                        setLayerVisibity({
                            ...layerVisibity,
                            [index]: visible,
                        })
                    }}
                    onAddLayer={async () => {
                        const newLayer = await createLayer()
                        dispatchLayers({
                            type: ACTION_LAYER_ADD,
                            payload: newLayer
                        })
                    }}
                    onDeleteLayer={async id => {
                        await sleep(1000)
                        dispatchLayers({
                            type: ACTION_LAYER_DELETE,
                            id,
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
                    await sleep(1000)

                    dispatchLayers({
                        type: ACTION_LAYER_CHANGE,
                        id: layer.id,
                        payload: layer,
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
