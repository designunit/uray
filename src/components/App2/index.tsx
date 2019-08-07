import * as React from 'react'
import { Radio, Button, Slider, Icon } from 'antd'
import ReactMapGL, { Marker, Popup, ViewState } from 'react-map-gl'
import { Cluster } from '../Cluster'
import { Pin } from '../MarkerIcon/Pin'
import { FeatureAttributesEditor } from '../FeatureAttributesEditor'
import { FeatureCollection, Point, Feature } from 'geojson'
import { ClusterLabel } from '../ClusterLabel'
import axios from 'axios'
import { ICase, IFeatureProperties } from '../../app/types'
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

type FeaturePopup = {
    latitude: number,
    longitude: number,
    feature: Feature<Point, IFeatureProperties>,
}

const App: React.FC<IAppProps> = props => {
    const [latitude, longitude] = props.center
    const [featureMap, setFeatures] = React.useState<{ [name: string]: Feature<Point, IFeatureProperties> }>(
        createFeatureMap<number, IFeatureProperties, Point>(props.data.features, p => p.id)
    )
    const [viewport, setViewport] = React.useState<IMapViewport>({
        latitude,
        longitude,
        zoom: props.zoom,
    })
    const [mapRef, setMapRef] = React.useState(null)
    const [viewMode, setViewMode] = React.useState<ViewMode>(ViewMode.all)
    const [clusterRadius, setClusterRadius] = React.useState(100)
    const [map, setMap] = React.useState(null)
    const [popup, setPopup] = React.useState<FeaturePopup>(null)

    const def = [{
        id: 1,
        topic: 'EXT',
        user: null,
        season: 'A',
    }]
    const [cases, setCases] = React.useState<ICase[]>(def)
    const popupFeature = popup ? featureMap[popup.feature.properties.id] : null

    return (
        <main>
            <style jsx>{`
                main {
                    width: 100%;
                    height: 100%;

                    position: relative;
                }

                aside {
                    position: absolute;
                    top: 0;
                    left: 0;

                    width: 20%;
                    min-width: 200px;
                    padding: 15px;

                    background-color: white;
                }

                section {
                    margin-bottom: 10px;
                }
                
                section:last-child {
                    margin-bottom: 0;
                }

                h1 {
                    padding: 0;
                    margin: 0;
                }
            `}</style>

            <ReactMapGL
                {...viewport}
                width={'100%'}
                height={'100%'}
                ref={ref => setMapRef(ref)}
                onLoad={() => {
                    setMap(mapRef.getMap())
                }}
                mapStyle={props.mapStyle}
                mapboxApiAccessToken={props.mapboxToken}
                onViewportChange={x => setViewport(x)}
                onClick={event => {
                    const clickCoord = event.lngLat

                    console.log('click coord lnglat', clickCoord)
                }}
            >
                {props.data.features.map((feature, i) => {
                    const [longitude, latitude] = feature.geometry.coordinates
                    // const key = `feature-${feature.properties.id}`
                    const key = `feature-${i}`
                    const fill = 'gold'

                    return (
                        <Marker
                            key={key}
                            longitude={longitude}
                            latitude={latitude}
                        >
                            <Pin
                                size={20}
                                fill={fill}
                                onClick={() => {
                                    setPopup({
                                        latitude,
                                        longitude,
                                        feature,
                                    })
                                }}
                            />
                        </Marker>
                    )
                })}

                {popup && (
                    <Popup
                        tipSize={5}
                        anchor={'top'}
                        longitude={popup.longitude}
                        latitude={popup.latitude}
                        closeOnClick={false}
                        onClose={() => setPopup(null)}
                    >
                        <FeatureAttributesEditor
                            feature={popupFeature}
                            onChangeFeatureCases={(feature, cases) => {
                                setFeatures({
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
                        {/* <FeatureInfo
                            imageUrl={popup.feature.properties.url}
                            fav={isFav(popup.feature)}
                            onChangeFav={(checked) => {
                                setFavs({
                                    ...favs,
                                    [popup.feature.properties.id]: checked
                                })
                            }}
                        /> */}
                    </Popup>
                )}
            </ReactMapGL>
        </main>
    )
}

export default App
