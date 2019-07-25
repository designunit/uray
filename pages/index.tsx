import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import axios from 'axios'
import Media from 'react-media'

import 'antd/dist/antd.css'

const DynamicApp = dynamic(() => import('../src/components/App'), {
    ssr: false
})

const Page: NextPage<{ data: any }> = props => (
    <div>
        <style jsx>{`
            div {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
        `}</style>

        <Media query="(prefers-color-scheme: dark)">
            {matches => {
                const mapStyle = matches
                    ? 'mapbox://styles/mapbox/dark-v9'
                    : 'mapbox://styles/mapbox/light-v9'
                return (
                    <DynamicApp
                        mapboxToken={process.env.mapboxToken}
                        mapStyle={mapStyle}
                        data={props.data}
                        center={[62.703778, 129.677299]}
                    />
                )
            }
    }
        </Media>
    </div>
)

Page.getInitialProps = async () => {
    const res = await axios(
        process.env.datasetUrl
    )

    return {
        data: res.data,
    }
}

export default Page