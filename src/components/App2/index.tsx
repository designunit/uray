import * as React from 'react'
import { ViewState } from 'react-map-gl'
import { AppMap } from './AppMap'
import { Container } from './Container'
import { FeatureCollection, Point, Feature } from 'geojson'
import axios from 'axios'
import { IFeatureProperties } from '../../app/types'
import { createFeatureMap } from './lib'

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
    const activeFeature = activeFeatureId ? featureMap[activeFeatureId] : null

    return (
        <Container>
            <style jsx>{`
                div {
                    position: absolute;
                    background-color: white;
                    top: 0;
                    left: 0;
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

            {/* <div>
                <pre>{JSON.stringify(activeFeature, null, 4)}</pre>
            </div> */}
        </Container>
    )
}

export default App
