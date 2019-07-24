import * as React from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { Cluster } from '../Cluster'
import { Pin } from '../MarkerIcon/Pin'
import { FeatureInfo } from '../FeatureInfo'
import { FeatureCollection, Point } from 'geojson'

export interface IAppProps {
    mapboxToken: string
    center: [number, number]
    data: FeatureCollection<Point, { url: string }>
    mapStyle: string
}

const App: React.FC<IAppProps> = props => {
    const [latitude, longitude] = props.center
    const [viewport, setViewport] = React.useState({
        latitude,
        longitude,
        zoom: 8,
    })
    const [mapRef, setMapRef] = React.useState(null)
    const [map, setMap] = React.useState(null)
    const [popup, setPopup] = React.useState(null)

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
        >
            {map && (
                <Cluster
                    map={map}
                    minZoom={0}
                    maxZoom={16}
                    radius={100}
                    extent={512}
                    nodeSize={64}
                    data={props.data.features}
                    renderFeature={(feature) => {
                        const [longitude, latitude] = feature.geometry.coordinates;
                        const key = `feature-${feature.properties.url}`

                        return (
                            <Marker
                                key={key}
                                longitude={longitude}
                                latitude={latitude}
                            >
                                <Pin
                                    size={20}
                                    onClick={() => {
                                        setPopup({
                                            longitude,
                                            latitude,
                                            properties: feature.properties,
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
                        imageUrl={popup.properties.url}
                    />
                </Popup>
            )}
        </ReactMapGL>
    )
}

export default App
