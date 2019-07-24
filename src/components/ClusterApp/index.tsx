import * as React from 'react'
import { NextPage } from 'next'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { Cluster } from '../Cluster'
import { Pin } from '../MarkerIcon/Pin';
import { FeatureInfo } from '../FeatureInfo';
// import { SVGOverlay, Marker } from 'react-map-gl'

const TOKEN = 'pk.eyJ1IjoidG1zaHYiLCJhIjoiM3BMLVc2MCJ9.PM9ukwAm-YUGlrBqt4V6vw'

const ClusterApp: NextPage<{ data: any[] }> = props => {
    const [longitude, latitude] = [129.677299, 62.703778]
    const [viewport, setViewport] = React.useState({
        width: '100%',
        height: '100%',
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
            ref={ref => setMapRef(ref)}
            onLoad={() => {
                setMap(mapRef.getMap())
            }}
            mapStyle="mapbox://styles/mapbox/dark-v9"
            mapboxApiAccessToken={TOKEN}
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
                    data={props.data}
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
                    anchor="top"
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

export default ClusterApp
