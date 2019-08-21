import * as React from 'react'
import { ResponsiveSankey } from '@nivo/sankey'

export type NivoNode = {
    id: string,
    color?: string,
}

export type NivoLink = {
    source: string,
    target: string,
    value: number,
}

interface ISankeyProps {
    style?: React.CSSProperties
    data: {
        links: NivoLink[]
        nodes: NivoNode[]
    }
    defaultColorSet: string[]
    showLegend: boolean
    layout?: 'vertical' | 'horizontal'
    labelLayout?: 'vertical' | 'horizontal'
}

export const Sankey: React.FC<ISankeyProps> = ({
    layout = 'horizontal',
    labelLayout = 'horizontal',
    ...props }
) => {
    const defaultColorSetSize = props.defaultColorSet.length
    const legendWidth = 200
    const marginRight = props.showLegend ? legendWidth : 0
    const margin = {
        top: 0,
        right: marginRight,
        bottom: 0,
        left: 0,
    }

    const Sankey = ResponsiveSankey as any
    // const Sankey = ResponsiveSankey

    const linkedIds = props.data.links.reduce(
        (acc, x) => acc.add(x.source).add(x.target),
        new Set<string>(),
    )

    const data = {
        links: props.data.links,
        nodes: props.data.nodes
            .filter(node => {
                return linkedIds.has(node.id)
            })
            .map((node, index) => {
                const color = props.defaultColorSet[index % defaultColorSetSize]

                if (!node.color) {
                    return {
                        ...node,
                        color,
                    }
                }

                return node
            })

        ,
    }

    return (
        <div style={props.style}>
            <style jsx>{`
                div {
                    width: 100%;
                    height: 500px;
                }
            `}</style>

            <Sankey
                data={data}
                margin={margin}
                layout={layout}
                align={'justify'}
                colors={(node) => {
                    if (node.id) {
                        return node.color
                    }
                }}
                nodeOpacity={1}
                nodeThickness={18}
                nodeInnerPadding={2}
                nodeSpacing={4}
                nodeBorderWidth={0}
                // nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
                linkOpacity={0.5}
                linkHoverOthersOpacity={0.1}
                enableLinkGradient={true}
                label={'label'}
                // labelPosition="outside"
                // labelOrientation={'horizontal'}
                // enableLabels={false}
                labelOrientation={labelLayout}
                labelPadding={8}
                // labelTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
                animate={false}
                // motionStiffness={140}
                // motionDamping={13}
                legends={!props.showLegend ? [] : [
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        translateX: legendWidth,
                        translateY: -20,
                        itemWidth: legendWidth,
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
