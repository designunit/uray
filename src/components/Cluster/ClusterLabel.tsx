import * as React from 'react'

export interface IClusterLabelProps {
    label: string
}

export const ClusterLabel: React.FC<IClusterLabelProps> = props => (
    <div>
        <style jsx>{`
            div {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: white;

                font-family: monospace;
            }
        `}</style>

        {props.label}
    </div>
)
