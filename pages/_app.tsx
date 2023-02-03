import * as  React from 'react'

import type { AppProps } from 'next/app'

import 'antd/dist/antd.css'
import 'mapbox-gl/dist/mapbox-gl.css'

type Props = {}

export default function MyApp({ Component, pageProps }: AppProps<Props>) {
    return (
        <div>
            <style global jsx>{`
                    #__next {
                        height: 100%;
                    }
                `}</style>

            <Component {...pageProps} />
        </div>
    )
}

