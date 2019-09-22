import * as React from 'react'

import { NextPage } from 'next'
import dynamic from 'next/dynamic'

const Heatmap = dynamic(() => import('../src/infographics/components/Heatmap'), {
    ssr: false,
})

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN // Set your mapbox token here

const Page: NextPage<{}> = (props) => {
    const layerId = 19
    const dataUrl = `/api/geojson\?layer=${layerId}`

    const MAX_ZOOM_LEVEL = 22
    // const heatmapField = 'mag'
    const heatmapField = 'Количество'
    const heatmap = {
            minzoom: 9,
            maxzoom: MAX_ZOOM_LEVEL,
            type: 'heatmap',
            paint: {
                // Increase the heatmap weight based on frequency and property magnitude
                'heatmap-weight': ['interpolate', ['linear'], ['get', heatmapField],
                    0, 0,
                    11, 1,
                ],
                // Increase the heatmap color weight weight by zoom level
                // heatmap-intensity is a multiplier on top of heatmap-weight
                // 'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, MAX_ZOOM_LEVEL, 3],
                // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                // Begin color ramp at 0-stop with a 0-transparancy color
                // to create a blur-like effect.
                // 'heatmap-color': [
                //     'interpolate',
                //     ['linear'],
                //     ['heatmap-density'],
                //     0,
                //     'rgba(33,102,172,0)',
                //     0.2,
                //     'rgb(103,169,207)',
                //     0.4,
                //     'rgb(209,229,240)',
                //     0.6,
                //     'rgb(253,219,199)',
                //     0.8,
                //     'rgb(239,138,98)',
                //     0.9,
                //     'rgb(255,201,101)',
                // ],
                // Adjust the heatmap radius by zoom level
                'heatmap-radius': 20,
                // 'heatmap-radius': ['interpolate', ['linear'], ['zoom'],
                //     0, 2,
                //     MAX_ZOOM_LEVEL, 20,
                // ],
                // Transition from heatmap to circle layer by zoom level
                // 'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0],
            },
        }

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
