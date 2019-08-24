import * as React from 'react'

export const Container: React.FC<React.HTMLAttributes<HTMLElement>> = ({children, ...props}) => {
    return (
        <main {...props}>
            <style jsx>{`
                main {
                    width: 100%;
                    height: 100%;

                    position: relative;
                }
            `}</style>

            {children}
        </main>
    )
}
