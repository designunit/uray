import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Media from 'react-media'
import { FeatureCollection, Point, GeoJsonGeometryTypes } from 'geojson'
import { Spin, Icon } from 'antd'
import { useRequest } from 'use-request-hook'
import { IFeatureProperties } from '../src/app/types'
import { flatMapTree } from '../src/lib/tree'
import { treeCaseData } from '../src/app'
import { getCases } from '../src/app/api'

import 'antd/dist/antd.css'

const DynamicApp = dynamic(() => import('../src/components/App2'), {
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
    data: FeatureCollection<Point>
    // favs: any
}

const Page: NextPage<IPageProps> = (props) => {
    const { isLoading: isCasesLoading, data = [] } = useRequest(getCases, [])
    const isLoading = isCasesLoading
    const [mapStyleOption, setMapStyleOption] = React.useState<string>(mapStyleOptions[0].value)

    const geojson: FeatureCollection<Point, IFeatureProperties> = {
        type: 'FeatureCollection',
        features: data.map(x => x.feature),
    }
    const defaultCheckedCaseKeys = flatMapTree<string, { key: string }>(x => x.key, treeCaseData())

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
                                        drawerPlacement={drawerPlacement}
                                        mapboxToken={process.env.MAPBOX_TOKEN}
                                        mapStyle={mapStyle}
                                        mapStyleOption={mapStyleOption}
                                        mapStyleOptions={mapStyleOptions}
                                        defaultCheckedCaseKeys={defaultCheckedCaseKeys}
                                        onChangeMapStyleOption={setMapStyleOption}
                                        data={geojson}
                                        center={[63.46255030526142, 142.78664300880652]}
                                        zoom={12}
                                        layers={[
                                            {
                                                name: 'Old',
                                                data: props.data
                                            }
                                        ]}
                                    />
                                )
                        }}
                    </Media>
                )}
            </Media>
        </div>
    )
}

Page.getInitialProps = async (ctx) => {
    const oldRes = await axios.get('https://raw.githubusercontent.com/designunit/oymyakon-data/master/oymyakon_old.geojson')

    return {
        data: oldRes.data,
    }
}

export default Page