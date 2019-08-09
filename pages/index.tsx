import * as React from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Media from 'react-media'
import { FeatureCollection, Point } from 'geojson'
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
    // data: any
    // favs: any
}

const Page: NextPage<IPageProps> = () => {
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

            <Media query={'(prefers-color-scheme: dark)'}>
                {matches => {
                    const mapStyle = mapStyleOption === MAP_STYLE_SATELLITE
                        ? 'mapbox://styles/mapbox/satellite-streets-v11'
                        : getMapStyle(matches)

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
                                mapboxToken={process.env.MAPBOX_TOKEN}
                                mapStyle={mapStyle}
                                mapStyleOption={mapStyleOption}
                                mapStyleOptions={mapStyleOptions}
                                defaultCheckedCaseKeys={defaultCheckedCaseKeys}
                                onChangeMapStyleOption={setMapStyleOption}
                                data={geojson}
                                center={[63.46255030526142, 142.78664300880652]}
                                zoom={12}
                            />
                        )
                }}
            </Media>
        </div>
    )
}

export default Page