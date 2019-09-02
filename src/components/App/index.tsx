import * as React from 'react'
import { ViewState, TransitionInterpolator } from 'react-map-gl'
import { omit, shuffle, take, last } from 'lodash'
import useWebSocket from 'react-use-websocket'
import { AppMap } from '../AppMap'
import { AppHeader } from '../AppHeader'
import { Container } from './Container'
import { FeatureMarkerLayer } from '../FeatureMarkerLayer'
import { FeatureCollection, Point, Feature, Geometry } from 'geojson'
import { ILayer, UserFeature, IUserFeatureProperties, IFeatureIndex, FeatureId, IProjectDefinition, IIndex, GeoCoord, IUserSettings } from '../../app/types'
import { Button, Select, Icon, Upload, message, Tag, Checkbox } from 'antd'
import useGeolocation from 'react-hook-geolocation'
import {
    deleteFeatureId,
    updateFeature,
    createLayer,
    deleteLayer,
    updateLayer,
    createFeatureInLocationAndAssignToLayer,
    changeFeatureLayer,
    removeFeatureFromLayer,
    uploadGeojsonFeaturesIntoNewLayer,
    updateFeatureLocation,
    setClientId,
} from '../../app/api'
import { createGeojson, changeFeatureProperties } from '../../lib/geojson'
import { makeUnique } from '../../lib/text'
import { createFeatureUserFilter } from './lib'
import { download } from '../../lib/download'
import { LayerPanel } from '../LayerPanel'
import { sleep } from '../../lib/time';
import { EditLayerModal } from '../EditLayerModal'
import { ActionButton } from '../ActionButton'
import { UserFeatureEditor } from '../UserFeatureEditor'
import { useProject } from '../../hooks/useProject'
import { createPinTextFunction, createMarkerColorFunction, createFilterConfig } from '../../app/layerSchema'
import { FeatureFilter } from '../FeatureFilter'
import { featuresIndexReducer } from './featureIndexReducer'
import { layerIndexReducer } from './layerIndexReducer'
import { FeaturePropertiesViewer } from '../FeaturePropertiesViewer'
import { LayerActionButton } from './LayerActionButton'
import { GeoCoordWidget } from '../GeoCoordWidget'
import { useMobile } from '../../hooks/useMobile'
import { AppLayout } from '../AppLayout'
import { OnlineStatus } from '../OnlineStatus'
import { GeolocationMarker } from '../GeolocationMarker'
import { ExtraBlock } from '../Layout/ExtraBlock'
import { tupleFromLatLon } from '../../lib/mapbox'
import { userSettingsReducer } from '../../reducers/userSettingsReducer'
import {
    ACTION_LAYER_FILTER_TREE_SET_CHECKED_KEYS,
    ACTION_FEATURE_SET,
    ACTION_FEATURE_DELETE,
    ACTION_FEATURE_POINT_LOCATION_SET,
    ACTION_FEATURE_SET_PROPERTY,
    ACTION_LAYER_DELETE,
    ACTION_LAYER_SET,
    ACTION_PROJECT_LAYER_ADD,
    ACTION_PROJECT_LAYER_DELETE,
    ACTION_PROJECT_LAYER_MOVE,
    ACTION_PROJECT_LAYERS_SET,
} from './actions'
import {
    ACTION_USER_SETTINGS_LAYER_MAKE_CURRENT, ACTION_USER_SETTINGS_SET_LAYER_VISIBLE,
} from '../../app/actions'

import '../../style.css'

const ADD_FEATURE_TOOL = 'ADD_FEATURE_TOOL'
const MOVE_FEATURE_TOOL = 'MOVE_FEATURE_TOOL'

let featureDrag = false

export interface IAppProps {
    websocketUrl: string
    canAddLayers: boolean
    canEditLayers: boolean
    canDeleteLayers: boolean
    canDownloadLayers: boolean
    canAddFeatures: boolean
    canEditFeatures: boolean
    canDeleteFeatures: boolean
    canMoveLayers: boolean
    canUploadGeoJson: boolean
    mapboxToken: string
    transitionDuration: number
    transitionInterpolator: TransitionInterpolator
    project: IProjectDefinition
    layerIndex: IIndex<ILayer>
    featureIndex: IFeatureIndex<any, Point>
    drawerPlacement: 'right' | 'left' | 'bottom' | 'top'
    mapStyle: string
    mapStyleOption: string
    mapStyleOptions: { value: string, name: string }[]
    onChangeMapStyleOption: (value: string) => void
}

