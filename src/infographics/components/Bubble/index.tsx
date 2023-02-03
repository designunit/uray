import * as React from 'react'
import Ratio from 'react-ratio'

import { ResponsiveCirclePacking } from '@nivo/circle-packing'

const NivoBubble = ResponsiveCirclePacking as any

export interface IChordProps {
    style?: React.CSSProperties
    tree: any
}

export const Bubble: React.FC<IChordProps> = props => (
    <Ratio
        style={props.style}
        ratio={1}
    >
        <NivoBubble
            data={props.tree}
            margin={{
                top: 30,
                right: 30,
                bottom: 30,
                left: 30,
            }}
            id='name'
            value='value'
            // colors={{
            //     scheme: 'nivo',
            // }}
            padding={6}
            labelTextColor={{
                from: 'color',
                modifiers: [['darker', 2.5]],
            }}
            labelsFilter={n => {
                return n.node.depth === 3
            }}
            enableLabels={true}
            // borderWidth={2}
            // borderColor={{ from: 'color' }}
            // colorBy={'color'}
            // colors={(node) => {
            //     // console.log('color node', node.name, node.color)
            //     return node.color
            //     // return 100
            //     // return 'hsl(188, 70%, 50%)'
            //     // return Math.round(Math.random() * 255)
            //     // return 'rgb(255, 0, 255)'
            // }}
            // defs={[
            //     {
            //         id: 'lines',
            //         type: 'patternLines',
            //         // background: 'none',
            //         color: 'inherit',
            //         // color: 'skyblue',
            //         rotation: -45,
            //         lineWidth: 2,
            //         spacing: 4,
            //     },
            // ]}
            isZoomable={false}
            // fill={[{ match: { depth: 0 }, id: 'lines' }]}
            animate={false}
        // motionStiffness={90}
        // motionDamping={12}
        />
    </Ratio>
)
