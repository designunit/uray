import * as React from 'react'

export const FeatureInfo: React.FC<{ imageUrl: string }> = props => {
    return (
        <div>
            <img
                width={240}
                src={props.imageUrl}
            />
        </div>
    )
}