function selectFeatures<T, G extends Geometry = Geometry>(featureIndex: IFeatureIndex<T, G>, featureIds: FeatureId[] = [], filter: (feature: Feature<G, T>) => boolean): FeatureCollection<G, T> {
    // const features = featureIds
    //     .map(id => featureIndex[id])
    //     .filter(Boolean)
    const features = featureIds.reduce((fs, id) => {
        const feature = featureIndex[id]
        if (feature && filter(feature)) {
            fs.push(feature)
        }
        return fs
    }, [])
    return createGeojson(features)
}

function layerFilterTreeReducer(state: any, action) {
    if (action.type === ACTION_LAYER_FILTER_TREE_SET_CHECKED_KEYS) {
        const id = action.payload.layerId
        return {
            ...state,
            [id]: action.payload.checkedKeys,
        }
    }

    return state
}

type MapView = ViewState & {
    transitionDuration?: number
    transitionInterpolator?: TransitionInterpolator
}

type LayerAction = {
    type: string,
    // payload: ILayer | Partial<ILayer>
    payload: any
}

const App: React.FC<IAppProps> = props => {
    const geolocation = useGeolocation()
    const wsOptions = React.useMemo(() => ({
        retryOnError: true,
        onClose: (event: any) => console.log('WS:Close', event),
        onError: (error: any) => console.log('WS:Error', error),
        onOpen: (event: any) => console.log('WS:Open', event),
    }), [])
    // const [wsSend, wsMessage, wsStatus] = useWebSocket(props.websocketUrl, wsOptions)
    const isMobile = useMobile()
    const [onlineUsersCount, setOnlineUsersCount] = React.useState(0)
    const [project, dispatchProject, updatingProject] = useProject(props.project)
    const [latitude, longitude] = props.project.mapCenterCoord
    const [viewport, setViewport] = React.useState<MapView>({
        latitude,
        longitude,
        zoom: props.project.mapZoom,
    })
    const [currentCursorCoord, setCurrentCursorCoord] = React.useState<GeoCoord>([null, null])
    const [featureDragEnabled, setFeatureDragEnabled] = React.useState(false)
    const [layerClusterIndex, setLayerClusterIndex] = React.useState<{ [id: string]: boolean }>({})
    const [featuresIndex, dispatchFeaturesIndex] = React.useReducer<React.Reducer<any, any>>(featuresIndexReducer, props.featureIndex)
    const [layerIndex, dispatchLayers] = React.useReducer<React.Reducer<IIndex<ILayer>, LayerAction>>(layerIndexReducer, props.layerIndex)
    const userLayers = project.layers
        .map(id => layerIndex[id])
        .filter(Boolean)
    const activeUserLayers = userLayers
        .filter(layer => !layer.readonly)
    const [userSettings, dispatchUserSettings] = React.useReducer<React.Reducer<IUserSettings, any>>(userSettingsReducer, {
        id: props.project.id,
        currentLayerId: activeUserLayers.length
            ? last(activeUserLayers).id
            : null,
        layerVisible: userLayers.reduce((acc, layer) => ({
            ...acc,
            [layer.id]: !layer.readonly,
        }), {}),
    })
    const layersCount = userLayers.length
    const hasLayers = layersCount > 0
    const currentLayer = layerIndex[userSettings.currentLayerId]
    const [mapboxMap, setMapboxMap] = React.useState<mapboxgl.Map>(null)
    const [tool, setTool] = React.useState<[string, any]>(null)
    const [layerFilterTree, dispatchLayerFilterTree] = React.useReducer(layerFilterTreeReducer, {})
    const [[activeFeatureLayerId, activeFeatureId], setActive] = React.useState<[number, FeatureId]>([null, null])
    const activeFeature: Feature<Point> = activeFeatureId ? featuresIndex[activeFeatureId] : null
    const [editLayer, setEditLayer] = React.useState<ILayer>(null)
    const [isAdding, setAdding] = React.useState<boolean>(false)
    const [isFeatureDeleting, setFeatureDeleting] = React.useState<boolean>(false)
    const [isFeatureChangingLayer, setFeatureChangingLayer] = React.useState<boolean>(false)

    const clusteringEnabled = false

    const flyToActiveFeature = isMobile
    const onlineStatus = 'offline'//wsStatus === 1 ? 'online' : 'offline'

    const geolocationOk = React.useMemo(
        () => geolocation.longitude && geolocation.latitude,
        [geolocation],
    )
    const isFeatureDraggable = React.useMemo(
        // () => isMobile || featureDragEnabled,
        () => featureDragEnabled,
        [isMobile, featureDragEnabled],
    )

    const isCurrentTool = (x: string) => Array.isArray(tool)
        ? tool[0] === x
        : false

    const isLayerVisible = (layerId: number) => {
        if (layerId in userSettings.layerVisible) {
            return userSettings.layerVisible[layerId]
        }

        return true
    }

    const activeLayerOptions = userLayers
        .filter(layer => !layer.readonly && isLayerVisible(layer.id))
        .map(x => ({
            name: x.name,
            key: `${x.id}`,
        }))

    const isSyncing = updatingProject || isAdding || isFeatureChangingLayer || isFeatureDeleting
    const layout = isMobile ? 'mobile' : 'default'

    const popupCoord = !activeFeature || isMobile ? null : ({
        longitude: activeFeature.geometry.coordinates[0],
        latitude: activeFeature.geometry.coordinates[1],
    })

    const selectedFeatureColor = '#1890ff'
    const getPinColor: any = (feature: Feature, color: string, bc: string) => [
        color,
        bc,
        feature === activeFeature
            ? selectedFeatureColor
            : null
    ]

    function createFilter(layer: ILayer): (x: any) => boolean {
        if (Array.isArray(layer.schema.filter)) {
            const filterConfig = createFilterConfig(layer.schema)
            const keyMap = filterConfig.treeKeys
            const checkedKeys = getLayerFilterCheckedKeys(layer.id, filterConfig.allTreeKeys)
            const checkedValues = checkedKeys.reduce((values, key) => {
                if (keyMap.has(key)) {
                    const [field, fieldValue] = keyMap.get(key)
                    const value = Array.isArray(values[field]) ? values[field] : []
                    return {
                        ...values,
                        [field]: [...value, fieldValue]
                    }
                }
                return values
            }, {})

            return createFeatureUserFilter(checkedValues)
        } else {
            return () => true
        }
    }

    function getLayerFilterCheckedKeys(layerId: number, defaultValue: string[]): string[] {
        if (layerId in layerFilterTree) {
            return layerFilterTree[layerId]
        }

        return defaultValue
    }

    function createFilterNode(layer: ILayer): () => React.ReactNode {
        const filterConfig = createFilterConfig(layer.schema)

        if (filterConfig) {
            const checkedKeys = getLayerFilterCheckedKeys(layer.id, filterConfig.allTreeKeys)

            return () => (
                <FeatureFilter
                    disabled={!isLayerVisible(layer.id)}
                    options={filterConfig}
                    checkedKeys={checkedKeys}
                    onCheck={checkedKeys => {
                        dispatchLayerFilterTree({
                            type: ACTION_LAYER_FILTER_TREE_SET_CHECKED_KEYS,
                            payload: {
                                layerId: layer.id,
                                checkedKeys,
                            }
                        })
                    }}
                />
            )
        }

        return null
    }

    const activeFeatureLayer = React.useMemo(() => {
        return layerIndex[activeFeatureLayerId]
    }, [layerIndex, activeFeatureLayerId])

    const currentLayerSchemaFields = React.useMemo(() => {
        if (!activeFeatureLayer) {
            return []
        }

        const schema = activeFeatureLayer.schema
        return typeof schema.editor === 'string'
            ? []
            : schema.editor
    }, [activeFeatureLayer])

    const handleWsResourceUpdate = React.useCallback((message) => {
        const action = message.payload.action
        if (['put', 'post'].includes(action)) {
            if (message.payload.collection === 'features') {
                console.log('will update feature')

                dispatchFeaturesIndex({
                    type: ACTION_FEATURE_SET,
                    payload: message.payload.resource.feature,
                })
            } else if (message.payload.collection === 'projects') {
                const project: IProjectDefinition = message.payload.resource

                console.log('will add project layers', project.layers)

                dispatchProject({
                    type: ACTION_PROJECT_LAYERS_SET,
                    payload: {
                        layers: project.layers,
                    }
                })
            } else if (message.payload.collection === 'layers') {
                console.log('will add layer', message.payload.resource)

                dispatchLayers({
                    type: ACTION_LAYER_SET,
                    payload: message.payload.resource,
                })
            }
        } else if (['delete'].includes(message.payload.action)) {
            if (message.payload.collection === 'features') {
                const feature = message.payload.resources.feature
                dispatchFeaturesIndex({
                    type: ACTION_FEATURE_DELETE,
                    payload: {
                        featureId: feature.id,
                    },
                })
            } else if (message.payload.collection === 'projects') {
                // const project: IProjectDefinition = message.payload.resource
                // dispatchProject({
                //     type: ACTION_PROJECT_LAYERS_SET,
                //     payload: {
                //         layers: project.layers,
                //     }
                // })
            } else if (message.payload.collection === 'layers') {
                console.log('will delete layer id ', message.payload.resourceId)

                dispatchLayers({
                    type: ACTION_LAYER_DELETE,
                    payload: {
                        id: message.payload.resourceId,
                    },
                })
            }
        }
    }, [
            // featuresIndex, layerIndex, project
        ])

    // React.useEffect(() => {
    //     if (!wsMessage) {
    //         return
    //     }

    //     const message = JSON.parse(wsMessage.data)

    //     switch (message.type) {
    //         case 'system/init': {
    //             console.log("HANDLE", message)

    //             const clientId = message.payload.clientId
    //             setClientId(clientId)
    //             break
    //         }

    //         case 'info/online_users': {
    //             setOnlineUsersCount(message.payload.onlineUsers)
    //             break
    //         }

    //         case 'app/resource_update': {
    //             handleWsResourceUpdate(message)
    //             break
    //         }

    //         default: {
    //             console.log(`No handler for ${message.type}`, message)
    //         }
    //     }

    // }, [wsMessage])

    const isLayerClustered = React.useCallback((layerId: number) => {
        if (layerId in layerClusterIndex) {
            return layerClusterIndex[layerId]
        }

        return false
    }, [layerClusterIndex])

    const onAddGeojsonFile = React.useCallback(async (points: Feature<Point>[], fileName: string) => {
        setActive([null, null])
        setTool(null)
        setAdding(true)

        const baseName = fileName.replace(/\.(geo)?json$/, '')
        const name = ensureNewLayerNameUnique(baseName)
        const [newFeatures, newLayer] = await uploadGeojsonFeaturesIntoNewLayer<{ [name: string]: any }>(points, {
            name,
            color: 'gray',
            readonly: false,
            featureIds: [],
        })

        newFeatures.forEach(f => {
            dispatchFeaturesIndex({
                type: ACTION_FEATURE_SET,
                payload: f,
            })
        })

        dispatchLayers({
            type: ACTION_LAYER_SET,
            payload: newLayer
        })
        dispatchUserSettings({
            type: ACTION_USER_SETTINGS_LAYER_MAKE_CURRENT,
            payload: {
                id: newLayer.id
            }
        })
        setAdding(false)
    }, [])

    const onDeleteLayerCallback = React.useCallback(async (layer: ILayer) => {
        await deleteLayer(layer.id)

        dispatchLayers({
            type: ACTION_LAYER_DELETE,
            payload: {
                id: layer.id,
            },
        })
        dispatchProject({
            type: ACTION_PROJECT_LAYER_DELETE,
            payload: {
                id: layer.id,
            },
        })

        if (userSettings.currentLayerId === layer.id) {
            const newCurrentLayerId = project.layers.length ? project.layers[0] : null
            dispatchUserSettings({
                type: ACTION_USER_SETTINGS_LAYER_MAKE_CURRENT,
                payload: {
                    id: newCurrentLayerId,
                }
            })
        }

        setEditLayer(null)
    }, [project])

    const onChangeLayerVisibleCallback = React.useCallback((layer, visible) => {
        dispatchUserSettings({
            type: ACTION_USER_SETTINGS_SET_LAYER_VISIBLE,
            payload: {
                layerId: layer.id,
                visible,
            }
        })
    }, [])

    const onChangeLayerClusterCallback = React.useCallback((layer, value) => {
        setLayerClusterIndex({
            ...layerClusterIndex,
            [layer.id]: value,
        })
    }, [layerClusterIndex])

    const updateUserFeature = React.useCallback(async (feature: UserFeature) => {
        const updatedFeature = await updateFeature(changeFeatureProperties(feature, {
            ...feature.properties,
            lastModified: new Date(),
        }))

        dispatchFeaturesIndex({
            type: ACTION_FEATURE_SET,
            payload: updatedFeature,
        })
    }, [activeFeature])

    const ensureNewLayerNameUnique = React.useCallback((name: string) => {
        const names = userLayers.map(x => x.name)
        return makeUnique(name, names)
    }, [userLayers, project])

    const onAddNewLayer = React.useCallback(async () => {
        const name = ensureNewLayerNameUnique('New layer')
        const newLayer = await createLayer({
            name,
            color: 'gray',
            readonly: false,
            featureIds: [],
        })

        dispatchLayers({
            type: ACTION_LAYER_SET,
            payload: newLayer
        })
        dispatchProject({
            type: ACTION_PROJECT_LAYER_ADD,
            payload: {
                id: newLayer.id,
            }
        })
        dispatchUserSettings({
            type: ACTION_USER_SETTINGS_LAYER_MAKE_CURRENT,
            payload: {
                id: newLayer.id
            }
        })
    }, [])

    React.useEffect(() => {
        if (flyToActiveFeature && activeFeature) {
            setViewport({
                ...viewport,
                longitude: activeFeature.geometry.coordinates[0],
                latitude: activeFeature.geometry.coordinates[1],
                transitionDuration: props.transitionDuration,
                transitionInterpolator: props.transitionInterpolator,
            })
        }
    }, [activeFeature])

    const navigateGeolocation = React.useCallback(() => {
        const longitude = geolocation.longitude
        const latitude = geolocation.latitude
        const zoom = Math.max(10, viewport.zoom)

        setViewport({
            ...viewport,
            longitude,
            latitude,
            transitionDuration: props.transitionDuration,
            transitionInterpolator: props.transitionInterpolator,
            zoom,
        })
    }, [geolocation])

    const onClickGeolocationMarker = React.useCallback(() => {
        if (props.canAddFeatures) {
            const longitude = geolocation.longitude
            const latitude = geolocation.latitude
            const coord = tupleFromLatLon({
                longitude,
                latitude,
            })

            addNewFeatureInLocation(currentLayer, coord)
        } else {
            navigateGeolocation()
        }
    }, [geolocation, currentLayer])

    const onSubmitLayer = React.useCallback(async (layer: ILayer) => {
        const updatedLayer = await updateLayer(layer)

        dispatchLayers({
            type: ACTION_LAYER_SET,
            payload: updatedLayer,
        })
        setEditLayer(null)
    }, [])

    const onCancelEditLayer = React.useCallback(() => {
        setEditLayer(null)
    }, [])

    const onChangeLayer = React.useCallback(part => {
        setEditLayer({
            ...editLayer,
            ...part,
        })
    }, [editLayer])

    const deleteFeature = React.useCallback(async (featureId: FeatureId, layer: ILayer) => {
        setFeatureDeleting(true)
        const newLayer = await removeFeatureFromLayer(featureId, layer)
        await deleteFeatureId(featureId)

        dispatchFeaturesIndex({
            type: ACTION_FEATURE_DELETE,
            payload: {
                featureId,
            },
        })

        dispatchLayers({
            type: ACTION_LAYER_SET,
            payload: newLayer,
        })

        setActive([null, null])
        setFeatureDeleting(false)
    }, [])

    const changeFeatureLayerCallback = React.useCallback(async (featureId: FeatureId, fromLayer: ILayer, toLayer: ILayer) => {
        setFeatureChangingLayer(true)
        const [newFromLayer, newToLayer] = await changeFeatureLayer(featureId, fromLayer, toLayer)

        dispatchLayers({
            type: ACTION_LAYER_SET,
            payload: newFromLayer,
        })
        dispatchLayers({
            type: ACTION_LAYER_SET,
            payload: newToLayer,
        })
        setFeatureChangingLayer(false)
        setActive([newToLayer.id, featureId])
    }, [activeFeature, activeFeatureLayerId])

    const addNewFeatureInLocation = React.useCallback(async (layer: ILayer, latLng: [number, number]) => {
        setActive([null, null])
        setTool(null)
        setAdding(true)

        const [newFeature, newLayer] = await createFeatureInLocationAndAssignToLayer(layer, latLng, {
            dateCreated: new Date(),
            lastModified: new Date(),
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
    }, [])

    const onChangeFeaturePropertyCallback = React.useCallback((feature: Feature, key: string, value: any) => {
        dispatchFeaturesIndex({
            type: ACTION_FEATURE_SET_PROPERTY,
            payload: {
                featureId: feature.id,
                key,
                value,
            }
        })
    }, [])

    const onMoveFeatureCallback = React.useCallback(async (feature: Feature, latLng: [number, number]) => {
        dispatchFeaturesIndex({
            type: ACTION_FEATURE_POINT_LOCATION_SET,
            payload: {
                featureId: feature.id,
                latLng,
            },
        })

        const newFeature = await updateFeatureLocation(feature as any, latLng)

        dispatchFeaturesIndex({
            type: ACTION_FEATURE_SET,
            payload: newFeature,
        })
    }, [])

    const renderPopup = React.useCallback(() => {
        if (props.canEditFeatures) {
            return (
                <UserFeatureEditor
                    key={activeFeatureId}
                    fields={currentLayerSchemaFields}
                    feature={activeFeature}
                    renderActions={feature => renderPopupActions(feature, activeFeatureLayer)}
                    onChange={onChangeFeaturePropertyCallback}
                />
            )
        } else {
            return (
                <FeaturePropertiesViewer
                    feature={activeFeature}
                />
            )
        }
    }, [activeFeatureLayerId, userLayers, featuresIndex])

    const renderPopupActions = React.useCallback((feature, layer: ILayer) => (
        <>
            <ExtraBlock
                extra={!props.canEditFeatures ? null : (
                    <>
                        <Select
                            style={{
                                marginRight: 10,
                            }}
                            loading={isFeatureChangingLayer}
                            disabled={isFeatureChangingLayer}
                            defaultValue={activeFeatureLayerId}
                            onChange={(selectedLayerId) => {
                                const toLayerId = Number(selectedLayerId)
                                const fromLayer = userLayers.find(x => x.id === activeFeatureLayerId)
                                const toLayer = userLayers.find(x => x.id === toLayerId)

                                changeFeatureLayerCallback(
                                    feature.id,
                                    fromLayer,
                                    toLayer
                                )
                            }}
                        >
                            {userLayers.map(x => (
                                <Select.Option
                                    key={x.id}
                                    value={x.id}
                                >{x.name}</Select.Option>
                            ))}
                        </Select>

                        <Button
                            type={'primary'}
                            onClick={onSaveFeatureCallback}
                        >Save</Button>
                    </>
                )}
            >
                {!props.canDeleteFeatures ? null : (
                    <Button
                        disabled={isFeatureDeleting}
                        loading={isFeatureDeleting}
                        type={'danger'}
                        onClick={() => {
                            deleteFeature(feature.id, layer)
                        }}
                    >Delete</Button>
                )}
            </ExtraBlock>
        </>
    ), [userLayers, activeFeature, activeFeatureLayerId, isFeatureChangingLayer, isFeatureDeleting, userLayers])

    const onSaveFeatureCallback = React.useCallback(async () => {
        if (props.canEditFeatures) {
            await updateUserFeature(activeFeature)
        }

        setActive([null, null])
    }, [activeFeature])

    const onClosePopupCallback = React.useCallback(async () => {
        setActive([null, null])
    }, [])

    return (
        <AppLayout
            theme={'light'}
            layout={layout}
            bigSider={!!activeFeature}
            sider={(
                <div
                    style={{
                        padding: 10,
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <AppHeader
                        style={{
                            marginBottom: 10,
                        }}
                        title={props.project.name}
                        isSyncing={isSyncing}
                        actions={(
                            <>
                                <Button
                                    disabled={!geolocationOk}
                                    icon={'environment'}
                                    onClick={navigateGeolocation}
                                />
                                {!props.canAddFeatures ? null : (
                                    <>
                                        <ActionButton
                                            style={{
                                                marginLeft: 10,
                                            }}
                                            icon={'plus'}
                                            type={'primary'}
                                            reverse={true}
                                            loading={isAdding}
                                            disabled={!hasLayers || isAdding || isCurrentTool(ADD_FEATURE_TOOL)}
                                            onClick={() => {
                                                setTool([ADD_FEATURE_TOOL, null])

                                                message.info('Click on the map to add feature')
                                            }}
                                            options={activeLayerOptions}
                                            optionsTitle={currentLayer && currentLayer.name}
                                            onSelectOption={key => {
                                                dispatchUserSettings({
                                                    type: ACTION_USER_SETTINGS_LAYER_MAKE_CURRENT,
                                                    payload: {
                                                        id: Number(key),
                                                    }
                                                })
                                            }}
                                        />
                                    </>
                                )}
                            </>
                        )}
                    />

                    <div style={{
                        flex: 1,
                    }}>
                        {!(isMobile && activeFeature) ? null : (
                            <div
                                style={{
                                    marginBottom: 10,
                                }}
                            >
                                {renderPopup()}
                            </div>
                        )}

                        <LayerPanel
                            style={{
                                marginBottom: 10,
                            }}
                            items={userLayers.reverse().map(layer => {
                                return {
                                    layer,
                                    render: createFilterNode(layer),
                                    visible: isLayerVisible(layer.id),
                                    canHide: layer.id !== userSettings.currentLayerId,
                                    info: `${layer.featureIds.length}`,
                                }
                            })}
                            renderLayerActions={(layer, index) => {
                                return (
                                    <>
                                        {!props.canDownloadLayers ? null : (
                                            <LayerActionButton
                                                icon={'download'}
                                                onClick={async () => {
                                                    await sleep(1000)

                                                    const features = selectFeatures(featuresIndex, layer.featureIds, createFilter(layer))

                                                    const content = JSON.stringify(features, null, 4)
                                                    download(`oymyakon-${layer.name}.geojson`, content)
                                                }}
                                            />
                                        )}
                                        {!clusteringEnabled ? null : (
                                            <Checkbox
                                                checked={isLayerClustered(layer.id)}
                                                onChange={event => {
                                                    onChangeLayerClusterCallback(layer, event.target.checked)
                                                }}
                                            />
                                        )}
                                        {!props.canEditLayers ? null : (
                                            <>
                                                {!props.canMoveLayers ? null : (
                                                    <>
                                                        <LayerActionButton
                                                            icon={'arrow-up'}
                                                            disabled={index === 0}
                                                            dispatch={{
                                                                dispatcher: dispatchProject,
                                                                action: {
                                                                    type: ACTION_PROJECT_LAYER_MOVE,
                                                                    payload: {
                                                                        id: layer.id,
                                                                        direction: 1,
                                                                    }
                                                                },
                                                            }}
                                                        />
                                                        <LayerActionButton
                                                            icon={'arrow-down'}
                                                            disabled={index === layersCount - 1}
                                                            dispatch={{
                                                                dispatcher: dispatchProject,
                                                                action: {
                                                                    type: ACTION_PROJECT_LAYER_MOVE,
                                                                    payload: {
                                                                        id: layer.id,
                                                                        direction: -1,
                                                                    }
                                                                },
                                                            }}
                                                        />
                                                    </>
                                                )}
                                                <LayerActionButton
                                                    icon={'edit'}
                                                    onClick={() => {
                                                        setEditLayer(layer)
                                                    }}
                                                />
                                            </>
                                        )}
                                    </>
                                )
                            }}
                            onChangeVisible={onChangeLayerVisibleCallback}
                            canAddLayers={props.canAddLayers}
                            onAddLayer={onAddNewLayer}
                        />

                        <Select
                            defaultValue={props.mapStyleOption}
                            style={{
                                width: '100%',
                                marginBottom: 10,
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

                        {!props.canUploadGeoJson ? null : (
                            <Upload
                                fileList={null}
                                accept={'geojson'}
                                beforeUpload={file => {
                                    return new Promise(resolve => {
                                        const reader = new FileReader()
                                        reader.readAsText(file)
                                        reader.onload = () => {
                                            if (typeof reader.result !== 'string') {
                                                message.error('Cannot open file')
                                                return
                                            }

                                            try {
                                                const geojson = JSON.parse(reader.result)
                                                const points = geojson.features
                                                    .filter(feature => feature.geometry.type === 'Point')
                                                    .map(feature => omit(feature, 'id', 'properties.id'))

                                                onAddGeojsonFile(
                                                    take(shuffle(points), 100),
                                                    file.name,
                                                )
                                            } catch (e) {
                                                message.error('Cannot open file')
                                            }
                                        };

                                        resolve()
                                    });

                                    // return false;
                                }}
                            >
                                <Button
                                    style={{
                                        marginRight: 15,
                                    }}
                                >
                                    <Icon type="upload" /> Add GeoJSON
                                </Button>
                            </Upload>
                        )}
                    </div>

                    <footer
                        style={{
                            marginTop: 10,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <GeoCoordWidget
                            style={{
                                flex: 1,
                            }}
                            coord={currentCursorCoord}
                            precision={5}
                        />

                        <span>
                            <Icon type={'smile'} />
                            {` ${onlineUsersCount}`}
                        </span>

                        <OnlineStatus
                            style={{
                                marginLeft: 10,
                            }}
                            status={onlineStatus}
                        />
                    </footer>
                </div>
            )}
            content={(
                <Container
                    onKeyDown={event => {
                        if (event.shiftKey) {
                            setFeatureDragEnabled(true)
                        }
                    }}
                    onKeyUp={() => {
                        setFeatureDragEnabled(false)
                    }}
                >
                    <AppMap
                        viewport={viewport}
                        onChangeViewport={viewport => setViewport(viewport)}
                        onLoad={map => {
                            setMapboxMap(map)
                        }}
                        center={props.project.mapCenterCoord}
                        zoom={props.project.mapZoom}
                        mapStyle={props.mapStyle}
                        mapboxToken={props.mapboxToken}
                        popup={popupCoord}
                        renderPopup={() => (
                            <div style={{
                                marginTop: 15,
                            }}>
                                {renderPopup()}
                            </div>
                        )}
                        onClosePopup={onClosePopupCallback}
                        onClickMap={async event => {
                            console.log('click', event.lngLat)
                            const latLng = event.lngLat

                            if (isCurrentTool(ADD_FEATURE_TOOL)) {
                                addNewFeatureInLocation(currentLayer, latLng)
                            }

                            setActive([null, null])
                        }}
                        onMouseMove={event => {
                            setCurrentCursorCoord(event.lngLat)
                        }}
                    >
                        {userLayers.map(layer => !isLayerVisible(layer.id) ? null : (
                            <FeatureMarkerLayer<IUserFeatureProperties>
                                key={layer.id}
                                features={selectFeatures(featuresIndex, layer.featureIds, createFilter(layer))}
                                map={mapboxMap}
                                draggable={isFeatureDraggable}
                                onDrag={null}
                                onDragStart={(event, feature) => {
                                    featureDrag = true
                                }}
                                onDragEnd={(event, feature) => {
                                    sleep(0).then(() => {
                                        featureDrag = false
                                    })

                                    onMoveFeatureCallback(feature, event.lngLat)
                                }}
                                // pinColor={feature => getPinColor(feature, layer.color)}
                                pinColor={feature => {
                                    const fn = createMarkerColorFunction(layer.schema, null)
                                    const color = fn(feature)
                                    return getPinColor(feature, layer.color, color)
                                }}
                                pinText={createPinTextFunction(layer.schema)}
                                onClickFeature={feature => {
                                    if (!featureDrag) {
                                        setActive([layer.id, feature.id])
                                    }
                                }}
                                cluster={!isLayerClustered(layer.id) ? null : ({
                                    minZoom: 0,
                                    maxZoom: 16,
                                    radius: 50,
                                    labelColor: layer.color,
                                })}
                            />
                        ))}
                        {/* pinColor={feature => getPinColor(feature, feature.properties.cases.length
                    ? 'tomato'
                    : 'gray')} */}
                        {!geolocationOk ? null : (
                            <GeolocationMarker
                                onClick={onClickGeolocationMarker}
                                geolocation={geolocation}
                                maxAccuracyRadius={50}
                                size={20}
                                color={'white'}
                            />
                        )}
                    </AppMap>

                    {!props.canEditLayers ? null : (
                        <EditLayerModal
                            layer={editLayer}
                            visible={!!editLayer}
                            showDeleteButton={props.canDeleteLayers}
                            onSubmit={onSubmitLayer}
                            onCancel={onCancelEditLayer}
                            onChange={onChangeLayer}
                            onDelete={onDeleteLayerCallback}
                        />
                    )}
                </Container >
            )}
        />
    )
}

export default App
