import * as React from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Media from 'react-media'
import { Point } from 'geojson'
import { Spin, Icon } from 'antd'
import { useRequest } from 'use-request-hook'
import { flatMapTree } from '../src/lib/tree'
import { treeCaseData } from '../src/app'
import { getLayers, getFeatures } from '../src/app/api'
import { createFeatureIndex } from '../src/lib/geojson'

import 'antd/dist/antd.css'

const DynamicApp = dynamic(() => import('../src/components/App'), {
    ssr: false
})

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

interface IPageProps {
}

const Page: NextPage<IPageProps> = (props) => {
    const { isLoading: isFeaturesLoading, data: features = [] } = useRequest(getFeatures, [])
    const { isLoading: isLayersLoading, data: userLayers = [] } = useRequest(getLayers, [])
    const isLoading = isLayersLoading || isFeaturesLoading
    const [mapStyleOption, setMapStyleOption] = React.useState<string>(mapStyleOptions[0].value)

    const defaultCheckedCaseKeys = flatMapTree<string, { key: string }>(x => x.key, treeCaseData())
    const featureIndex = createIndex<Feature<Point>>(features, f => `${f.id}`)

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

            <Head>
                <title>Oymyakon</title>
            </Head>

            <Media query={[
                { prefersColorScheme: 'dark' },
            ]}>
                {darkScheme => (
                    <Media query={[
                        { maxWidth: '31.25em', },
                    ]}>
                        {isMobile => {
                            const mapStyle = mapStyleOption === MAP_STYLE_SATELLITE
                                ? 'mapbox://styles/mapbox/satellite-streets-v11'
                                : getMapStyle(darkScheme)
                            const drawerPlacement = isMobile
                                ? 'bottom'
                                : 'right'

                            return isLoading ? (
                                <section className={'center'}>
                                    <Spin indicator={(
                                        <Icon spin type={'loading'} style={{
                                            fontSize: 24
                                        }} />
                                    )} />
                                </section>
                            ) : (
                                    <DynamicApp
                                        userLayers={userLayers}
                                        featureIndex={featureIndex}
                                        drawerPlacement={drawerPlacement}
                                        mapboxToken={process.env.MAPBOX_TOKEN}
                                        mapStyle={mapStyle}
                                        mapStyleOption={mapStyleOption}
                                        mapStyleOptions={mapStyleOptions}
                                        defaultCheckedCaseKeys={defaultCheckedCaseKeys}
                                        onChangeMapStyleOption={setMapStyleOption}
                                        center={[63.46255030526142, 142.78664300880652]}
                                        zoom={12}
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