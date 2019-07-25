import * as React from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { Cluster } from '../Cluster'
import { Pin } from '../MarkerIcon/Pin'
import { FeatureInfo } from '../FeatureInfo'
import { FeatureCollection, Point, Feature } from 'geojson'
import { ClusterLabel } from '../ClusterLabel'
import { getFavs, saveFavs } from './lib';

export interface IFeatureProperties {
    id: string
    url: string
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
    const [viewport, setViewport] = React.useState({
        latitude,
        longitude,
        zoom: props.zoom,
    })
    const [mapRef, setMapRef] = React.useState(null)
    const [map, setMap] = React.useState(null)
    const [popup, setPopup] = React.useState<FeaturePopup>(null)
    const [favs, setFavs] = React.useState(getFavs())
    const isFavovite = (featureId: string) => {
        if (!(featureId in favs)) {
            return false
        }

        return favs[featureId]
    }
    const isFav = (feature: Feature<Point, IFeatureProperties>) => isFavovite(
        feature.properties.id
    )

    const favIds = Object.keys(favs).filter(isFavovite)

    React.useEffect(() => {
        saveFavs(favs)
    })

    return (
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
            onViewportChange={x => setViewport(x as any)}
            onClick={event => {
                const clickCoord = event.lngLat

                console.log('click coord lnglat', clickCoord)
            }}
        >
            {map && (
                <Cluster<IFeatureProperties>
                    map={map}
                    minZoom={0}
                    maxZoom={16}
                    radius={100}
                    extent={512}
                    nodeSize={64}
                    data={props.data.features}
                    getDataHash={() => favIds.join('')}
                    clusterMap={(props: any) => ({
                        fav: isFavovite(props.id)
                    })}
                    clusterReduce={(acc, props: any) => {
                        acc.fav = acc.fav | props.fav
                    }}
                    renderCluster={(cluster, sc) => {
                        const clusterId = cluster.properties.cluster_id
                        const [longitude, latitude] = cluster.geometry.coordinates
                        const clusterSize = cluster.properties.point_count
                        // const features = sc.getLeaves(clusterId, Infinity)
                        // const fav = features.some(isFav)
                        const fav = cluster.properties['fav']
                        const fill = fav ? 'gold' : null

                        return (
                            <Marker
                                key={`cluster-${clusterId}`}
                                longitude={longitude}
                                latitude={latitude}
                            >
                                <ClusterLabel
                                    label={`${clusterSize}`}
                                    fill={fill}
                                />
                            </Marker>
                        )
                    }}
                    renderFeature={(feature: Feature<Point, IFeatureProperties>) => {
                        const [longitude, latitude] = feature.geometry.coordinates
                        const key = `feature-${feature.properties.id}`
                        const fill = isFav(feature)
                            ? 'gold'
                            : 'tomato'

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
                    }}
                />
            )}

            {popup && (
                <Popup
                    tipSize={5}
                    anchor={'top'}
                    longitude={popup.longitude}
                    latitude={popup.latitude}
                    closeOnClick={false}
                    onClose={() => setPopup(null)}
                >
                    <FeatureInfo
                        imageUrl={popup.feature.properties.url}
                        fav={isFav(popup.feature)}
                        onChangeFav={(checked) => {
                            setFavs({
                                ...favs,
                                [popup.feature.properties.id]: checked
                            })
                        }}
                    />
                </Popup>
            )}
        </ReactMapGL>
    )
}

export default App
