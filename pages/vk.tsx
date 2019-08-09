import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import axios from 'axios'
import Media from 'react-media'
import { useRequest } from 'use-request-hook'
import { Spin, Icon } from 'antd'

import 'antd/dist/antd.css'

const DynamicApp = dynamic(() => import('../src/components/App'), {
    ssr: false
})

const getMapStyle = (dark: boolean) => dark
    ? 'mapbox://styles/mapbox/dark-v9'
    : 'mapbox://styles/mapbox/light-v9'

const normalizeData = ({ data }) => data
const getFeatures = () => axios.get(process.env.DATASET_URL).then(normalizeData)
const getFavs = () => axios.get('/api/data/favs').then(normalizeData)
const getKml = () => axios.get('/api/data/kml')

interface IPageProps {
    // data: any
    // favs: any
}

const Page: NextPage<IPageProps> = () => {
    const { isLoading: isGeojsonLoading, data: geojson = {} } = useRequest(getFeatures, [])
    const { isLoading: isFavsLoading, data: favs = {} } = useRequest(getFavs, [])
    const { isLoading: isKmlLoading, data: kml = {} } = useRequest(getKml, {})
    const isLoading = isGeojsonLoading || isFavsLoading

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
                    const mapStyle = getMapStyle(matches)

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
                            favs={favs}
                            center={[63.46255030526142, 142.78664300880652]}
                            zoom={12}
                        />
                    )
                }}
            </Media>
        </div>
    )
}

// Page.getInitialProps = async ctx => {
// //     const isServer = !!ctx.req
// //     // const baseUrl = isServer
// //     //     ? process.env.SERVER_API_BASE
// //     //     : ''

// //     const res = await axios(
// //         process.env.DATASET_URL
// //     )

// //     // const favRes = await axios(
// //     //     `${baseUrl}/api/data/favs`
// //     // )

//     return {
//         // data: res.data,
//         favs: []//favRes.data.data,
//     }
// }

export default Page