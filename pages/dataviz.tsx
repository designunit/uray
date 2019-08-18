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

    const users_lux = 'users_lux'
    const users_mass = 'users_mass'
    const users_nomad = 'users_nomad'
    const users_group = 'users_group'
    const topic_eco = 'topic_eco'
    const topic_gulag = 'topic_gulag'
    const topic_oym = 'topic_oym'
    const season_w = 'season_w'
    const season_s = 'season_s'
    const season_m = 'season_m'
    const infra_zeppelin = 'infra_zeppelin'
    const infra_volgobus = 'infra_volgobus'
    const infra_drone = 'infra_drone'
    const infra_cargo_drone = 'infra_cargo_drone'
    const infra_cert = 'infra_cert'
    const infra_plane = 'infra_plane'
    const infra_unit = 'infra_unit'
    const infra_suit = 'infra_suit'
    const infra_shelter = 'infra_shelter'
    const infra_camp = 'infra_camp'
    const infra_hom = 'infra_hom'
    const infra_guest = 'infra_guest'
    const infra_infobox = 'infra_infobox'
    const infra_office = 'infra_office'
    const infra_roads = 'infra_roads'
    const infra_kayak = 'infra_kayak'
    const infra_horse = 'infra_horse'
    const infra_dog = 'infra_dog'
    const infra_bukhanka = 'infra_bukhanka'
    const place_oymyakon = 'place_oymyakon'
    const place_zirianka = 'place_zirianka'
    const place_hotkey = 'place_hotkey'
    const place_handiga = 'place_handiga'
    const place_shelter = 'place_shelter'
    const place_suit = 'place_suit'
    const place_magadan = 'place_magadan'
    const place_ustnera = 'place_ustnera'
    const place_tomtor = 'place_tomtor'
    const place_yuchugey = 'place_yuchugey'
    const place_topolynoe = 'place_topolynoe'
    const place_kadikchan = 'place_kadikchan'
    const place_yurti_meteo = 'place_yurti_meteo'
    const place_kuranahsala = 'place_kuranahsala'
    const place_labinkir = 'place_labinkir'
    const place_nelkan = 'place_nelkan'
    const place_academic_hotkey = 'place_academic_hotkey'
    const place_alisardakh_lake = 'place_alisardakh_lake'
    const place_jacklondon_lake = 'place_jacklondon_lake'
    const place_drajni = 'place_drajni'
    const place_karamken = 'place_karamken'
    const place_oym_kisiliahi = 'place_oym_kisiliahi'
    const place_olchansky_pereval = 'place_olchansky_pereval'
    const place_ortobalagan = 'place_ortobalagan'
    const place_itik_kuel = 'place_itik_kuel'
    const place_juchugei = 'place_juchugei'
    const way_moto = 'way_moto'

    const links = collect([
       
        // [1, [users_lux, season_w, topic_gulag, infra_guest, place_oymyakon]],
        // [1, [users_lux, season_s, topic_gulag, infra_guest, place_nelkan]],
        // [1, [users_lux, season_s, topic_gulag, infra_guest, place_magadan]],
        // [1, [users_group, season_s, topic_gulag, infra_guest, place_kadikchan]],
        // [1, [users_group, season_s, topic_gulag, infra_bukhanka, place_topolynoe]],
        // [1, [users_group, season_s, topic_gulag, infra_guest, place_topolynoe]],
        // [1, [users_group, season_w, topic_gulag, infra_bukhanka, place_topolynoe]],
        // [1, [users_group, season_w, topic_gulag, infra_guest, place_topolynoe]],
       
        // [1, [users_group, season_s, topic_eco, infra_horse, place_topolynoe]],

        // ==============================

        [1, [users_group, season_w, topic_gulag, infra_bukhanka, place_topolynoe]],
        [1, [users_group, season_s, topic_gulag, infra_bukhanka, place_topolynoe]],
        [1, [users_group, season_w, topic_gulag, infra_guest, place_topolynoe]],
        [1, [users_group, season_s, topic_gulag, infra_guest, place_topolynoe]],
        
        [1, [users_group, season_s, topic_gulag, infra_bukhanka, place_hotkey]],
        [1, [users_group, season_m, topic_gulag, infra_bukhanka, place_hotkey]],
        [1, [users_group, season_w, topic_gulag, infra_bukhanka, place_hotkey]],
        
        [1, [users_nomad, season_s, topic_gulag, infra_bukhanka, place_kuranahsala]],
        [1, [users_nomad, season_w, topic_gulag, infra_bukhanka, place_kuranahsala]],
        [1, [users_nomad, season_m, topic_gulag, infra_bukhanka, place_kuranahsala]],
    
        [1, [users_mass, season_w, topic_oym, infra_guest, place_tomtor]],
        [1, [users_group, season_w, topic_oym, infra_guest, place_tomtor]],
        [1, [users_group, season_m, topic_oym, infra_guest, place_tomtor]],
        [1, [users_group, season_s, topic_oym, infra_guest, place_tomtor]],
        [1, [users_group, season_s, topic_oym, infra_bukhanka, place_tomtor]],

        [1, [users_group, season_s, topic_gulag, infra_guest, place_ustnera]],
        [1, [users_group, season_w, topic_gulag, infra_guest, place_ustnera]],

        [1, [users_group, season_w, topic_gulag, infra_guest, place_handiga]],
        [1, [users_group, season_s, topic_gulag, infra_guest, place_handiga]],
        [1, [users_group, season_m, topic_gulag, infra_guest, place_handiga]],
        [1, [users_mass, season_w, topic_gulag, infra_guest, place_handiga]],

        [1, [users_group, season_w, topic_oym, infra_guest, place_oymyakon]],
        
        [1, [users_group, season_s, topic_eco, infra_guest, place_yurti_meteo]],
        [1, [users_nomad, season_s, topic_eco, infra_guest, place_yurti_meteo]],
        [1, [users_group, season_w, topic_eco, infra_guest, place_yurti_meteo]],
        [1, [users_nomad, season_w, topic_eco, infra_guest, place_yurti_meteo]],
        [1, [users_group, season_w, topic_oym, infra_guest, place_yurti_meteo]],
        
        [1, [users_group, season_w, topic_eco, infra_guest, place_labinkir]],
        [1, [users_group, season_s, topic_eco, infra_guest, place_labinkir]],
        [1, [users_group, season_m, topic_eco, infra_guest, place_labinkir]],
        [1, [users_group, season_w, topic_oym, infra_guest, place_labinkir]],
        
        [1, [users_group, season_w, topic_eco, infra_guest, place_alisardakh_lake]],
        [1, [users_group, season_s, topic_eco, infra_guest, place_alisardakh_lake]],
        [1, [users_group, season_m, topic_eco, infra_guest, place_alisardakh_lake]],
        [1, [users_nomad, season_w, topic_eco, infra_guest, place_alisardakh_lake]],
        [1, [users_nomad, season_s, topic_eco, infra_guest, place_alisardakh_lake]],
        [1, [users_nomad, season_m, topic_eco, infra_guest, place_alisardakh_lake]],

        [1, [users_group, season_s, topic_eco, infra_guest, place_jacklondon_lake]],
        [1, [users_lux, season_s, topic_eco, infra_guest, place_jacklondon_lake]],
        [1, [users_lux, season_w, topic_eco, infra_guest, place_jacklondon_lake]],
        [1, [users_lux, season_m, topic_eco, infra_guest, place_jacklondon_lake]],
        [1, [users_lux, season_m, topic_eco, infra_bukhanka, place_jacklondon_lake]],
        
        [1, [users_nomad, season_s, topic_gulag, infra_bukhanka, place_drajni]],
        [1, [users_nomad, season_w, topic_gulag, infra_bukhanka, place_drajni]],
        [1, [users_lux, season_w, topic_gulag, infra_bukhanka, place_drajni]],
        
        [1, [users_nomad, season_s, topic_gulag, infra_bukhanka, place_zirianka]],
        [1, [users_nomad, season_w, topic_gulag, infra_bukhanka, place_zirianka]],
        [1, [users_nomad, season_m, topic_gulag, infra_bukhanka, place_zirianka]],

        [1, [users_nomad, season_w, topic_gulag, infra_bukhanka, place_kadikchan]],
        [1, [users_nomad, season_s, topic_gulag, infra_bukhanka, place_kadikchan]],
        [1, [users_nomad, season_m, topic_gulag, infra_bukhanka, place_kadikchan]],
        
        [1, [users_nomad, season_w, topic_gulag, infra_bukhanka, place_kadikchan]],
        [1, [users_nomad, season_s, topic_gulag, infra_bukhanka, place_kadikchan]],
        [1, [users_nomad, season_m, topic_gulag, infra_bukhanka, place_karamken]],
        
        [1, [users_group, season_s, topic_eco, infra_bukhanka, place_oym_kisiliahi]],

        [1, [users_group, season_w, topic_gulag, infra_bukhanka, place_olchansky_pereval]],
        [1, [users_group, season_s, topic_gulag, infra_bukhanka, place_olchansky_pereval]],
        [1, [users_group, season_m, topic_gulag, infra_bukhanka, place_olchansky_pereval]],

        [1, [users_group, season_s, topic_eco, infra_bukhanka, place_ortobalagan]],
        [1, [users_group, season_w, topic_eco, infra_bukhanka, place_ortobalagan]],
        [1, [users_group, season_m, topic_eco, infra_bukhanka, place_ortobalagan]],
        [1, [users_nomad, season_s, topic_eco, infra_bukhanka, place_ortobalagan]],
        [1, [users_nomad, season_w, topic_eco, infra_bukhanka, place_ortobalagan]],
        [1, [users_nomad, season_m, topic_eco, infra_bukhanka, place_ortobalagan]],

        [1, [users_nomad, season_m, topic_gulag, infra_bukhanka, place_itik_kuel]],
        [1, [users_nomad, season_w, topic_gulag, infra_bukhanka, place_itik_kuel]],
        [1, [users_nomad, season_s, topic_gulag, infra_bukhanka, place_itik_kuel]],
       
        [1, [users_group, season_s, topic_oym, infra_bukhanka, place_juchugei]],
        [1, [users_group, season_w, topic_oym, infra_bukhanka, place_juchugei]],
        [1, [users_lux, season_s, topic_oym, infra_bukhanka, place_juchugei]],
        [1, [users_lux, season_w, topic_oym, infra_bukhanka, place_juchugei]],
        [1, [users_lux, season_m, topic_oym, infra_bukhanka, place_juchugei]],
        [1, [users_nomad, season_s, topic_oym, infra_bukhanka, place_juchugei]],
        [1, [users_nomad, season_w, topic_oym, infra_bukhanka, place_juchugei]],
        
        [1, [users_nomad, season_w, topic_oym, way_moto, infra_bukhanka, place_juchugei]],
    ])

    console.log(links)

    const data = {
        "nodes": [
            {
                "id": users_lux,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": users_mass,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": users_nomad,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": users_group,
                "color": "rgb(0, 0, 0)"
            },

            {
                "id": topic_eco,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": topic_gulag,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": topic_oym,
                "color": "rgb(0, 0, 0)"
            },

            {
                "id": season_w,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": season_s,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": season_m,
                "color": "rgb(0, 0, 0)"
            },

            {
                "id": infra_zeppelin,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": infra_volgobus,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": infra_drone,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": infra_cargo_drone,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": infra_cert,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": infra_plane,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": infra_unit,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": infra_suit,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": infra_shelter,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": infra_camp,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": infra_hom,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": infra_guest,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": infra_infobox,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": infra_office,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": infra_bukhanka,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": infra_roads,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": infra_kayak,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": infra_horse,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": infra_dog,
                "color": "rgb(0, 0, 0)"
            },

            {
                "id": place_oymyakon,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": place_hotkey,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": place_shelter,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": place_suit,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": place_magadan,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": place_tomtor,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": place_kuranahsala,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": place_drajni,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": place_yuchugey,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": place_jacklondon_lake,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": place_zirianka,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": place_topolynoe,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": place_kadikchan,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": place_labinkir,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": place_nelkan,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": place_yurti_meteo,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": place_ustnera,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": place_handiga,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": place_alisardakh_lake,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": place_karamken,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": place_oym_kisiliahi,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": place_academic_hotkey,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": place_olchansky_pereval,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": place_ortobalagan,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": place_itik_kuel,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": place_juchugei,
                "color": "rgb(0, 0, 0)"
            },
            {
                "id": way_moto,
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