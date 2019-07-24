import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import axios from 'axios'

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

        <DynamicApp
            mapboxToken={process.env.mapboxToken}
            mapStyle={'mapbox://styles/mapbox/dark-v9'}
            data={props.data}
            center={[62.703778, 129.677299]}
    />
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