import * as React from 'react'

import { Icon, Spin } from 'antd'
import { Feature, Point } from 'geojson'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { FlyToInterpolator } from 'react-map-gl'
import Media from 'react-media'
import { useRequest } from 'use-request-hook'
import { getFeatures, getLayers, getProject } from '../src/app/api'
import { ILayer } from '../src/app/types'
import { createIndex } from '../src/lib'
import { useData } from '../src/hooks/useData'

const DynamicApp = dynamic(() => import('../src/components/App'), {
    ssr: false,
})

function createOsmStyle() {
    return {
        style: {
            version: 8,
            sources: {
                'osm-tiles': {
                    type: 'raster',
                    tiles: [
                        'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
                        'http://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
                        'http://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    ],
                    tileSize: 256,
                },
            },
            layers: [
                {
                    id: 'osm-tiles',
                    type: 'raster',
                    source: 'osm-tiles',
                    minzoom: 0,
                    maxzoom: 22,
                },
            ],
        },
    }
}

const MAP_STYLE_SATELLITE = 'satellite'
const MAP_STYLE_VECTOR = 'vector'

const mapStyleOptions = [
    {
        value: MAP_STYLE_SATELLITE,
        name: 'Satellite',
    },
    {
        value: MAP_STYLE_VECTOR,
        name: 'Vector',
    },
]

const getMapStyle = (dark: boolean) => dark
    ? 'mapbox://styles/mapbox/dark-v9'
    : 'mapbox://styles/mapbox/light-v9'

const loadProject = () => getProject(1)

const Page: NextPage = () => {
    const readonly = true // process.env.APP_ACCESS_MODE === 'readonly'
    const mapboxToken = process.env.MAPBOX_TOKEN || ''
    const wesocketUrl = process.env.API_WS_URL

    const [isLoading, {project, layers, features}] = useData()
    const [mapStyleOption, setMapStyleOption] = React.useState<string>(mapStyleOptions[0].value)

    const featureIndex = createIndex<Feature<Point>>(features, f => `${f.id}`)
    const layerIndex = createIndex<ILayer>(layers, layer => `${layer.id}`)

    return (
        <div>
            <style jsx>{`
                div {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }

                .center {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
           `}</style>

            <Media
                query={[
                    { prefersColorScheme: 'dark' },
                ]}
            >
                {darkScheme => (
                    <Media
                        query={[
                            { maxWidth: '31.25em' },
                        ]}
                    >
                        {isMobile => {
                            const mapStyle = mapStyleOption === MAP_STYLE_SATELLITE
                                ? 'mapbox://styles/mapbox/satellite-streets-v11'
                                : getMapStyle(darkScheme)
                            const drawerPlacement = isMobile
                                ? 'bottom'
                                : 'right'

                            return isLoading ? (
                                <section className={'center'}>
                                    <Spin
                                        indicator={(
                                            <Icon
                                                spin
                                                type={'loading'}
                                                style={{
                                                    fontSize: 24,
                                                }}
                                            />
                                        )}
                                    />
                                </section>
                            ) : (
                                    <DynamicApp
                                        transitionDuration={500}
                                        transitionInterpolator={new FlyToInterpolator()}
                                        websocketUrl={wesocketUrl}
                                        canAddLayers={!readonly}
                                        canEditLayers={!readonly}
                                        canDeleteLayers={!readonly}
                                        canDownloadLayers={!readonly}
                                        canAddFeatures={!readonly}
                                        canEditFeatures={!readonly}
                                        canDeleteFeatures={!readonly}
                                        canChangeFeatureLayer={!readonly}
                                        canMoveLayers={!readonly}
                                        canUploadGeoJson={!readonly}
                                        project={project}
                                        layerIndex={layerIndex}
                                        featureIndex={featureIndex}
                                        drawerPlacement={drawerPlacement}
                                        mapboxToken={mapboxToken}
                                        mapStyle={mapStyle}
                                        mapStyleOption={mapStyleOption}
                                        mapStyleOptions={mapStyleOptions}
                                        onChangeMapStyleOption={setMapStyleOption}
                                    />
                                )
                        }}
                    </Media>
                )}
            </Media>
        </div>
    )
}

export default Page
