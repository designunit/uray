import * as React from 'react'
import { ViewState } from 'react-map-gl'
import { AppMap } from './AppMap'
import { Container } from './Container'
import { FeatureCollection, Point, Feature } from 'geojson'
import axios from 'axios'
import { IFeatureProperties } from '../../app/types'
import { createFeatureMap } from './lib'
import { Button } from 'antd'
import { sleep } from '../../lib/time'

async function sync(favs): Promise<boolean> {
    try {
        const res = await axios.post('/api/data/favs', favs)
        return true
    } catch (error) {
        console.error(error)
        return false
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
    data: FeatureCollection<Point, IFeatureProperties>
    mapStyle: string
}

const App: React.FC<IAppProps> = props => {
    const [featureMap, setFeatureMap] = React.useState(
        Object.fromEntries(
            createFeatureMap<number, IFeatureProperties, Point>(props.data.features, p => p.id)
        )
    )
    const [activeFeatureId, setActiveFeatureId] = React.useState<number>(null)
    const [isSyncing, setSyncing] = React.useState<boolean>(false)
    const activeFeature = activeFeatureId ? featureMap[activeFeatureId] : null

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
                data={props.data}
                featureMap={featureMap}
                activeFeature={activeFeature}
                center={props.center}
                zoom={props.zoom}
                mapStyle={props.mapStyle}
                mapboxToken={props.mapboxToken}
                onClickMap={event => {
                    console.log('click', event.lngLat)

                    if (activeFeatureId) {
                        setActiveFeatureId(null)
                    }
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
            />

            <section>
                <h1>Oymyakon</h1>

                <div>
                    <Button
                        icon={isSyncing ? 'loading' : 'sync'}
                        onClick={async () => {
                            setSyncing(true)
                            await sleep(1000)
                            setSyncing(false)
                        }}
                    />
                </div>
            </section>
        </Container>
    )
}

export default App
