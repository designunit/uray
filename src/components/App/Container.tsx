import * as React from 'react'

export const Container: React.FC<React.HTMLAttributes<HTMLElement>> = ({children, ...props}) => {
    return (
        <div {...props}>
            <style jsx>{`
                div {
                    width: 100%;
                    height: 100%;

                    position: absolute;
                }
            `}</style>

            {children}
        </div>
    )
}
