import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import axios from 'axios'
import Media from 'react-media'
import { FeatureCollection, Point } from 'geojson'
import { Spin, Icon } from 'antd'
import { useRequest } from 'use-request-hook'
import { IFeatureProperties } from '../src/app/types'

import 'antd/dist/antd.css'

const DynamicApp = dynamic(() => import('../src/components/App2'), {
    ssr: false
})

const getMapStyle = (dark: boolean) => dark
    ? 'mapbox://styles/mapbox/dark-v9'
    : 'mapbox://styles/mapbox/light-v9'

const getCases = () => axios.get('/api/data/cases').then(({ data }) => data)

interface IPageProps {
    // data: any
    // favs: any
}

const Page: NextPage<IPageProps> = () => {
    const { isLoading: isCasesLoading, data = { type: 'FeatureCollection', features: [] } } = useRequest(getCases, {})
    const isLoading = isCasesLoading
    const geojson: FeatureCollection<Point, IFeatureProperties> = data

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
                    // const mapStyle = getMapStyle(matches)
                    const mapStyle = 'mapbox://styles/mapbox/satellite-streets-v11'

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