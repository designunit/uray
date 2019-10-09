// tslint:disable:no-string-literal
// tslint:disable:max-line-length

import 'nprogress/nprogress.css'

import * as React from 'react'

import { Select, Slider } from 'antd'
import axios from 'axios'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import NProgress from 'nprogress'
import { FullscreenControl } from 'react-map-gl'
import Ratio from 'react-ratio'
import { useRequest } from 'use-request-hook'

import { createPieData, createTree, reduceChartMatrix } from '../src/infographics/app'
import { Bubble } from '../src/infographics/components/Bubble'
import { Chord } from '../src/infographics/components/Chord'
import { Pie } from '../src/infographics/components/Pie'
import { HeatmapBuilder } from '../src/infographics/heatmap'
import { createMatrix } from '../src/infographics/lib'

const Heatmap = dynamic(() => import('../src/infographics/components/Heatmap'), {
    ssr: false,
})
const PhotoMap = dynamic(() => import('../src/infographics/components/PhotoMap'), {
    ssr: false,
})

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN // Set your mapbox token here

const loadDataset = async () => {
    const res = await axios.get('/static/1309-uray.json')

    return res.data
}

const H3Block: React.FC<{ title: string }> = props => (
    <>
        <h3
            style={{
                textAlign: 'center',
            }}
        >
            {props.title}
        </h3>
        {props.children}
    </>
)

const TwoColumns: React.FC<{ one: React.ReactNode, two: React.ReactNode }> = props => (
    <div className={'two-columns'}>
        <style jsx>{`
            .two-columns {
                display: flex;
            }

            @media screen and (max-width: 900px) {
                .two-columns {
                    flex-direction: column;
                }
            }
        `}</style>

        <div
            style={{
                flex: 1,
            }}
        >
            {props.one}
        </div>
        <div
            style={{
                flex: 1,
            }}
        >
            {props.two}
        </div>
    </div>
)

interface IHeatmapWrapperProps {
    style?: React.CSSProperties
    aspectRatio: number
    heatmapBuilder: HeatmapBuilder
    heatmapKeys: Array<{
        key: string,
        title: string,
    }>
    mapStyle: string
    dataUrl: string
    startCoord: {
        latitude: number,
        longitude: number,
    }
    startZoom: number
    startIntensity: number
    startRadius: number
    extra?: object
    radiusRange: [number, number]
    intensityRange: [number, number]
    showFullscreenControl: boolean
    showControls: boolean
}

const HeatmapWrapper: React.FC<IHeatmapWrapperProps> = props => {
    const [heatmapRadius, setHeatmapRadius] = React.useState(props.startRadius)
    const [heatmapIntensity, setHeatmapIntensity] = React.useState(props.startIntensity)
    const [heatmapKey, setHeatmapKey] = React.useState(props.heatmapKeys[0].key)
    const heatmap = props.heatmapBuilder
        .setField(heatmapKey)
        .setRadius(heatmapRadius)
        .setMinZoom(9)
        .setMaxZoom(22)
        .setIntencity(1, heatmapIntensity)
        .build()

    const onChangeHeatmapKey = React.useCallback(
        (value: string) => setHeatmapKey(value),
        [],
    )
    const onChangeHeatmapRadius = React.useCallback(
        (value: number) => setHeatmapRadius(value),
        [],
    )
    const onChangeHeatmapIntensity = React.useCallback(
        (value: number) => setHeatmapIntensity(value),
        [],
    )
    const showHeatmapKeySelector = props.heatmapKeys.length > 1

    return (
        <div style={props.style}>
            <Ratio
                ratio={props.aspectRatio}
                style={{
                    marginBottom: 10,
                }}
            >
                <Heatmap
                    heatmap={heatmap}
                    mapboxToken={MAPBOX_TOKEN}
                    mapStyle={props.mapStyle}
                    dataUrl={props.dataUrl}
                    startCoord={props.startCoord}
                    startZoom={props.startZoom}
                    extra={props.extra}
                >
                    {!props.showFullscreenControl ? null : (
                        <div
                            style={{
                                position: 'absolute',
                                right: 5,
                                top: 5,
                            }}
                        >
                            <FullscreenControl />
                        </div>
                    )}
                </Heatmap>
            </Ratio>

            {!showHeatmapKeySelector ? null : (
                <Select
                    onChange={onChangeHeatmapKey}
                    size={'small'}
                    defaultValue={heatmapKey}
                    style={{
                        width: '100%',
                    }}
                >
                    {props.heatmapKeys.map(({ key, title }) => (
                        <Select.Option key={key} value={key}>
                            {title}
                        </Select.Option>
                    ))}
                </Select>
            )}

            {!props.showControls ? null : (
                <>
                    <Slider
                        min={props.radiusRange[0]}
                        max={props.radiusRange[1]}
                        onChange={onChangeHeatmapRadius}
                        value={heatmapRadius}
                    />

                    <Slider
                        min={props.intensityRange[0]}
                        max={props.intensityRange[1]}
                        onChange={onChangeHeatmapIntensity}
                        value={heatmapIntensity}
                    />
                </>
            )}
        </div>
    )
}

