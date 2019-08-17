import * as React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { ResponsiveSankey } from '@nivo/sankey'
import { arrayToDomains } from '../src/lib/array'

type NivoLink = {
    source: string,
    target: string,
    value: number,
}

function collect(transitions: Array<[number, string[]]>): NivoLink[]{
    const result = transitions.flatMap(link => {
        const value = link[0] as number
        const transition = link[1] as string[]
        const ts = arrayToDomains(transition)

        return ts.map(([source, target]) => ({
            source,
            target,
            value,
            key: `${source}-${target}`
        }))
    }).reduce((acc, link) => {
        const stored = acc.has(link.key) ? acc.get(link.key) : {
            source: link.source,
            target: link.target,
            value: 0,
        }
        const value = stored.value + link.value
        acc.set(link.key, {
            ...stored,
            value,
        })
        return acc
    }, new Map<string, NivoLink>())

    return Array.from(
        result.values()
    )
}

interface IPageProps {
}

const Page: NextPage<IPageProps> = (props) => {
    // make sure parent container have a defined height when using
    // responsive component, otherwise height will be 0 and
    // no chart will be rendered.
    // website examples showcase many properties,
    // you'll often use just a few of them.

    const links = collect([
        [1, ["users-group", "season-w", "topic-oym", "infra-drone", "place-oymyakon"]],
        [1, ["users-group", "season-w", "topic-oym", "infra-drone", "place-hotkey"]],
        [1, ["users-group", "season-w", "topic-gulag", "infra-drone", "place-tomtor"]],
        [2, ["users-lux", "season-w", "topic-gulag", "infra-drone", "place-tomtor"]],
        [2, ["users-lux", "season-s", "topic-oym", "infra-dog", "place-topolynoe"]],
        [2, ["users-mass", "season-s", "topic-oym", "infra-dog", "place-topolynoe"]],
        [2, ["users-nomad", "season-w", "topic-gulag", "infra-zeppelin", "place-topolynoe"]],
    ])

    console.log(links)

    const data = {
        "nodes": [
            {
                "id": "users-lux",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "users-mass",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "users-nomad",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "users-group",
                "color": "rgb(0, 0, 0)"
            },

            {
                "id": "topic-eco",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "topic-gulag",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "topic-oym",
                "color": "rgb(0, 0, 0)"
            },

            {
                "id": "season-w",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "season-s",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "season-m",
                "color": "rgb(0, 0, 0)"
            },

            {
                "id": "infra-zeppelin",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "infra-volgobus",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "infra-drone",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "infra-cargo_drone",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "infra-cert",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "infra-plane",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "infra-unit",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "infra-suit",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "infra-shelter",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "infra-camp",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "infra-hom",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "infra-guest",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "infra-infobox",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "infra-office",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "infra-roads",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "infra-kayak",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "infra-horse",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "infra-dog",
                "color": "rgb(0, 0, 0)"
            },

            {
                "id": "place-oymyakon",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "place-hotkey",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "place-shelter",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "place-suit",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "place-tomtor",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "place-yuchugey",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "place-topolynoe",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "place-labinkir",
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": "place-academic_hotkey",
                "color": "rgb(0, 0, 0)"
            },
        ],
        "links": links,
        // "links": [
        //     {
        //         "source": "users-group",
        //         "target": "season-w",
        //         "value": 2
        //     },
        //     {
        //         "source": "topic-oym",
        //         "target": "place-hotkey",
        //         "value": 1
        //     },
        //     {
        //         "source": "topic-oym",
        //         "target": "place-oymyakon",
        //         "value": 2
        //     },
        //     {
        //         "source": "users-mass",
        //         "target": "season-w",
        //         "value": 1
        //     },
        //     {
        //         "source": "season-w",
        //         "target": "topic-oym",
        //         "value": 1
        //     },

        //     // {
        //     //     "id": "users-mass",
        //     //     "color": "rgb(0, 0, 0)"
        //     // },
        //     // {
        //     //     "id": "users-nomad",
        //     //     "color": "rgb(0, 0, 0)"
        //     // },
        //     // {
        //     //     "id": "users-group",
        //     //     "color": "rgb(0, 0, 0)"
        //     // },
        // ]
    }

    const Sankey = ResponsiveSankey as any
    // const Sankey = ResponsiveSankey

    return (
        <div>
            <style jsx>{`
                div {
                    width: 100%;
                    height: 100vh;
                }
            `}</style>

            <Head>
                <title>Oymyakon Dataviz</title>
            </Head>

            {/* <h1>Oymyakon Dataviz</h1> */}

            <Sankey
                data={data}
                margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
                align="justify"
                colors={{ scheme: 'category10' }}
                nodeOpacity={1}
                nodeThickness={18}
                nodeInnerPadding={3}
                nodeSpacing={24}
                nodeBorderWidth={0}
                nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
                linkOpacity={0.5}
                linkHoverOthersOpacity={0.1}
                enableLinkGradient={true}
                labelPosition="outside"
                labelOrientation="vertical"
                labelPadding={16}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
                animate={true}
                motionStiffness={140}
                motionDamping={13}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        translateX: 130,
                        itemWidth: 100,
                        itemHeight: 14,
                        itemDirection: 'right-to-left',
                        itemsSpacing: 2,
                        itemTextColor: '#999',
                        symbolSize: 14,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    )
}

export default Page