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
    way_moto_1,
    sankeyNodes,
    way_cargodrone_3,
    way_car_1,
    way_plane_1,
    infra_hotel,
    way_boat_1,
    way_horse_1,
    infra_palatka,
    way_zeppelin_2,
    way_volgabus_2,
    infra_scc,
    infra_timpton,
} from '../src/app'

interface IPageProps {
}

const Page: NextPage<IPageProps> = (props) => {
    const data = {
        nodes: sankeyNodes,
        links: collect([
            [1.5, [users_group, season_w, topic_gulag, way_car_1, infra_suit, place_topolynoe]],
            [1.5, [users_group, season_s, topic_gulag, way_car_1, infra_suit, place_topolynoe]],
            [1.5, [users_group, season_w, topic_gulag, way_zeppelin_2, infra_suit, place_topolynoe]],
            [1.5, [users_group, season_s, topic_gulag, way_zeppelin_2, infra_suit, place_topolynoe]],
            [1.5, [users_group, season_m, topic_gulag, way_zeppelin_2, infra_suit, place_topolynoe]],

            [1.5, [users_group, season_s, topic_gulag, way_car_1, infra_guest, place_hotkey]],
            [1.5, [users_group, season_m, topic_gulag, way_car_1, infra_guest, place_hotkey]],
            [1.5, [users_group, season_w, topic_gulag, way_car_1, infra_guest, place_hotkey]],
            [1.5, [users_group, season_s, topic_gulag, way_zeppelin_2, infra_hom, place_hotkey]],
            [1.5, [users_group, season_m, topic_gulag, way_zeppelin_2, infra_hom, place_hotkey]],
            [1.5, [users_group, season_w, topic_gulag, way_zeppelin_2, infra_hom, place_hotkey]],
            [1.5, [users_group, season_s, topic_gulag, way_plane_1, infra_hom, place_hotkey]],
            [1.5, [users_group, season_s, topic_gulag, way_plane_1, infra_hom, place_hotkey]],
            [1.5, [users_group, season_m, topic_gulag, way_plane_1, infra_hom, place_hotkey]],
            [1.5, [users_group, season_m, topic_gulag, way_plane_1, infra_guest, place_hotkey]],
            [1.5, [users_group, season_w, topic_gulag, way_plane_1, infra_guest, place_hotkey]],
            [1.5, [users_group, season_w, topic_gulag, way_plane_1, infra_guest, place_hotkey]],

            [0.6, [users_nomad, season_s, topic_gulag, way_car_1, place_kuranahsala]],
            [0.6, [users_nomad, season_w, topic_gulag, way_car_1, place_kuranahsala]],
            [0.6, [users_nomad, season_m, topic_gulag, way_car_1, place_kuranahsala]],

            [15, [users_mass, season_w, topic_oym, way_plane_1, infra_hotel, place_tomtor]],
            [1.5, [users_group, season_w, topic_oym, way_plane_1, infra_hotel, place_tomtor]],
            [1.5, [users_group, season_m, topic_oym, way_plane_1, infra_hotel, place_tomtor]],
            [1.5, [users_group, season_s, topic_oym, way_plane_1, infra_hotel, place_tomtor]],
            [1.5, [users_group, season_s, topic_oym, way_plane_1, infra_hotel, place_tomtor]],
            [15, [users_mass, season_w, topic_oym, way_plane_1, infra_hom, place_tomtor]],
            [1.5, [users_group, season_w, topic_oym, way_plane_1, infra_hom, place_tomtor]],
            [1.5, [users_group, season_m, topic_oym, way_plane_1, infra_hom, place_tomtor]],
            [1.5, [users_group, season_s, topic_oym, way_plane_1, infra_hom, place_tomtor]],
            [1.5, [users_group, season_s, topic_oym, way_plane_1, infra_hom, place_tomtor]],
            [15, [users_mass, season_w, topic_oym, way_volgabus_2, infra_hotel, place_tomtor]],
            [1.5, [users_group, season_w, topic_oym, way_volgabus_2, infra_hotel, place_tomtor]],
            [1.5, [users_group, season_m, topic_oym, way_volgabus_2, infra_hotel, place_tomtor]],
            [1.5, [users_group, season_s, topic_oym, way_volgabus_2, infra_hotel, place_tomtor]],
            [1.5, [users_group, season_s, topic_oym, way_volgabus_2, infra_hotel, place_tomtor]],
            [15, [users_mass, season_w, topic_oym, way_volgabus_2, infra_hom, place_tomtor]],
            [1.5, [users_group, season_w, topic_oym, way_volgabus_2, infra_hom, place_tomtor]],
            [1.5, [users_group, season_m, topic_oym, way_volgabus_2, infra_hom, place_tomtor]],
            [1.5, [users_group, season_s, topic_oym, way_volgabus_2, infra_hom, place_tomtor]],
            [1.5, [users_group, season_s, topic_oym, way_volgabus_2, infra_hom, place_tomtor]],

            [1.5, [users_group, season_s, topic_gulag, way_car_1, infra_guest, place_ustnera]],
            [1.5, [users_group, season_w, topic_gulag, way_car_1, infra_guest, place_ustnera]],
            [1.5, [users_group, season_s, topic_gulag, way_car_1, infra_hom, place_ustnera]],
            [1.5, [users_group, season_w, topic_gulag, way_car_1, infra_hom, place_ustnera]],

            [1.5, [users_group, season_w, topic_gulag, way_car_1, infra_hotel, place_handiga]],
            [1.5, [users_group, season_s, topic_gulag, way_car_1, infra_hotel, place_handiga]],
            [1.5, [users_group, season_m, topic_gulag, way_car_1, infra_hotel, place_handiga]],
            [15, [users_mass, season_w, topic_gulag, way_car_1, infra_hotel, place_handiga]],

            [1.5, [users_group, season_w, topic_oym, way_car_1, infra_hom, place_oymyakon]],
            [1, [users_nomad, season_w, topic_oym, way_car_1, infra_hom, place_oymyakon]],
            [1, [users_mass, season_w, topic_oym, way_car_1, infra_scc, place_oymyakon]],
            [1, [users_mass, season_s, topic_oym, way_car_1, infra_scc, place_oymyakon]],
            [1.5, [users_group, season_w, topic_oym, way_zeppelin_2, infra_hom, place_oymyakon]],
            [1, [users_mass, season_w, topic_oym, way_zeppelin_2, infra_scc, place_oymyakon]],
            [1, [users_mass, season_w, topic_oym, way_volgabus_2, infra_scc, place_oymyakon]],
            [1, [users_mass, season_s, topic_oym, way_zeppelin_2, infra_scc, place_oymyakon]],
            [1, [users_mass, season_s, topic_oym, way_volgabus_2, infra_scc, place_oymyakon]],
            [1.5, [users_group, season_w, topic_oym, way_car_1, infra_unit, place_oymyakon]],
            [1, [users_nomad, season_w, topic_oym, way_car_1, infra_unit, place_oymyakon]],
            [1.5, [users_group, season_w, topic_oym, way_zeppelin_2, infra_unit, place_oymyakon]],
            [1.5, [users_group, season_s, topic_oym, way_car_1, infra_hom, place_oymyakon]],
            [1, [users_nomad, season_s, topic_oym, way_car_1, infra_hom, place_oymyakon]],
            [1.5, [users_group, season_s, topic_oym, way_zeppelin_2, infra_hom, place_oymyakon]],
            [1.5, [users_group, season_s, topic_oym, way_car_1, infra_unit, place_oymyakon]],
            [1, [users_nomad, season_s, topic_oym, way_car_1, infra_unit, place_oymyakon]],
            [1.5, [users_group, season_s, topic_oym, way_zeppelin_2, infra_unit, place_oymyakon]],
            [1.5, [users_group, season_w, topic_oym, way_volgabus_2, infra_hom, place_oymyakon]],
            [1, [users_nomad, season_w, topic_oym, way_volgabus_2, infra_hom, place_oymyakon]],
            [1.5, [users_group, season_w, topic_oym, way_volgabus_2, infra_unit, place_oymyakon]],
            [1.5, [users_group, season_w, topic_oym, way_volgabus_2, infra_unit, place_oymyakon]],
            [1.5, [users_group, season_s, topic_oym, way_volgabus_2, infra_hom, place_oymyakon]],
            [1, [users_nomad, season_s, topic_oym, way_volgabus_2, infra_hom, place_oymyakon]],
            [1.5, [users_group, season_s, topic_oym, way_volgabus_2, infra_unit, place_oymyakon]],
            [1, [users_nomad, season_s, topic_oym, way_volgabus_2, infra_unit, place_oymyakon]],
            [1, [users_group, season_s, topic_oym, way_car_1, infra_timpton, place_oymyakon]],
            [1, [users_group, season_s, topic_oym, way_zeppelin_2, infra_timpton, place_oymyakon]],
            [1, [users_group, season_s, topic_oym, way_volgabus_2, infra_timpton, place_oymyakon]],
            [1, [users_group, season_w, topic_oym, way_car_1, infra_timpton, place_oymyakon]],
            [1, [users_group, season_w, topic_oym, way_zeppelin_2, infra_timpton, place_oymyakon]],
            [1, [users_group, season_w, topic_oym, way_volgabus_2, infra_timpton, place_oymyakon]],

            [1.5, [users_group, season_s, topic_eco, way_boat_1, place_yurti_meteo]],
            [0.6, [users_nomad, season_s, topic_eco, way_boat_1, place_yurti_meteo]],
            [1.5, [users_group, season_w, topic_eco, way_car_1, place_yurti_meteo]],
            [0.6, [users_nomad, season_w, topic_eco, way_car_1, place_yurti_meteo]],
            [1.5, [users_group, season_w, topic_oym, way_car_1, place_yurti_meteo]],

            [1.5, [users_group, season_w, topic_eco, way_horse_1, infra_guest, place_labinkir]],
            [1.5, [users_group, season_s, topic_eco, way_horse_1, infra_guest, place_labinkir]],
            [1.5, [users_group, season_m, topic_eco, way_horse_1, infra_guest, place_labinkir]],
            [1.5, [users_group, season_w, topic_oym, way_horse_1, infra_guest, place_labinkir]],
            [1.5, [users_group, season_w, topic_eco, way_horse_1, infra_camp, place_labinkir]],
            [1.5, [users_group, season_s, topic_eco, way_horse_1, infra_camp, place_labinkir]],
            [1.5, [users_group, season_m, topic_eco, way_horse_1, infra_camp, place_labinkir]],
            [1.5, [users_group, season_w, topic_oym, way_horse_1, infra_camp, place_labinkir]],

            [1.5, [users_group, season_w, topic_eco, way_horse_1, place_alisardakh_lake]],
            [1.5, [users_group, season_s, topic_eco, way_horse_1, place_alisardakh_lake]],
            [1.5, [users_group, season_m, topic_eco, way_horse_1, place_alisardakh_lake]],
            [0.6, [users_nomad, season_w, topic_eco, way_horse_1, place_alisardakh_lake]],
            [0.6, [users_nomad, season_s, topic_eco, way_horse_1, place_alisardakh_lake]],
            [0.6, [users_nomad, season_m, topic_eco, way_horse_1, place_alisardakh_lake]],

            [3, [users_lux, season_s, topic_eco, way_plane_1, place_jacklondon_lake]],
            [3, [users_lux, season_w, topic_eco, way_plane_1, place_jacklondon_lake]],
            [3, [users_lux, season_m, topic_eco, way_plane_1, place_jacklondon_lake]],
            [3, [users_lux, season_m, topic_eco, way_car_1, place_jacklondon_lake]],

            [0.6, [users_nomad, season_s, topic_gulag, way_car_1, place_drajni]],
            [0.6, [users_nomad, season_w, topic_gulag, way_car_1, place_drajni]],
            [3, [users_lux, season_w, topic_gulag, way_car_1, place_drajni]],

            [0.6, [users_nomad, season_s, topic_gulag, way_car_1, place_zirianka]],
            [0.6, [users_nomad, season_w, topic_gulag, way_car_1, place_zirianka]],
            [0.6, [users_nomad, season_m, topic_gulag, way_car_1, place_zirianka]],

            [0.6, [users_nomad, season_w, topic_gulag, way_car_1, infra_hom, place_kadikchan]],
            [0.6, [users_nomad, season_s, topic_gulag, way_car_1, infra_hom, place_kadikchan]],
            [0.6, [users_nomad, season_m, topic_gulag, way_car_1, infra_hom, place_kadikchan]],
            [1.5, [users_group, season_w, topic_gulag, way_car_1, infra_hom, place_kadikchan]],
            [1.5, [users_group, season_s, topic_gulag, way_car_1, infra_hom, place_kadikchan]],
            [1.5, [users_group, season_m, topic_gulag, way_car_1, infra_hom, place_kadikchan]],
            [1.5, [users_group, season_w, topic_gulag, way_zeppelin_2, infra_hom, place_kadikchan]],
            [1.5, [users_group, season_s, topic_gulag, way_zeppelin_2, infra_hom, place_kadikchan]],
            [1.5, [users_group, season_m, topic_gulag, way_zeppelin_2, infra_hom, place_kadikchan]],

            [0.6, [users_nomad, season_w, topic_gulag, way_car_1, place_karamken]],
            [0.6, [users_nomad, season_s, topic_gulag, way_car_1, place_karamken]],
            [0.6, [users_nomad, season_m, topic_gulag, way_car_1, place_karamken]],
            [0.6, [users_nomad, season_w, topic_gulag, way_moto_1, place_karamken]],
            [0.6, [users_nomad, season_s, topic_gulag, way_moto_1, place_karamken]],
            [0.6, [users_nomad, season_m, topic_gulag, way_moto_1, place_karamken]],

            [1.5, [users_group, season_s, topic_eco, way_car_1, infra_camp, place_oym_kisiliahi]],
            [0.6, [users_nomad, season_s, topic_eco, way_moto_1, infra_camp, place_oym_kisiliahi]],

            [1.5, [users_group, season_w, topic_gulag, way_car_1, infra_camp, place_olchansky_pereval]],
            [1.5, [users_group, season_w, topic_gulag, way_car_1, infra_camp, place_olchansky_pereval]],
            [1.5, [users_group, season_s, topic_gulag, way_car_1, infra_camp, place_olchansky_pereval]],
            [1, [users_nomad, season_s, topic_gulag, way_car_1, infra_camp, place_olchansky_pereval]],
            [1, [users_nomad, season_m, topic_gulag, way_car_1, infra_camp, place_olchansky_pereval]],
            [1, [users_nomad, season_m, topic_gulag, way_car_1, infra_camp, place_olchansky_pereval]],

            [1.5, [users_group, season_s, topic_eco, way_car_1, infra_suit, place_ortobalagan]],
            [1.5, [users_group, season_w, topic_eco, way_car_1, infra_suit, place_ortobalagan]],
            [1.5, [users_group, season_m, topic_eco, way_car_1, infra_suit, place_ortobalagan]],
            [0.6, [users_nomad, season_s, topic_eco, way_car_1, infra_suit, place_ortobalagan]],
            [0.6, [users_nomad, season_w, topic_eco, way_car_1, infra_suit, place_ortobalagan]],
            [0.6, [users_nomad, season_m, topic_eco, way_car_1, infra_suit, place_ortobalagan]],
            [1.5, [users_group, season_s, topic_eco, way_volgabus_2, infra_suit, place_ortobalagan]],
            [1.5, [users_group, season_w, topic_eco, way_volgabus_2, infra_suit, place_ortobalagan]],
            [1.5, [users_group, season_m, topic_eco, way_volgabus_2, infra_suit, place_ortobalagan]],
            [0.6, [users_nomad, season_s, topic_eco, way_volgabus_2, infra_suit, place_ortobalagan]],
            [0.6, [users_nomad, season_w, topic_eco, way_volgabus_2, infra_suit, place_ortobalagan]],
            [0.6, [users_nomad, season_m, topic_eco, way_volgabus_2, infra_suit, place_ortobalagan]],
            [0.6, [users_nomad, season_s, topic_eco, way_boat_1, infra_suit, place_ortobalagan]],

            [0.6, [users_nomad, season_m, topic_gulag, way_car_1, place_itik_kuel]],
            [0.6, [users_nomad, season_w, topic_gulag, way_car_1, place_itik_kuel]],
            [0.6, [users_nomad, season_s, topic_gulag, way_car_1, place_itik_kuel]],

            [1.5, [users_group, season_s, topic_oym, way_car_1, infra_suit, place_juchugei]],
            [1.5, [users_group, season_w, topic_oym, way_car_1, infra_suit, place_juchugei]],
            [3, [users_lux, season_s, topic_oym, way_car_1, infra_suit, place_juchugei]],
            [3, [users_lux, season_w, topic_oym, way_car_1, infra_suit, place_juchugei]],
            [3, [users_lux, season_m, topic_oym, way_car_1, infra_suit, place_juchugei]],
            [0.6, [users_nomad, season_s, topic_oym, way_car_1, infra_suit, place_juchugei]],
            [0.6, [users_nomad, season_w, topic_oym, way_car_1, infra_suit, place_juchugei]],

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