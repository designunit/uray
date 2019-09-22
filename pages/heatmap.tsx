import * as React from 'react'

import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { HeatmapBuilder } from '../src/infographics/heatmap'

const Heatmap = dynamic(() => import('../src/infographics/components/Heatmap'), {
    ssr: false,
})

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN // Set your mapbox token here

const Page: NextPage<{}> = (props) => {
    const layerId = 19
    const dataUrl = `/api/geojson\?layer=${layerId}`

    const heatmap = HeatmapBuilder
        .new()
        .setField('Количество')
        .setRadius(20)
        .setMinZoom(9)
        .setMaxZoom(22)
        .build()

    return (
        <Heatmap
            heatmap={heatmap}
            mapboxToken={MAPBOX_TOKEN}
            mapStyle={'mapbox://styles/mapbox/dark-v9'}
            dataUrl={dataUrl}
            startZoom={13}
            startCoord={{
                latitude: 60.12380893107247,
                longitude: 64.79488837184576,
            }}
        />
    )
}

export default Page
