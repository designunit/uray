// tslint:disable:no-string-literal

import 'antd/dist/antd.css'

import * as React from 'react'

import { ResponsiveSankey } from '@nivo/sankey'
import axios from 'axios'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRequest } from 'use-request-hook'

import { Json } from '../src/components/Json'
import { createPieData, createTree, reduceChartMatrix } from '../src/infographics/app'
import { Bubble } from '../src/infographics/components/Bubble'
import { Chord } from '../src/infographics/components/Chord'
import { Pie } from '../src/infographics/components/Pie'
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

    const location1 = data.filter(
        x => x['location'] === 1,
    )
    const location2 = data.filter(
        x => x['location'] === 2,
    )
    const location3 = data.filter(
        x => x['location'] === 3,
    )

    const [matrix1, keys1] = reduceChartMatrix(createMatrix(powerFn, order, location1), order)
    const [matrix2, keys2] = reduceChartMatrix(createMatrix(powerFn, order, location2), order)
    const [matrix3, keys3] = reduceChartMatrix(createMatrix(powerFn, order, location3), order)

    const activityKeys = [
        'Стоят',
        'Сидят',
        'Едят/пьют',
        'Играют',
        'Спорт',
        'Идут',
        'Велосипед',
        'С коляской',
        'С собакой',
        'Смартфон',
    ]
    const ageKeys = [
        'Пенсионеры',
        'Взрослые',
        'Молодежь',
        'Дети',
        'Школьники',
        'Дошкольники',
    ]

    const pieActivity1 = createPieData(location1, activityKeys, powerFn)
    const pieAge1 = createPieData(location1, ageKeys, powerFn)

    const pieActivity2 = createPieData(location2, activityKeys, powerFn)
    const pieAge2 = createPieData(location2, ageKeys, powerFn)

    const pieActivity3 = createPieData(location3, activityKeys, powerFn)
    const pieAge3 = createPieData(location3, ageKeys, powerFn)

    const color = {
        'Идут': 'white',
        'Велосипед': 'white',
        'Стоят': 'white',
        'Сидят': 'white',
        'Едят/пьют': 'white',
        'Играют': 'white',
        'Спорт': 'white',
        'С коляской': 'white',
        'С собакой': 'white',
        'Смартфон': 'white',
        'Пенсионеры': 'white',
        'Взрослые': 'white',
        'Молодежь': 'white',
        'Дети': 'white',
        'Школьники': 'white',
        'Дошкольники': 'white',
        'Ж': 'white',
        'М': 'white',
    }

    const rootLevel = [
        {
            branch: 'Транзит',
            // color: '#e8c1a0',
            color: '#97e3d5',
            filter: [
                'Идут',
                'Велосипед',
            ],
        },
        {
            branch: 'Используют',
            color: '#61cdbb',
            filter: [
                'Стоят',
                'Сидят',
                'Едят/пьют',
                'Играют',
                'Спорт',

                'С коляской',
                'С собакой',
                // 'Смартфон',
            ],
        },
    ]

    const branchLevel = [
        {
            split: [
                'Пенсионеры',
                'Взрослые',
                'Молодежь',
                'Дети',
                'Школьники',
                'Дошкольники',
            ],
        },
    ]

    const bubbleTree = {
        name: 'Урай',
        color: 'rgb(240, 240, 240)',
        children: [
            createTree(location1, powerFn, rootLevel, branchLevel, color, {
                name: 'Набережная',
                color: '#f47560',
            }),
            createTree(location2, powerFn, rootLevel, branchLevel, color, {
                name: 'Спортсквер',
                color: '#e8a838',
            }),
            createTree(location3, powerFn, rootLevel, branchLevel, color, {
                name: 'Планета звезд',
                color: '#f1e15b',
            }),
        ],
    }

    return (
        <main>
            <style jsx>{`
                main {
                    display: flex;
                    flex-direction: column;

                    align-items: center;

                    padding: 0;
                }

                .wrapper {
                    width: 60%;
                }

                h1 {
                    margin-bottom: 2em;
                    font-size: 3em;
                    line-height: 1.25em;
                }

                h2 {
                    font-size: 2em;
                    margin-top: 2em;
                }

                h3 {
                    margin: 0;
                }

                .two-columns {
                    display: flex;
                }

                @media screen and (max-width: 1280px) {
                    .wrapper {
                        width: 70%;
                    }
                }

                @media screen and (max-width: 900px) {
                    .two-columns {
                        flex-direction: column;
                    }
                }

                @media screen and (max-width: 800px) {
                    .wrapper {
                        width: 90%;
                    }
                }

                @media screen and (max-width: 31.25em) {
                    main {
                        padding: 0 10px;
                    }

                    .wrapper {
                        width: 100%;
                    }

                    h1 {
                        font-size: 2.5em;
                    }
                }
            `}</style>

            <div className={'wrapper'}>
                <Head>
                    <title>
                        ППИ::Урай
                    </title>
                </Head>
                <h1>
                    Предпроектное исследование <br />
                    открытых городских пространств г. Урай. <br />
                    Анализ стационарных активностей
                </h1>

                <Bubble
                    tree={bubbleTree}
                />

                <h2>Набережная</h2>

                Граф активности пользователей территории Набережной в будний день в период времени с 11:30 до 14:30.
                <Chord
                    matrix={matrix1}
                    keys={keys1}
                />

                <div className={'two-columns'}>
                    <div style={{
                        flex: 1,
                    }}>
                        <h3 style={{
                            textAlign: 'center',
                        }}>Сценарии использования территории</h3>
                        <Pie
                            data={pieActivity1}
                        />
                    </div>
                    <div style={{
                        flex: 1,
                    }}>
                        <h3 style={{
                            textAlign: 'center',
                        }}>Группы пользователей</h3>
                        <Pie
                            style={{
                                flex: 1,
                            }}
                            data={pieAge1}
                        />
                    </div>
                </div>

                <h2>Спортсквер</h2>

                Граф активности пользователей территории Спортсквер в будний день в период времени с 11:30 до 14:30.
                <Chord
                    matrix={matrix2}
                    keys={keys2}
                />
                <div className={'two-columns'}>
                    <div style={{
                        flex: 1,
                    }}>
                        <h3 style={{
                            textAlign: 'center',
                        }}>Сценарии использования территории</h3>
                        <Pie
                            data={pieActivity2}
                        />
                    </div>
                    <div style={{
                        flex: 1,
                    }}>
                        <h3 style={{
                            textAlign: 'center',
                        }}>Группы пользователей</h3>
                        <Pie
                            style={{
                                flex: 1,
                            }}
                            data={pieAge2}
                        />
                    </div>
                </div>

                <h2>Планета звезд</h2>

                Граф активности пользователей площади Планета звезд будний день в период времени с 11:30 до 14:30.
                <Chord
                    matrix={matrix3}
                    keys={keys3}
                />
                <div className={'two-columns'}>
                    <div style={{
                        flex: 1,
                    }}>
                        <h3 style={{
                            textAlign: 'center',
                        }}>Сценарии использования территории</h3>
                        <Pie
                            data={pieActivity3}
                        />
                    </div>
                    <div style={{
                        flex: 1,
                    }}>
                        <h3 style={{
                            textAlign: 'center',
                        }}>Группы пользователей</h3>
                        <Pie
                            style={{
                                flex: 1,
                            }}
                            data={pieAge3}
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Page
