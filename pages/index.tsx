import { useState } from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import axios from 'axios'

const TOKEN = process.env.mapboxToken

const DynamicClusterApp = dynamic(() => import('../src/components/ClusterApp'), {
    ssr: false
})

const Page: NextPage<{ data: any[] }> = props => {
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8,
    })
    const [mapRef, setMapRef] = useState(null)
    const [map, setMap] = useState(null)

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
            }}
        >
            <DynamicClusterApp
                data={props.data}
            />
        </div>
    )
}

Page.getInitialProps = async () => {
    const url = process.env.datasetUrl
    const res = await axios(url)

    return {
        data: res.data,
    }
}

export default Page