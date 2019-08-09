import * as React from 'react'
import { ViewState } from 'react-map-gl'
import { AppMap } from './AppMap'
import { Container } from './Container'
import { CaseTree } from './CaseTree'
import { FeatureCollection, Point, Feature } from 'geojson'
import { IFeatureProperties } from '../../app/types'
import { Button, Select, Drawer } from 'antd'
import { sync, createFeature, deleteFeatureId } from '../../app/api'
import { filterFeatures, replaceFeatureWithProperties, updateFeaturePointLocation, addFeature } from '../../lib/geojson'
import { Json } from '../Json'
import { createFeatureFilter } from './lib'

import '../../style.css'

type FC = FeatureCollection<Point, IFeatureProperties>
const ADD_FEATURE_TOOL = 'ADD_FEATURE_TOOL'
const MOVE_FEATURE_TOOL = 'MOVE_FEATURE_TOOL'

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
    data: FC
    defaultCheckedCaseKeys: string[]
    drawerPlacement: 'right' | 'left' | 'bottom' | 'top'
    mapStyle: string
    mapStyleOption: string
    mapStyleOptions: { value: string, name: string }[]
    onChangeMapStyleOption: (value: string) => void
}

const App: React.FC<IAppProps> = props => {
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
    
    const filteredGeojson = filterFeatures(geojson, createFeatureFilter(checkedCaseKeys))
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

                h1 {
                    margin: 0;
                    padding: 0 10px;
                }
            `}</style>

            <AppMap
                data={filteredGeojson}
                activeFeature={activeFeature}
                center={props.center}
                zoom={props.zoom}
                mapStyle={props.mapStyle}
                mapboxToken={props.mapboxToken}
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
                onClickFeature={(feature, index) => {
                    setActiveFeatureIndex(index)
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
                onChangeFeatureName={(feature, name) => {
                    setGeojson(replaceFeatureWithProperties(geojson, activeFeatureIndex, feature => ({
                        ...feature.properties,
                        name,
                    })))
                }}
            />

            <section>
                <h1>Oymyakon</h1>

                <div>
                    <Button
                        icon={isAdding ? 'loading' : 'plus'}
                        disabled={isAdding || isCurrentTool(ADD_FEATURE_TOOL)}
                        style={{
                            marginRight: 5,
                        }}
                        onClick={() => {
                            setTool([ADD_FEATURE_TOOL, null])
                        }}
                    />

                    <Button
                        icon={isSyncing ? 'loading' : 'sync'}
                        style={{
                            marginRight: 5,
                        }}
                        onClick={async () => {
                            setSyncing(true)
                            await sync(geojson)
                            setSyncing(false)
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
                width={'25%'}
                placement={props.drawerPlacement}
                mask={false}
                onClose={() => { setDrawerVisibile(false) }}
                visible={drawerVisible}
                className={'app-drawer'}
            >
                <CaseTree
                    checkedKeys={checkedCaseKeys}
                    onCheck={setCheckedCaseKeys}
                    style={{
                        marginBottom: 15,
                    }}
                />

                <Select
                    defaultValue={props.mapStyleOption}
                    style={{
                        width: '100%',
                        marginRight: 5,
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
        </Container>
    )
}

export default App
