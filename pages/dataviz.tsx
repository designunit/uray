// tslint:disable:no-string-literal

import 'antd/dist/antd.css'

import * as React from 'react'

import { ResponsiveSankey } from '@nivo/sankey'
import axios from 'axios'
import { NextPage } from 'next'
import { useRequest } from 'use-request-hook'

import { Json } from '../src/components/Json'
import { reduceChartMatrix } from '../src/infographics/app'
import { Chord } from '../src/infographics/components/Chord'
import { createMatrix } from '../src/infographics/lib'

const Sankey = ResponsiveSankey as any

const loadDataset = async () => {
    const res = await axios.get('/static/1309-uray.json')

    return res.data
}

interface IPageProps {
}

const Page: NextPage<IPageProps> = (props) => {
    const { isLoading, data } = useRequest(loadDataset, {})

    if (!data) {
        return null
    }

    const order = [
        'Взрослые',
        'Молодежь',
        'Дети',
        'Школьники',
        'Дошкольники',
        'Ж',
        'М',
        'Идут',
        'Стоят',
        'Сидят',
        'Едят/пьют',
        'Играют',
        'Велосипед',
        'Пенсионеры',
        'С коляской',
        'С собакой',
        'Смартфон',
        'Спорт',
    ]

    const powerFn = (item) => item['Количество']

    const [matrix1, keys1] = reduceChartMatrix(createMatrix(powerFn, order, data.filter(
        x => x['location'] === 1,
    )), order)
    const [matrix2, keys2] = reduceChartMatrix(createMatrix(powerFn, order, data.filter(
        x => x['location'] === 2,
    )), order)
    const [matrix3, keys3] = reduceChartMatrix(createMatrix(powerFn, order, data.filter(
        x => x['location'] === 3,
    )), order)

    return (
        <div>
            <style jsx>{`
                div {
                    //display: flex;
                }
            `}</style>

            <h2>Набережная</h2>
            <Chord
                matrix={matrix1}
                keys={keys1}
            />

            <h2>Спортсквер</h2>
            <Chord
                matrix={matrix2}
                keys={keys2}
            />

            <h2>Планета звезд</h2>
            <Chord
                matrix={matrix3}
                keys={keys3}
            />

            {/* <Sankey
                data={{
                    nodes: [
                        {
                            id: 'Jane',
                        },
                        {
                            id: 'Junko',
                        },
                    ],
                    links: [
                        {
                            source: 'Jane',
                            target: 'Junko',
                            value: 153,
                        },
                    ],
                }}
            // margin={margin}
            // layout={layout}
            // align={'justify'}
            // colors={(node) => {
            //     if (node.id) {
            //         return node.color
            //     }
            // }}
            // nodeOpacity={1}
            // nodeThickness={18}
            // nodeInnerPadding={2}
            // nodeSpacing={4}
            // nodeBorderWidth={0}
            // nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
            // linkOpacity={0.5}
            // linkHoverOthersOpacity={0.1}
            // enableLinkGradient={true}
            // label={'label'}
            // labelPosition="outside"
            // labelOrientation={'horizontal'}
            // enableLabels={false}
            // labelOrientation={labelLayout}
            // labelPadding={8}
            // labelTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
            // animate={false}
            // motionStiffness={140}
            // motionDamping={13}
            /> */}

            {/* <Json data={matrix1} /> */}
            {/* <Json data={data} /> */}
        </div>
    )
}

export default Page
