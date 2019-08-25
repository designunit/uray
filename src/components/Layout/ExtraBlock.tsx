import * as React from 'react'

export interface IExtraBlockProps {
    style?: React.CSSProperties
    extra: React.ReactNode
}

export const ExtraBlock: React.FC<IExtraBlockProps> = props => (
    <section
        style={props.style}
    >
        <style jsx>{`
            section {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .block {
                flex: 1;
            }

            .extra {
            }
        `}</style>

        <div className={'block'}>
            {props.children}
        </div>

        <div className={'extra'}>
            {props.extra}
        </div>
    </section>
)
