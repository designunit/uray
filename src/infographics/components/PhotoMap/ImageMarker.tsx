import * as React from 'react'

interface IImageMarkerProps {
    size: number
    src: string
}

export const ImageMarker: React.FC<IImageMarkerProps> = React.memo(props => {
    const [loaded, setLoaded] = React.useState(false)
    const onLoad = React.useCallback(() => {
        setLoaded(true)
    }, [])

    return (
        <div
            style={{
                width: `${props.size}px`,
                height: `${props.size}px`,
                opacity: loaded ? null : 0,
            }}
        >
            <style jsx>{`
                div {
                    width: 50px;
                    height: 50px;

                    transform: translate(-50%, -50%);
                }

                img {
                    display: block;
                    width: 100%;
                    height: 100%;

                    background-color: white;
                    border: 2px solid white;
                    border-radius: 50%;
                }
            `}</style>
            <img
                src={props.src}
                onLoad={onLoad}
            />
        </div>
    )
})
