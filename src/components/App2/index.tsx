import * as React from 'react'
import { ViewState } from 'react-map-gl'
import { AppMap } from './AppMap'
import { Container } from './Container'
import { CaseTree } from './CaseTree'
import { FeatureMarkerLayer } from '../FeatureMarkerLayer'
import { FeatureCollection, Point, Feature } from 'geojson'
import { IFeatureProperties } from '../../app/types'
import { Button, Select, Drawer, Spin, Icon, Switch } from 'antd'
import { createFeature, deleteFeatureId, updateFeature } from '../../app/api'
import { filterFeatures, replaceFeatureWithProperties, updateFeaturePointLocation, addFeature } from '../../lib/geojson'
import { Json } from '../Json'
import { createFeatureFilter } from './lib'

import '../../style.css'
import { LayerPanel } from '../LayerPanel'

type FC = FeatureCollection<Point, IFeatureProperties>
const ADD_FEATURE_TOOL = 'ADD_FEATURE_TOOL'
const MOVE_FEATURE_TOOL = 'MOVE_FEATURE_TOOL'

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

const App: React.FC<IAppProps> = props => {
    const caseLayerIndex = props.layers.length // todo: dirty hack. check in out later
    const [layerVisibity, setLayerVisibity] = React.useState({
        [caseLayerIndex]: true
    })
    const [geojson, setGeojson] = React.useState(props.data)
    const [drawerVisible, setDrawerVisibile] = React.useState(false)
    const [tool, setTool] = React.useState<[string, any]>(null)
    const [checkedCaseKeys, setCheckedCaseKeys] = React.useState(props.defaultCheckedCaseKeys)
    const [activeFeatureIndex, setActiveFeatureIndex] = React.useState<number>(null)
    const [isSyncing, setSyncing] = React.useState<boolean>(false)
    const [isAdding, setAdding] = React.useState<boolean>(false)
    const isCurrentTool = (x: string) => Array.isArray(tool)
        ? tool[0] === x
        : false

    const isLayerVisible = (layerIndex: number) => Boolean(layerVisibity[layerIndex])

    const filteredGeojson = filterFeatures(geojson, createFeatureFilter(checkedCaseKeys, true))
    const activeFeature = activeFeatureIndex === null ? null : (
        filteredGeojson.features[activeFeatureIndex]
    )

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

                    padding: 5px 5px;
                }

                div {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                h1 {
                    margin: 0;
                    padding: 0 10px;
                }
            `}</style>

            <AppMap
                activeFeature={activeFeature}
                center={props.center}
                zoom={props.zoom}
                mapStyle={props.mapStyle}
                mapboxToken={props.mapboxToken}
                onSubmitActiveFeature={async feature => {
                    setActiveFeatureIndex(null)
                    setSyncing(true)

                    await updateFeature(feature)

                    setSyncing(false)
                }}
                onDeleteFeature={async feature => {
                    const id = feature.properties.id

                    await deleteFeatureId(id)

                    setGeojson(
                        filterFeatures(geojson, feature => feature.properties.id !== id)
                    )
                    setActiveFeatureIndex(null)
                }}
                onClickMap={async event => {
                    console.log('click', event.lngLat)
                    const latLng = event.lngLat

                    if (isCurrentTool(ADD_FEATURE_TOOL)) {
                        setActiveFeatureIndex(null)
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
                onMoveFeature={(feature) => {
                    setTool([MOVE_FEATURE_TOOL, feature])
                }}
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
            >
                {props.layers.map((layer, index) => !isLayerVisible(index) ? null : (
                    <FeatureMarkerLayer<any>
                        features={layer.data}
                        map={null}
                        pinColor={feature => 'white'}
                        pinText={feature => ''}
                    />
                ))}

                {!isLayerVisible(caseLayerIndex) ? null : (
                    <FeatureMarkerLayer<IFeatureProperties>
                        features={filteredGeojson}
                        map={null}
                        pinColor={feature => feature.properties.cases.length
                            ? 'tomato'
                            : 'gray'}
                        pinText={feature => numToStr(feature.properties.cases.length)}
                        onClickFeature={(feature, index) => {
                            setActiveFeatureIndex(index)
                        }}
                    />
                )}
            </AppMap>

            <section>
                <div>
                    <h1>Oymyakon</h1>
                    {!isSyncing ? null : (
                        <Spin indicator={(
                            <Icon type="loading" style={{ fontSize: 24 }} spin />
                        )} />
                    )}
                </div>

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
                            visible: isLayerVisible(i),
                        })),
                        {
                            name: 'Cases',
                            visible: isLayerVisible(caseLayerIndex),
                            render: () => (
                                <CaseTree
                                    disabled={!isLayerVisible(caseLayerIndex)}
                                    checkedKeys={checkedCaseKeys}
                                    onCheck={setCheckedCaseKeys}
                                />
                            )
                        },
                    ]}
                    onChangeVisible={(visible, index) => {
                        setLayerVisibity({
                            ...layerVisibity,
                            [index]: visible,
                        })
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
        </Container >
    )
}

export default App
