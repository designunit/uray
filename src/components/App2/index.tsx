import * as React from 'react'
import { ViewState } from 'react-map-gl'
import { AppMap } from './AppMap'
import { Container } from './Container'
import { CaseTree } from './CaseTree'
import { FeatureCollection, Point, Feature } from 'geojson'
import { IFeatureProperties } from '../../app/types'
import { createFeatureMap } from './lib'
import { Button, Select, Drawer } from 'antd'
import { sync } from '../../app/api'
import { Json } from '../Json'
import { filterFeatures } from '../../lib/geojson'
import { getCaseKeysSet } from '../../app/lib'
import { isSubset } from '../../lib'

import '../../style.css'

type FC = FeatureCollection<Point, IFeatureProperties>
type FeatureMap = { [name: string]: Feature<Point, IFeatureProperties> }


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
    mapStyle: string
    mapStyleOption: string
    mapStyleOptions: { value: string, name: string }[]
    onChangeMapStyleOption: (value: string) => void
}

const App: React.FC<IAppProps> = props => {
    const [drawerVisible, setDrawerVisibile] = React.useState(true)
    const [checkedCaseKeys, setCheckedCaseKeys] = React.useState(props.defaultCheckedCaseKeys)
    const [featureMap, setFeatureMap] = React.useState<FeatureMap>(
        Object.fromEntries(
            createFeatureMap<number, IFeatureProperties, Point>(props.data.features, p => p.id)
        )
    )
    const [activeFeatureId, setActiveFeatureId] = React.useState<number>(null)
    const [isSyncing, setSyncing] = React.useState<boolean>(false)
    const activeFeature = activeFeatureId ? featureMap[activeFeatureId] : null

    const checkedCaseKeysSet = new Set(checkedCaseKeys)
    const features = filterFeatures(props.data, feature => {
        const cases = getCaseKeysSet(feature.properties.cases)

        return isSubset(checkedCaseKeysSet, cases)
    })

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

                    padding: 5px 15px;
                }

                h1 {
                    margin: 0;
                    padding: 0;
                }
            `}</style>

            <AppMap
                data={features}
                featureMap={featureMap}
                activeFeature={activeFeature}
                center={props.center}
                zoom={props.zoom}
                mapStyle={props.mapStyle}
                mapboxToken={props.mapboxToken}
                onClickMap={event => {
                    console.log('click', event.lngLat)

                    // if (activeFeatureId) {
                    //     setActiveFeatureId(null)
                    // }
                }}
                onClickFeature={feature => {
                    setActiveFeatureId(feature
                        ? feature.properties.id
                        : null
                    )
                }}
                onChangeFeatureCases={(feature, cases) => {
                    setFeatureMap({
                        ...featureMap,
                        [feature.properties.id]: {
                            ...feature,
                            properties: {
                                ...feature.properties,
                                cases,
                            }
                        }
                    })
                }}
                onChangeFeatureName={(feature, name) => {
                    setFeatureMap({
                        ...featureMap,
                        [feature.properties.id]: {
                            ...feature,
                            properties: {
                                ...feature.properties,
                                name,
                            }
                        }
                    })
                }}
            />

            <section>
                <h1>Oymyakon</h1>

                <div>
                    <Button
                        icon={isSyncing ? 'loading' : 'sync'}
                        style={{
                            marginRight: 5,
                        }}
                        onClick={async () => {
                            setSyncing(true)
                            await sync(props.data, featureMap)
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
                placement={'right'}
                mask={false}
                // closable={false}
                onClose={() => { setDrawerVisibile(false) }}
                visible={drawerVisible}
                wrapClassName={'app-drawer'}
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

                {/* <Json data={props.defaultCheckedCaseKeys} /> */}
            </Drawer>
        </Container>
    )
}

export default App