function useDataset() {
    const { isLoading, data } = useRequest(loadDataset, {})

    React.useEffect(() => {
        NProgress.start()
    }, [])
    React.useEffect(() => {
        if (isLoading) {
            NProgress.done()
        }
    }, [isLoading])

    return data
}

const Page: NextPage = () => {
    const data = useDataset()
    const heatmapStyle = 'mapbox://styles/mapbox/dark-v9'

    const showControls = false
    const nivoTheme = null

    const heatmapBuilder = HeatmapBuilder
        .new()
        .setMinZoom(9)
        .setMaxZoom(22)
        .addColor(0, 'rgba(0, 172, 239, 0)') // #00acef
        // .addColor(0, 'rgb(0, 0, 0)')
        .addColor(1 * 0.08333, '#00a0dd')
        .addColor(2 * 0.08333, '#5191cb')
        .addColor(3 * 0.08333, '#857fbc')
        .addColor(4 * 0.08333, '#a96dad')
        .addColor(5 * 0.08333, '#ca4f9b')
        .addColor(6 * 0.08333, '#eb068c')
        .addColor(7 * 0.08333, '#eb5287')
        .addColor(8 * 0.08333, '#f07782')
        .addColor(9 * 0.08333, '#f29378')
        .addColor(10 * 0.08333, '#f7b269')
        .addColor(11 * 0.08333, '#fcd045')
        .addColor(12 * 0.08333, '#fcf107')

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

    const pieColorMap = new Map<string, string>([
        ['Взрослые', '#00acef'],
        ['Молодежь', '#00a0dd'],
        ['Дети', '#5191cb'],
        ['Школьники', '#857fbc'],
        ['Дошкольники', '#a96dad'],
        ['Ж', '#ca4f9b'],
        ['М', '#eb068c'],
        ['Идут', '#eb5287'],
        ['Стоят', '#f07782'],
        ['Сидят', '#f29378'],
        ['Едят/пьют', '#f7b269'],
        ['Играют', '#fcd045'],
        ['Велосипед', '#fcf107'],
        ['Пенсионеры', '#d9e250'],
        ['С коляской', '#add57d'],
        ['С собакой', '#7dc89b'],
        ['Смартфон', '#3bbeb7'],
        ['Спорт', '#00b4d1'],
    ])
    const getColor = ({ id }) => {
        if (pieColorMap.has(id)) {
            return pieColorMap.get(id)
        }

        return 'rgb(0, 0, 0)'
    }

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
                    text-transform: uppercase;
                    font-weight: 800;
                    margin-top: 2em;
                    font-size: 3em;
                    line-height: 1.25em;
                }

                h2 {
                    font-size: 2em;
                    margin-top: 2em;
                }

                h3 {
                    margin: 0;
                    text-align: right;
                }

                h4 {
                    font-weight: 800;
                    font-size: 1.5em;
                    margin-bottom: 2em;
                }

                p {
                    margin-top: 2em;
                }

                @media screen and (max-width: 1280px) {
                    .wrapper {
                        width: 70%;
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
                    <link href='https://fonts.googleapis.com/css?family=Montserrat&display=swap' rel='stylesheet' />
                </Head>
                <h1>
                    Визуализация данных 
                </h1>
                <h4>Предпроектное исследование открытых городских пространств г. Урай. </h4>
                <h2>Анализ стационарных активностей</h2>

                <p>
                    Собранные данные по каждой территории были визуализированы хордовыми диаграммами (графами). Связи в диаграммах показывают разнообразие сценариев использования территорий, представленность и количественные характеристики различных групп пользователей.
                </p>
                <p>
                    Графики были построены на основании данных наблюдений стационарных активностей, собранных в будний день в период с 11.30 до 14.30 на территориях трех общественных пространств г Урай: Набережная реки Конды, Спортсквер, площадь «Планета Звезд».
                </p>
                <a href={"/map"}>
                    ромина карта
                </a>
                <p>
                    В указанный период максимальная общая численность аудитории Набережной составила 83 человек, что, например, в 4 раза больше численности аудитории на площади «Планета звезд».
                </p>

                <Bubble
                    tree={bubbleTree}
                />
                <p>
                Несмотря на отсутствие городских инфраструктур, благоустройства и близости точек притяжения, наибольшее разнообразие сценариев демонстрирует территория «Набережная».
                </p>
                <p>
                Максимальный диапазон наблюдаемых практик включает 10 вариантов: идут, стоят, сидят, играют, с коляской, в смартфоне, с собакой, с велосипедом, занимаются спортом, едят/пьют. При этом из указанных практик три варианта: гуляют с собакой, на велосипеде, занимаются спортом — были уникальными и не встречались в других исследуемых общественных пространствах. Диапазон практик в Спортсквере и площадь Планета Звезд сопоставим и поддерживает 5-6 вариантов: идут, сидят, в смартфоне, едят/пьют, играют, с коляской.
                </p>
                <p>
                Максимальное разнообразие аудиторий из пяти возрастных групп: взрослые, пожилые, молодежь, школьники, дошкольники — было представлено на Набережной. Аудитории Спортсквера и площади «Планета Звезд» состоят из 3 групп пользователей, при этом Спортсквер используется пожилыми и взрослыми с детьми, а площадь «Планеты Звезд» привлекает молодежь и школьников.
                </p>

                <h2>Набережная</h2>

                <i>Граф активности пользователей территории Набережной в будний день в период времени с 11:30 до 14:30.</i>
                <Chord
                    color={getColor}
                    matrix={matrix1}
                    keys={keys1}
                    theme={nivoTheme}
                />

                <TwoColumns
                    one={(
                        <H3Block
                            title={'Сценарии использования территории'}
                        >
                            <Pie
                                color={getColor}
                                data={pieActivity1}
                            />
                        </H3Block>
                    )}
                    two={(
                        <H3Block
                            title={'Группы пользователей'}
                        >
                            <Pie
                                color={getColor}
                                data={pieAge1}
                            />
                        </H3Block>
                    )}
                />

                <p>
                    В ходе анализа активности пользователей (83 человека, 10 практик, 5 аудиторий) на береговой территории реки Конда выявлены следующие тенденции:
                    На данный момент территория выполняет прогулочно-рекреационную функцию: большая часть пользователей «идет». Набережная является дублирующим транзитом главной улицы города вдоль реки.
                    Вместе с этим на набережной зафиксированы практики, не реализованные в других открытых городских пространствах города: жители гуляют с коляской и питомцами, занимаются спортом на открытом воздухе, катаются на велосипеде, а так же останавливаются, чтобы полюбоваться на реку Конда.
                </p>
                <p>
                    На набережной представлено максимальное количество аудиторий, включая и самые требовательные: дети (дошкольники и школьники) и пожилые.
                </p>

                <h2>Спортсквер</h2>

                <i>Граф активности пользователей территории Спортсквер в будний день в период времени с 11:30 до 14:30.</i>
                <Chord
                    color={getColor}
                    matrix={matrix2}
                    keys={keys2}
                    theme={nivoTheme}
                />
                <TwoColumns
                    one={(
                        <H3Block
                            title={'Сценарии использования территории'}
                        >
                            <Pie
                                color={getColor}
                                data={pieActivity2}
                            />
                        </H3Block>
                    )}
                    two={(
                        <H3Block
                            title={'Группы пользователей'}
                        >
                            <Pie
                                color={getColor}
                                data={pieAge2}
                            />
                        </H3Block>
                    )}
                />

                <p>
                В ходе анализа активности пользователей территории Спортсквера (12 человек, 6 практик, 3 аудитории) выявлены следующие тенденции: Категория «едят/пьют» — одна из превалирующих практик в Спортсквере. Наличие инфраструктур, поддерживающих подобные практики, дает возможность пользователям дольше находиться в городской среде — они «сидят», «идут», играют».
                </p>
                <p>
                Спортсквер удовлетворяет запросам и на длительные прогулки: мамы с колясками — одни из пользователей пространства. Порядка половины всей аудитории Спортсквера — дети и пожилые, что говорит о безопасности пространства: на территории есть необходимая инфраструктура.
                </p>

                <h2>Планета звезд</h2>

                <i>Граф активности пользователей площади Планета звезд будний день в период времени с 11:30 до 14:30.</i>
                <Chord
                    color={getColor}
                    matrix={matrix3}
                    keys={keys3}
                    theme={nivoTheme}
                />
                <TwoColumns
                    one={(
                        <H3Block
                            title={'Сценарии использования территории'}
                        >
                            <Pie
                                color={getColor}
                                data={pieActivity3}
                            />
                        </H3Block>
                    )}
                    two={(
                        <H3Block
                            title={'Группы пользователей'}
                        >
                            <Pie
                                color={getColor}
                                data={pieAge3}
                            />
                        </H3Block>
                    )}
                />

                <p>
                В ходе анализа активности пользователей площади «Планета Звезд» (23 человека, 4 практики, 3 аудитории) выявлены следующие тенденции: Площадь «Планета Звезд», в отличие от двух предыдущих открытых городских пространств, является не транзитным, а пространством пребывания: «сидят», «едят/пьют» — преобладающие практики у взрослого населения и молодежи на площади. Так же это пространство популярно у школьников как место времяпрепровождения.
                </p>

                <h2>Теплокарта повседневного сценария использования общественных пространств</h2>

                <h3>Все аудитории</h3>
                <HeatmapWrapper
                    style={{
                        marginBottom: 30,
                    }}
                    aspectRatio={2}
                    heatmapBuilder={heatmapBuilder}
                    mapStyle={heatmapStyle}
                    dataUrl={'/static/PPL_COUNT_DAY1.geojson'}
                    startCoord={{
                        latitude: 60.12693067147423,
                        longitude: 64.79563516086004,
                    }}
                    startRadius={45}
                    startIntensity={6}
                    radiusRange={[20, 100]}
                    intensityRange={[1, 10]}
                    startZoom={13}
                    showFullscreenControl={showControls}
                    showControls={showControls}
                    heatmapKeys={[
                        {
                            key: 'PPL_ALL_12',
                            title: 'с 12:00 до 13:00',
                        },
                        {
                            key: 'PPL_ALL_14',
                            title: 'с 14:00 до 15:00',
                        },
                        {
                            key: 'PPL_ALL_17',
                            title: 'с 17:00 до 18:00',
                        },
                        {
                            key: 'PPL_ALL_19',
                            title: 'с 19:00 до 20:00',
                        },
                    ]}
                    extra={{
                        dragPan: true,
                        dragRotate: false,
                        scrollZoom: true,
                        touchZoom: true,
                        touchRotate: true,
                        keyboard: true,
                        doubleClickZoom: true,
                        minZoom: 12,
                        maxZoom: 15,
                        minPitch: 0,
                        maxPitch: 0,
                    }}
                />
                <h3>Дети и пожилые</h3>
                    <HeatmapWrapper
                        style={{
                            marginBottom: 30,
                        }}
                        aspectRatio={2}
                        heatmapBuilder={heatmapBuilder}
                        mapStyle={heatmapStyle}
                        dataUrl={'/static/PPL_COUNT_DAY1.geojson'}
                        startCoord={{
                            latitude: 60.12693067147423,
                            longitude: 64.79563516086004,
                        }}
                        startRadius={45}
                        startIntensity={6}
                        radiusRange={[20, 100]}
                        intensityRange={[1, 10]}
                        startZoom={13}
                        showFullscreenControl={showControls}
                        showControls={showControls}
                        heatmapKeys={[
                            {
                            key: 'KDS_12',
                            title: 'с 12:00 до 13:00',
                        },
                        {
                            key: 'KDS_14',
                            title: 'с 14:00 до 15:00',
                        },
                        {
                            key: 'KDS_17',
                            title: 'с 17:00 до 18:00',
                        },
                        {
                            key: 'KDS_19',
                            title: 'с 19:00 до 20:00',
                        },
                    ]}
                    extra={{
                        dragPan: true,
                        dragRotate: false,
                        scrollZoom: true,
                        touchZoom: true,
                        touchRotate: true,
                        keyboard: true,
                        doubleClickZoom: true,
                        minZoom: 12,
                        maxZoom: 15,
                        minPitch: 0,
                        maxPitch: 0,
                    }}
                />

                <p>
                    Присутствие детей и пожилых людей говорит о безопасности пространства, поэтому следует обратить особое внимание на то, в каких частях города и в какое время они появляются. В течение дня дети и пожилые чаще других используют природные территории: лесопарк «Звезды Югры», набережная «Спектр». В вечернее время — преимущественно территории внутри микрорайонов: Спортсквер, площадь «Планета Звезд», парк «Солнышко». Благоустройство открытых городских пространств должно способствовать увеличению длительности пребывания детей и пожилых людей в различное время суток.
                </p>
                <p>
                    На тепловых картах видна динамика интенсивности использования открытых городских пространств города Урай различными группами жителей в период с 12 до 20 часов. Спортсвкер, площадь «Планета Звезд», набережная реки Конды, Мемориал Памяти — наиболее популярные пространства, причем Спортсквер активно используется в течение всего дня, а площадь «Планета Звезд» преимущественно в дневное и вечернее время.
                </p>

                <h3>Пребывание</h3>
                <HeatmapWrapper
                    style={{
                        marginBottom: 30,
                    }}
                    aspectRatio={2}
                    heatmapBuilder={heatmapBuilder}
                    mapStyle={heatmapStyle}
                    dataUrl={'/static/PPL_COUNT_DAY1.geojson'}
                    startCoord={{
                        latitude: 60.12693067147423,
                        longitude: 64.79563516086004,
                    }}
                    startRadius={45}
                    startIntensity={6}
                    radiusRange={[20, 100]}
                    intensityRange={[1, 10]}
                    startZoom={13}
                    showFullscreenControl={showControls}
                    showControls={showControls}
                    heatmapKeys={[
                        {
                            key: 'PPL_STA_12',
                            title: 'с 12:00 до 13:00',
                        },
                        {
                            key: 'PPL_STA_14',
                            title: 'с 14:00 до 15:00',
                        },
                        {
                            key: 'PPL_STA_17',
                            title: 'с 17:00 до 18:00',
                        },
                        {
                            key: 'PPL_STA_19',
                            title: 'с 19:00 до 20:00',
                        },
                    ]}
                    extra={{
                        dragPan: true,
                        dragRotate: false,
                        scrollZoom: true,
                        touchZoom: true,
                        touchRotate: true,
                        keyboard: true,
                        doubleClickZoom: true,
                        minZoom: 12,
                        maxZoom: 15,
                        minPitch: 0,
                        maxPitch: 0,
                    }}
                />
                <p>
                Парк «Солнышко», Спортсквер, площадь «Планета Звезд», сквер Романтиков, Набережная реки Конда — самые посещаемые пространства города в повседневном сценарии. Эти пространства имеют устойчивые практики времяпрепровождения, для поддержания которых необходимы комфортные условия и современная инфраструктура.
                </p>

                <h3>Транзит</h3>
                <HeatmapWrapper
                    style={{
                        marginBottom: 30,
                    }}
                    aspectRatio={2}
                    heatmapBuilder={heatmapBuilder}
                    mapStyle={heatmapStyle}
                    dataUrl={'/static/PPL_COUNT_DAY1.geojson'}
                    startCoord={{
                        latitude: 60.12693067147423,
                        longitude: 64.79563516086004,
                    }}
                    startRadius={45}
                    startIntensity={6}
                    radiusRange={[20, 100]}
                    intensityRange={[1, 10]}
                    startZoom={13}
                    showFullscreenControl={showControls}
                    showControls={showControls}
                    heatmapKeys={[
                        {
                            key: 'PPL_WAY_12',
                            title: 'с 12:00 до 13:00',
                        },
                        {
                            key: 'PPL_WAY_14',
                            title: 'с 14:00 до 15:00',
                        },
                        {
                            key: 'PPL_WAY_17',
                            title: 'с 17:00 до 18:00',
                        },
                        {
                            key: 'PPL_WAY_19',
                            title: 'с 19:00 до 20:00',
                        },
                    ]}
                    extra={{
                        dragPan: true,
                        dragRotate: false,
                        scrollZoom: true,
                        touchZoom: true,
                        touchRotate: true,
                        keyboard: true,
                        doubleClickZoom: true,
                        minZoom: 12,
                        maxZoom: 15,
                        minPitch: 0,
                        maxPitch: 0,
                    }}
                />

                <p>
                    Ежедневно через открытые городские пространства: Спортсквер, площадь «Планета Звезд», аллею Мира проходит наибольшее число горожан.
                </p>

                <h3>Частота пребывания разных возрастных групп в общественных пространствах</h3>
                <HeatmapWrapper
                    style={{
                        marginBottom: 30,
                    }}
                    aspectRatio={2}
                    heatmapBuilder={heatmapBuilder}
                    mapStyle={heatmapStyle}
                    dataUrl={'/static/PPL_FREQ.geojson'}
                    startRadius={50}
                    startIntensity={10}
                    startCoord={{
                        latitude: 60.12693067147423,
                        longitude: 64.79563516086004,
                    }}
                    radiusRange={[20, 100]}
                    intensityRange={[1, 10]}
                    startZoom={13}
                    showFullscreenControl={showControls}
                    showControls={showControls}
                    heatmapKeys={[
                        {
                            key: 'young',
                            title: 'Молодежь',
                        },
                        {
                            key: 'mid',
                            title: 'Взрослые',
                        },
                        {
                            key: 'old',
                            title: 'Пожилые',
                        },
                    ]}
                    extra={{
                        dragPan: true,
                        dragRotate: false,
                        scrollZoom: true,
                        touchZoom: true,
                        touchRotate: true,
                        keyboard: true,
                        doubleClickZoom: true,
                        minZoom: 10,
                        maxZoom: 15,
                        minPitch: 0,
                        maxPitch: 0,
                    }}
                />

                <p>
                    По данным социологического опроса в повседневных сценариях большинство общественных пространств города используется различными возрастными группами. Исключениями стали площадь Первооткрывателей, о которой не упомянул ни один человек старшего возраста, и бульвар Содружества, который остался без внимания представителей молодежи.
                </p>
                <Ratio
                    ratio={2}
                    style={{
                        marginBottom: 10,
                    }}
                >
                    <h2>Фотофиксация и выявление точек интереса</h2>
                    <PhotoMap
                        mapboxToken={MAPBOX_TOKEN}
                        mapStyle={'mapbox://styles/mapbox/dark-v9'}
                        dataUrl={'https://dir.ams3.digitaloceanspaces.com/uray/dataset.geojson'}
                        size={50}
                        startZoom={13}
                        startCoord={{
                            latitude: 60.12380893107247,
                            longitude: 64.79488837184576,
                        }}
                        extra={{
                            dragPan: true,
                            dragRotate: false,
                            scrollZoom: true,
                            touchZoom: true,
                            touchRotate: true,
                            keyboard: true,
                            doubleClickZoom: true,
                            minZoom: 9,
                            maxZoom: 22,
                            minPitch: 0,
                            maxPitch: 0,
                        }}
                    />
                </Ratio>
                <br />
                <br />

                <h2>Тепловая карта точек интереса</h2>
                <HeatmapWrapper
                    style={{
                        marginBottom: 30,
                    }}
                    aspectRatio={2}
                    heatmapBuilder={heatmapBuilder}
                    mapStyle={heatmapStyle}
                    dataUrl={'https://dir.ams3.digitaloceanspaces.com/uray/dataset.geojson'}
                    startRadius={30}
                    startIntensity={7}
                    startCoord={{
                        latitude: 60.12693067147423,
                        longitude: 64.79563516086004,
                    }}
                    radiusRange={[20, 100]}
                    intensityRange={[1, 20]}
                    startZoom={13}
                    showFullscreenControl={showControls}
                    showControls={showControls}
                    heatmapKeys={[
                        {
                            key: 'value',
                            title: 'value',
                        },
                    ]}
                    extra={{
                        dragPan: true,
                        dragRotate: false,
                        scrollZoom: true,
                        touchZoom: true,
                        touchRotate: true,
                        keyboard: true,
                        doubleClickZoom: true,
                        minZoom: 10,
                        maxZoom: 15,
                        minPitch: 0,
                        maxPitch: 0,
                    }}
                />
            </div>
        </main>
    )
}

export default Page
