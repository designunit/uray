import * as React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { collect } from '../src/app/dataviz'
import { Sankey } from '../src/components/Sankey'
import {
    users_lux,
    users_mass,
    users_nomad,
    users_group,
    topic_eco,
    topic_gulag,
    topic_oym,
    season_w,
    season_s,
    season_m,
    infra_zeppelin,
    infra_volgobus,
    infra_drone,
    infra_cargo_drone,
    infra_cert,
    infra_plane,
    infra_unit,
    infra_suit,
    infra_shelter,
    infra_camp,
    infra_hom,
    infra_guest,
    infra_infobox,
    infra_office,
    infra_roads,
    infra_kayak,
    infra_horse,
    infra_dog,
    infra_bukhanka,
    place_oymyakon,
    place_zirianka,
    place_hotkey,
    place_handiga,
    place_shelter,
    place_suit,
    place_magadan,
    place_ustnera,
    place_tomtor,
    place_yuchugey,
    place_topolynoe,
    place_kadikchan,
    place_yurti_meteo,
    place_kuranahsala,
    place_labinkir,
    place_nelkan,
    place_academic_hotkey,
    place_alisardakh_lake,
    place_jacklondon_lake,
    place_drajni,
    place_karamken,
    place_oym_kisiliahi,
    place_olchansky_pereval,
    place_ortobalagan,
    place_itik_kuel,
    place_juchugei,
    way_moto,
    sankeyNodes,
} from '../src/app'

interface IPageProps {
}

const Page: NextPage<IPageProps> = (props) => {
    const data = {
        nodes: sankeyNodes,
        links: collect([
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
    }

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

            <Sankey
                data={data}
            />
        </div>
    )
}

export default Page