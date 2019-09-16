// tslint:disable:no-string-literal

import 'antd/dist/antd.css'

import * as React from 'react'

import { ResponsiveSankey } from '@nivo/sankey'
import axios from 'axios'
import { NextPage } from 'next'
import Head from 'next/head'
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
        <main>
            <style jsx>{`
                main {
                    display: flex;
                    flex-direction: column;

                    align-items: center;

                    padding: 0;
                }

                div {
                    width: 60%;
                }

                h1 {
                    margin-bottom: 2em;
                }

                @media screen and (max-width: 1280px) {
                    div {
                        width: 70%;
                    }
                }

                @media screen and (max-width: 800px) {
                    div {
                        width: 90%;
                    }
                }

                @media screen and (max-width: 31.25em) {
                    main {
                        padding: 0 10px;
                    }

                    div {
                        width: 100%;
                    }
                }
            `}</style>

            <div>
                <Head>
                    <title>
                        ППИ::Урай
                    </title>
                </Head>
                <h1>Предпроектное исследование <br />открытых городских пространств г. Урай. <br />Анализ стационарных активностей</h1>

                <h2>Набережная</h2>

                Граф активности пользователей территории Набережной в будний день в период времени с 11:30 до 14:30.
                <Chord
                    matrix={matrix1}
                    keys={keys1}
                />

                <h2>Спортсквер</h2>

                Граф активности пользователей территории Спортсквер в будний день в период времени с 11:30 до 14:30.
                <Chord
                    matrix={matrix2}
                    keys={keys2}
                />

                <h2>Планета звезд</h2>

                Граф активности пользователей площади Планета звезд будний день в период времени с 11:30 до 14:30.
                <Chord
                    matrix={matrix3}
                    keys={keys3}
                />
            </div>
        </main>
    )
}

export default Page
