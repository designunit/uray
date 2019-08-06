import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import axios from 'axios'
import Media from 'react-media'
import { useRequest } from 'use-request-hook'
import { Spin, Icon } from 'antd'

import 'antd/dist/antd.css'
import { IFeatureAttributes } from '../src/app/types';

const DynamicApp = dynamic(() => import('../src/components/App2'), {
    ssr: false
})

const getMapStyle = (dark: boolean) => dark
    ? 'mapbox://styles/mapbox/dark-v9'
    : 'mapbox://styles/mapbox/light-v9'

const getKml = () => axios.get('/api/data/kml').then(({ data }) => data)
const getAttrs = () => axios.get('/api/data/attributes').then(({ data }) => data)

interface IPageProps {
    // data: any
    // favs: any
}

const Page: NextPage<IPageProps> = () => {
    const { isLoading: isAttributesLoading, data: dataAttributes = [] } = useRequest(getAttrs, [])
    const { isLoading: isKmlLoading, data: kml = {} } = useRequest(getKml, {})
    const isLoading = isKmlLoading || isAttributesLoading

    const attributes: IFeatureAttributes = dataAttributes

    const kmlFeatures = kml.features || []
    const geojson: any = {
        type: 'FeatureCollection',
        // features: kmlFeatures.filter(x => x.geometry.type === 'LineString'),
        features: kmlFeatures.filter(x => x.geometry.type === 'Point'),
    }

    console.log(attributes)

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