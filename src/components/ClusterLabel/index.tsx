import * as React from 'react'

export interface IClusterLabelProps {
    label: string
    fill?: string
}

export const ClusterLabel: React.FC<IClusterLabelProps> = props => (
    <div style={{
        backgroundColor: props.fill,
    }}>
        <style jsx>{`
            div {
                display: flex;
                padding: 3px;
                justify-content: center;
                align-items: center;

                font-family: monospace;
                background-color: white;
                color: black;

                border-radius: 100px;
            }

            @media (prefers-color-scheme: dark) {
                div {
                    background-color: black;
                    color: white;
                }
            }
        `}</style>

        {props.label}
    </div>
)
