import * as React from 'react'

export const Container: React.FC = props => {
    return (
        <main>
            <style jsx>{`
                main {
                    width: 100%;
                    height: 100%;

                    position: relative;
                }

                aside {
                    position: absolute;
                    top: 0;
                    left: 0;

                    width: 20%;
                    min-width: 200px;
                    padding: 15px;

                    background-color: white;
                }

                section {
                    margin-bottom: 10px;
                }
                
                section:last-child {
                    margin-bottom: 0;
                }

                h1 {
                    padding: 0;
                    margin: 0;
                }
            `}</style>

            {props.children}
        </main>
    )
}
