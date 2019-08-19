import * as React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { pull } from 'lodash'
import { collect } from '../src/app/dataviz'
import { Sankey } from '../src/components/Sankey'
import {
    users_lux,
    users_mass,
    users_nomad,
    users_group,
    users_startup,
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
    place_honuu,
    place_momontailake,
    place_jebarikihaia,
    place_emanjalake,
    place_susuman,
    place_lenskiestolbi,
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
    way_volgabus_noCO_3,
    infra_scir,
    users_researchers,
    users_academtour,
} from '../src/app'
import { Select } from 'antd'

import 'antd/dist/antd.css'

interface IPageProps {
}

const defaultOrder = ['users', 'season', 'topic', 'way', 'infra', 'place']

function reorder(newGroups: string[], links: [number, string[]][]): [number, string[]][] {
    const group = (value: string) => {
        return value.split('_')[0]
    }

    return links.map(([value, items]) => {
        const newItems = items.sort((a, b) => {
            const ag = group(a)
            const bg = group(b)
            const ai = newGroups.indexOf(ag)
            const bi = newGroups.indexOf(bg)
            return ai - bi
        })
        return [value, newItems]
    })
}

function nextUnique(from: string[], skip: string[]): string {
    return pull(defaultOrder, ...skip)[0]
    // return from.reduce((u, x) => {
    //     if (skip.includes(x)) {
    //         return u
    //     }
    // })
}

function orderReducer(state: string[], action: any): string[] {
    if (action.type === 'ACTION_REORDER') {
        const newOrder: string[] = [...action.payload]
        // const addAmount = defaultOrder.length - newOrder.length

        // for (let i = 0; i < addAmount; i++) {
        //     newOrder.push(nextUnique(defaultOrder, newOrder))
        // }

        return newOrder
    }

    return state
}

const Page: NextPage<IPageProps> = (props) => {
    const [order, dispatchOrder] = React.useReducer(orderReducer, defaultOrder)

    const data = {
        nodes: sankeyNodes,
        // links: collect(reorder(['infra', 'way', 'place', 'topic', 'season', 'users'], [
        // links: collect(reorder(['season', 'way', 'infra', 'place', 'topic', 'users'], [
        links: collect(reorder(order, [
            [1.5, [users_group, season_w, topic_gulag, way_volgabus_noCO_3, infra_suit, place_topolynoe]],
            [1.5, [users_group, season_s, topic_gulag, way_volgabus_noCO_3, infra_suit, place_topolynoe]],
            [1.5, [users_group, season_w, topic_gulag, way_zeppelin_2, infra_suit, place_topolynoe]],
            [1.5, [users_group, season_s, topic_gulag, way_zeppelin_2, infra_suit, place_topolynoe]],
            [1.5, [users_group, season_m, topic_gulag, way_zeppelin_2, infra_suit, place_topolynoe]],
            [1.5, [users_group, season_w, topic_gulag, way_cargodrone_3, infra_suit, place_topolynoe]],
            [1.5, [users_group, season_s, topic_gulag, way_cargodrone_3, infra_suit, place_topolynoe]],
            [1.5, [users_group, season_w, topic_gulag, way_cargodrone_3, infra_suit, place_topolynoe]],
            [1.5, [users_group, season_s, topic_gulag, way_cargodrone_3, infra_suit, place_topolynoe]],
            [1.5, [users_group, season_m, topic_gulag, way_cargodrone_3, infra_suit, place_topolynoe]],

            [1.5, [users_group, season_s, topic_gulag, way_volgabus_2, infra_guest, place_hotkey]],
            [1.5, [users_group, season_m, topic_gulag, way_volgabus_2, infra_guest, place_hotkey]],
            [1.5, [users_group, season_w, topic_gulag, way_volgabus_2, infra_guest, place_hotkey]],
            [1.5, [users_group, season_s, topic_gulag, way_zeppelin_2, infra_scir, place_hotkey]],
            [1.5, [users_group, season_m, topic_gulag, way_zeppelin_2, infra_scir, place_hotkey]],
            [1.5, [users_group, season_w, topic_gulag, way_zeppelin_2, infra_scir, place_hotkey]],
            [1.5, [users_startup, season_s, topic_gulag, way_zeppelin_2, infra_scir, place_hotkey]],
            [1.5, [users_startup, season_m, topic_gulag, way_zeppelin_2, infra_scir, place_hotkey]],
            [1.5, [users_startup, season_w, topic_gulag, way_zeppelin_2, infra_scir, place_hotkey]],
            [5, [users_researchers, season_s, topic_gulag, way_zeppelin_2, infra_scir, place_hotkey]],
            [5, [users_researchers, season_m, topic_gulag, way_zeppelin_2, infra_scir, place_hotkey]],
            [5, [users_researchers, season_w, topic_gulag, way_zeppelin_2, infra_scir, place_hotkey]],
            [3, [users_academtour, season_s, topic_gulag, way_zeppelin_2, infra_scir, place_hotkey]],
            [3, [users_academtour, season_m, topic_gulag, way_zeppelin_2, infra_scir, place_hotkey]],
            [3, [users_academtour, season_w, topic_gulag, way_zeppelin_2, infra_scir, place_hotkey]],
            [1.5, [users_startup, season_s, topic_gulag, way_volgabus_noCO_3, infra_scir, place_hotkey]],
            [1.5, [users_startup, season_m, topic_gulag, way_volgabus_noCO_3, infra_scir, place_hotkey]],
            [1.5, [users_startup, season_w, topic_gulag, way_volgabus_noCO_3, infra_scir, place_hotkey]],
            [5, [users_researchers, season_s, topic_gulag, way_volgabus_noCO_3, infra_scir, place_hotkey]],
            [5, [users_researchers, season_m, topic_gulag, way_volgabus_noCO_3, infra_scir, place_hotkey]],
            [5, [users_researchers, season_w, topic_gulag, way_volgabus_noCO_3, infra_scir, place_hotkey]],
            [3, [users_academtour, season_s, topic_gulag, way_volgabus_noCO_3, infra_scir, place_hotkey]],
            [3, [users_academtour, season_m, topic_gulag, way_volgabus_noCO_3, infra_scir, place_hotkey]],
            [3, [users_academtour, season_w, topic_gulag, way_volgabus_noCO_3, infra_scir, place_hotkey]],
            [1, [users_lux, season_s, topic_gulag, way_plane_1, infra_scir, place_hotkey]],
            [1, [users_lux, season_w, topic_gulag, way_plane_1, infra_scir, place_hotkey]],
            [1, [users_lux, season_m, topic_gulag, way_plane_1, infra_scir, place_hotkey]],
            // [1.1, [users_lux, season_s, topic_gulag, way_plane_1, infra_guest, place_hotkey]],
            // [1.1, [users_lux, season_w, topic_gulag, way_plane_1, infra_guest, place_hotkey]],
            // [1.1, [users_lux, season_m, topic_gulag, way_plane_1, infra_guest, place_hotkey]],

            [0.6, [users_nomad, season_s, topic_gulag, way_volgabus_2, place_kuranahsala]],
            [0.6, [users_nomad, season_w, topic_gulag, way_volgabus_2, place_kuranahsala]],
            [0.6, [users_nomad, season_m, topic_gulag, way_volgabus_2, place_kuranahsala]],

            [1, [users_mass, season_w, topic_oym, way_zeppelin_2, infra_hotel, place_tomtor]],
            [1.5, [users_group, season_w, topic_oym, way_zeppelin_2, infra_hotel, place_tomtor]],
            [1.5, [users_group, season_m, topic_oym, way_zeppelin_2, infra_hotel, place_tomtor]],
            [1.5, [users_group, season_s, topic_oym, way_zeppelin_2, infra_hotel, place_tomtor]],
            [1.5, [users_group, season_s, topic_oym, way_zeppelin_2, infra_hotel, place_tomtor]],
            [1, [users_mass, season_w, topic_oym, way_zeppelin_2, infra_hom, place_tomtor]],
            [1.5, [users_group, season_w, topic_oym, way_zeppelin_2, infra_hom, place_tomtor]],
            [1.5, [users_group, season_m, topic_oym, way_zeppelin_2, infra_hom, place_tomtor]],
            [1.5, [users_group, season_s, topic_oym, way_zeppelin_2, infra_hom, place_tomtor]],
            [1.5, [users_group, season_s, topic_oym, way_zeppelin_2, infra_hom, place_tomtor]],
            [1, [users_mass, season_w, topic_oym, way_volgabus_noCO_3, infra_hotel, place_tomtor]],
            [1.5, [users_group, season_w, topic_oym, way_volgabus_noCO_3, infra_hotel, place_tomtor]],
            [1.5, [users_group, season_m, topic_oym, way_volgabus_noCO_3, infra_hotel, place_tomtor]],
            [1.5, [users_group, season_s, topic_oym, way_volgabus_noCO_3, infra_hotel, place_tomtor]],
            [1.5, [users_group, season_s, topic_oym, way_volgabus_noCO_3, infra_hotel, place_tomtor]],
            [1, [users_mass, season_w, topic_oym, way_volgabus_noCO_3, infra_hom, place_tomtor]],
            [1.5, [users_group, season_w, topic_oym, way_volgabus_noCO_3, infra_hom, place_tomtor]],
            [1.5, [users_group, season_m, topic_oym, way_volgabus_noCO_3, infra_hom, place_tomtor]],
            [1.5, [users_group, season_s, topic_oym, way_volgabus_noCO_3, infra_hom, place_tomtor]],
            [1.5, [users_group, season_s, topic_oym, way_volgabus_noCO_3, infra_hom, place_tomtor]],
            [1, [users_mass, season_w, topic_oym, way_zeppelin_2, infra_timpton, place_tomtor]],
            [1.5, [users_group, season_w, topic_oym, way_zeppelin_2, infra_timpton, place_tomtor]],
            [1.5, [users_group, season_m, topic_oym, way_zeppelin_2, infra_timpton, place_tomtor]],
            [1.5, [users_group, season_s, topic_oym, way_zeppelin_2, infra_timpton, place_tomtor]],
            [1.5, [users_group, season_s, topic_oym, way_zeppelin_2, infra_timpton, place_tomtor]],
            [1, [users_mass, season_w, topic_oym, way_zeppelin_2, infra_timpton, place_tomtor]],
            [1.5, [users_group, season_w, topic_oym, way_zeppelin_2, infra_timpton, place_tomtor]],
            [1.5, [users_group, season_m, topic_oym, way_zeppelin_2, infra_timpton, place_tomtor]],
            [1.5, [users_group, season_s, topic_oym, way_zeppelin_2, infra_timpton, place_tomtor]],
            [1.5, [users_group, season_s, topic_oym, way_zeppelin_2, infra_timpton, place_tomtor]],
            [1, [users_mass, season_w, topic_oym, way_volgabus_noCO_3, infra_timpton, place_tomtor]],
            [1.5, [users_group, season_w, topic_oym, way_volgabus_noCO_3, infra_timpton, place_tomtor]],
            [1.5, [users_group, season_m, topic_oym, way_volgabus_noCO_3, infra_timpton, place_tomtor]],
            [1.5, [users_group, season_s, topic_oym, way_volgabus_noCO_3, infra_timpton, place_tomtor]],
            [1.5, [users_group, season_s, topic_oym, way_volgabus_noCO_3, infra_timpton, place_tomtor]],
            [1, [users_mass, season_w, topic_oym, way_volgabus_noCO_3, infra_timpton, place_tomtor]],
            [1.5, [users_group, season_w, topic_oym, way_volgabus_noCO_3, infra_timpton, place_tomtor]],
            [1.5, [users_group, season_m, topic_oym, way_volgabus_noCO_3, infra_timpton, place_tomtor]],
            [1.5, [users_group, season_s, topic_oym, way_volgabus_noCO_3, infra_timpton, place_tomtor]],
            [1.5, [users_group, season_s, topic_oym, way_volgabus_noCO_3, infra_timpton, place_tomtor]],
            [1.5, [users_group, season_s, topic_oym, infra_cargo_drone, place_tomtor]],
            [1.5, [users_group, season_w, topic_oym, infra_cargo_drone, place_tomtor]],
            [1.5, [users_group, season_m, topic_oym, infra_cargo_drone, place_tomtor]],
            [1, [users_mass, season_s, topic_oym, infra_cargo_drone, place_tomtor]],
            [1, [users_mass, season_w, topic_oym, infra_cargo_drone, place_tomtor]],
            [1, [users_mass, season_m, topic_oym, infra_cargo_drone, place_tomtor]],

            [1.5, [users_group, season_s, topic_gulag, way_volgabus_2, infra_guest, place_ustnera]],
            [1.5, [users_group, season_w, topic_gulag, way_volgabus_2, infra_guest, place_ustnera]],
            [1.5, [users_group, season_s, topic_gulag, way_volgabus_2, infra_hom, place_ustnera]],
            [1.5, [users_group, season_w, topic_gulag, way_volgabus_2, infra_hom, place_ustnera]],
            [1.5, [users_group, season_s, topic_gulag, way_zeppelin_2, infra_hom, place_ustnera]],
            [1.5, [users_group, season_w, topic_gulag, way_zeppelin_2, infra_hom, place_ustnera]],
            [1.5, [users_group, season_s, topic_gulag, way_volgabus_2, infra_unit, place_ustnera]],
            [1.5, [users_group, season_w, topic_gulag, way_volgabus_2, infra_unit, place_ustnera]],
            [1.5, [users_group, season_s, topic_gulag, way_volgabus_2, infra_unit, place_ustnera]],
            [1.5, [users_group, season_w, topic_gulag, way_volgabus_2, infra_unit, place_ustnera]],
            [1.5, [users_group, season_s, topic_gulag, way_zeppelin_2, infra_unit, place_ustnera]],
            [1.5, [users_group, season_w, topic_gulag, way_zeppelin_2, infra_unit, place_ustnera]],

            [1.5, [users_group, season_w, topic_gulag, way_volgabus_2, infra_hotel, place_handiga]],
            [1.5, [users_group, season_s, topic_gulag, way_volgabus_2, infra_hotel, place_handiga]],
            [1.5, [users_group, season_m, topic_gulag, way_volgabus_2, infra_hotel, place_handiga]],
            [1, [users_mass, season_w, topic_gulag, way_volgabus_2, infra_hotel, place_handiga]],
            [1.5, [users_group, season_w, topic_gulag, way_volgabus_2, infra_unit, place_handiga]],
            [1.5, [users_group, season_s, topic_gulag, way_volgabus_2, infra_unit, place_handiga]],
            [1.5, [users_group, season_m, topic_gulag, way_volgabus_2, infra_unit, place_handiga]],
            [1, [users_mass, season_w, topic_gulag, way_volgabus_2, infra_unit, place_handiga]],

            // [1.5, [users_group, season_w, topic_oym, way_volgabus_noCO_3, infra_scir, place_oymyakon]],
            // [1, [users_nomad, season_w, topic_oym, way_volgabus_noCO_3, infra_scir, place_oymyakon]],
            // [1, [users_mass, season_w, topic_oym, way_volgabus_noCO_3, infra_scir, place_oymyakon]],
            // [1, [users_mass, season_s, topic_oym, way_volgabus_noCO_3, infra_scir, place_oymyakon]],
            [3, [users_academtour, season_s, topic_oym, way_volgabus_noCO_3, infra_scir, place_oymyakon]],
            [5, [users_researchers, season_s, topic_oym, way_volgabus_noCO_3, infra_scir, place_oymyakon]],
            [1, [users_startup, season_s, topic_oym, way_volgabus_noCO_3, infra_scir, place_oymyakon]],
            [3, [users_academtour, season_w, topic_oym, way_volgabus_noCO_3, infra_scir, place_oymyakon]],
            [5, [users_researchers, season_w, topic_oym, way_volgabus_noCO_3, infra_scir, place_oymyakon]],
            [1, [users_startup, season_w, topic_oym, way_volgabus_noCO_3, infra_scir, place_oymyakon]],
            [3, [users_academtour, season_m, topic_oym, way_volgabus_noCO_3, infra_scir, place_oymyakon]],
            [5, [users_researchers, season_m, topic_oym, way_volgabus_noCO_3, infra_scir, place_oymyakon]],
            [1, [users_startup, season_m, topic_oym, way_volgabus_noCO_3, infra_scir, place_oymyakon]],
            [3, [users_academtour, season_s, topic_oym, way_zeppelin_2, infra_scir, place_oymyakon]],
            [5, [users_researchers, season_s, topic_oym, way_zeppelin_2, infra_scir, place_oymyakon]],
            [1, [users_startup, season_s, topic_oym, way_zeppelin_2, infra_scir, place_oymyakon]],
            [3, [users_academtour, season_w, topic_oym, way_zeppelin_2, infra_scir, place_oymyakon]],
            [5, [users_researchers, season_w, topic_oym, way_zeppelin_2, infra_scir, place_oymyakon]],
            [1, [users_startup, season_w, topic_oym, way_zeppelin_2, infra_scir, place_oymyakon]],
            [3, [users_academtour, season_m, topic_oym, way_zeppelin_2, infra_scir, place_oymyakon]],
            [5, [users_researchers, season_m, topic_oym, way_zeppelin_2, infra_scir, place_oymyakon]],
            [1, [users_startup, season_m, topic_oym, way_zeppelin_2, infra_scir, place_oymyakon]],
            // [1.5, [users_group, season_w, topic_oym, way_zeppelin_2, infra_scir, place_oymyakon]],
            [1, [users_mass, season_w, topic_oym, way_zeppelin_2, infra_scc, place_oymyakon]],
            [1, [users_mass, season_w, topic_oym, way_volgabus_2, infra_scc, place_oymyakon]],
            [1, [users_mass, season_s, topic_oym, way_zeppelin_2, infra_scc, place_oymyakon]],
            [1, [users_mass, season_s, topic_oym, way_volgabus_2, infra_scc, place_oymyakon]],
            [1, [users_group, season_w, topic_oym, way_zeppelin_2, infra_scc, place_oymyakon]],
            [1, [users_group, season_w, topic_oym, way_volgabus_2, infra_scc, place_oymyakon]],
            [1, [users_group, season_s, topic_oym, way_zeppelin_2, infra_scc, place_oymyakon]],
            [1, [users_group, season_s, topic_oym, way_volgabus_2, infra_scc, place_oymyakon]],
            [1.5, [users_group, season_w, topic_oym, way_volgabus_noCO_3, infra_unit, place_oymyakon]],
            [1, [users_nomad, season_w, topic_oym, way_volgabus_noCO_3, infra_unit, place_oymyakon]],
            [1.5, [users_group, season_w, topic_oym, way_zeppelin_2, infra_unit, place_oymyakon]],
            // [1.5, [users_group, season_s, topic_oym, way_volgabus_noCO_3, infra_scir, place_oymyakon]],
            // [1, [users_nomad, season_s, topic_oym, way_volgabus_noCO_3, infra_scir, place_oymyakon]],
            // [1.5, [users_group, season_s, topic_oym, way_zeppelin_2, infra_scir, place_oymyakon]],
            [1.5, [users_group, season_s, topic_oym, way_volgabus_noCO_3, infra_unit, place_oymyakon]],
            [1, [users_nomad, season_s, topic_oym, way_volgabus_noCO_3, infra_unit, place_oymyakon]],
            [1.5, [users_group, season_s, topic_oym, way_zeppelin_2, infra_unit, place_oymyakon]],
            [1.5, [users_group, season_w, topic_oym, way_volgabus_2, infra_scir, place_oymyakon]],
            [1, [users_nomad, season_w, topic_oym, way_volgabus_2, infra_scir, place_oymyakon]],
            [1.5, [users_group, season_w, topic_oym, way_volgabus_2, infra_unit, place_oymyakon]],
            [1.5, [users_group, season_w, topic_oym, way_volgabus_2, infra_unit, place_oymyakon]],
            [1.5, [users_group, season_s, topic_oym, way_volgabus_2, infra_scir, place_oymyakon]],
            [1, [users_nomad, season_s, topic_oym, way_volgabus_2, infra_scir, place_oymyakon]],
            [1.5, [users_group, season_s, topic_oym, way_volgabus_2, infra_unit, place_oymyakon]],
            [1, [users_nomad, season_s, topic_oym, way_volgabus_2, infra_unit, place_oymyakon]],
            [1, [users_group, season_s, topic_oym, way_volgabus_noCO_3, infra_timpton, place_oymyakon]],
            [1, [users_group, season_s, topic_oym, way_zeppelin_2, infra_timpton, place_oymyakon]],
            [1, [users_group, season_s, topic_oym, way_volgabus_2, infra_timpton, place_oymyakon]],
            [1, [users_group, season_w, topic_oym, way_volgabus_noCO_3, infra_timpton, place_oymyakon]],
            [1, [users_group, season_w, topic_oym, way_zeppelin_2, infra_timpton, place_oymyakon]],
            [1, [users_group, season_w, topic_oym, way_volgabus_2, infra_timpton, place_oymyakon]],
            [1, [users_group, season_w, topic_oym, infra_cargo_drone, place_oymyakon]],
            [1, [users_group, season_s, topic_oym, infra_cargo_drone, place_oymyakon]],
            [1, [users_group, season_m, topic_oym, infra_cargo_drone, place_oymyakon]],
            [1, [users_nomad, season_w, topic_oym, infra_cargo_drone, place_oymyakon]],
            [1, [users_nomad, season_s, topic_oym, infra_cargo_drone, place_oymyakon]],
            [1, [users_nomad, season_m, topic_oym, infra_cargo_drone, place_oymyakon]],
            [3, [users_academtour, season_w, topic_oym, infra_cargo_drone, place_oymyakon]],
            [3, [users_academtour, season_s, topic_oym, infra_cargo_drone, place_oymyakon]],
            [3, [users_academtour, season_m, topic_oym, infra_cargo_drone, place_oymyakon]],
            [5, [users_researchers, season_w, topic_oym, infra_cargo_drone, place_oymyakon]],
            [5, [users_researchers, season_s, topic_oym, infra_cargo_drone, place_oymyakon]],
            [5, [users_researchers, season_m, topic_oym, infra_cargo_drone, place_oymyakon]],
            [1, [users_startup, season_w, topic_oym, infra_cargo_drone, place_oymyakon]],
            [1, [users_startup, season_s, topic_oym, infra_cargo_drone, place_oymyakon]],
            [1, [users_startup, season_m, topic_oym, infra_cargo_drone, place_oymyakon]],

            [1.5, [users_group, season_s, topic_eco, way_boat_1, infra_camp, place_yurti_meteo]],
            [0.6, [users_nomad, season_s, topic_eco, way_boat_1, infra_camp, place_yurti_meteo]],
            [1.5, [users_group, season_w, topic_eco, way_volgabus_2, infra_camp, place_yurti_meteo]],
            [0.6, [users_nomad, season_w, topic_eco, way_volgabus_2, infra_camp, place_yurti_meteo]],
            [1.5, [users_group, season_w, topic_oym, way_volgabus_2, infra_camp, place_yurti_meteo]],
            [1.5, [users_group, season_s, topic_eco, infra_cargo_drone, infra_camp, place_yurti_meteo]],
            [0.6, [users_nomad, season_s, topic_eco, infra_cargo_drone, infra_camp, place_yurti_meteo]],
            [1.5, [users_group, season_w, topic_eco, infra_cargo_drone, infra_camp, place_yurti_meteo]],
            [0.6, [users_nomad, season_w, topic_eco, infra_cargo_drone, infra_camp, place_yurti_meteo]],
            [1.5, [users_group, season_w, topic_oym, infra_cargo_drone, infra_camp, place_yurti_meteo]],

            [1.5, [users_group, season_w, topic_eco, way_horse_1, infra_guest, place_labinkir]],
            [1.5, [users_group, season_s, topic_eco, way_horse_1, infra_guest, place_labinkir]],
            [1.5, [users_group, season_m, topic_eco, way_horse_1, infra_guest, place_labinkir]],
            [1.5, [users_group, season_w, topic_oym, way_horse_1, infra_guest, place_labinkir]],
            [1.5, [users_group, season_w, topic_eco, way_horse_1, infra_camp, place_labinkir]],
            [1.5, [users_group, season_s, topic_eco, way_horse_1, infra_camp, place_labinkir]],
            [1.5, [users_group, season_m, topic_eco, way_horse_1, infra_camp, place_labinkir]],
            [1.5, [users_group, season_w, topic_oym, way_horse_1, infra_camp, place_labinkir]],
            [1.5, [users_group, season_w, topic_eco, way_zeppelin_2, infra_guest, place_labinkir]],
            [1.5, [users_group, season_s, topic_eco, way_zeppelin_2, infra_guest, place_labinkir]],
            [1.5, [users_group, season_m, topic_eco, way_zeppelin_2, infra_guest, place_labinkir]],
            [1.5, [users_group, season_w, topic_oym, way_zeppelin_2, infra_guest, place_labinkir]],
            [1.5, [users_group, season_w, topic_eco, way_zeppelin_2, infra_camp, place_labinkir]],
            [1.5, [users_group, season_s, topic_eco, way_zeppelin_2, infra_camp, place_labinkir]],
            [1.5, [users_group, season_m, topic_eco, way_zeppelin_2, infra_camp, place_labinkir]],
            [1.5, [users_group, season_w, topic_oym, way_zeppelin_2, infra_camp, place_labinkir]],
            [1.5, [users_group, season_w, topic_eco, infra_cargo_drone, infra_guest, place_labinkir]],
            [1.5, [users_group, season_s, topic_eco, infra_cargo_drone, infra_guest, place_labinkir]],
            [1.5, [users_group, season_m, topic_eco, infra_cargo_drone, infra_guest, place_labinkir]],
            [1.5, [users_group, season_w, topic_oym, infra_cargo_drone, infra_guest, place_labinkir]],
            [1.5, [users_group, season_w, topic_eco, infra_cargo_drone, infra_camp, place_labinkir]],
            [1.5, [users_group, season_s, topic_eco, infra_cargo_drone, infra_camp, place_labinkir]],
            [1.5, [users_group, season_m, topic_eco, infra_cargo_drone, infra_camp, place_labinkir]],
            [1.5, [users_group, season_w, topic_oym, infra_cargo_drone, infra_camp, place_labinkir]],
            [3, [users_academtour, season_w, topic_eco, way_zeppelin_2, infra_scir, place_labinkir]],
            [3, [users_academtour, season_w, topic_eco, way_zeppelin_2, infra_scir, place_labinkir]],
            [3, [users_academtour, season_s, topic_eco, way_zeppelin_2, infra_scir, place_labinkir]],
            [5, [users_researchers, season_s, topic_eco, way_zeppelin_2, infra_scir, place_labinkir]],
            [5, [users_researchers, season_m, topic_eco, way_zeppelin_2, infra_scir, place_labinkir]],
            [5, [users_researchers, season_m, topic_eco, way_zeppelin_2, infra_scir, place_labinkir]],

            [1.5, [users_group, season_w, topic_eco, way_horse_1, infra_suit, place_alisardakh_lake]],
            [1.5, [users_group, season_s, topic_eco, way_horse_1, infra_suit, place_alisardakh_lake]],
            [1.5, [users_group, season_m, topic_eco, way_horse_1, infra_suit, place_alisardakh_lake]],
            [0.6, [users_nomad, season_w, topic_eco, way_horse_1, infra_suit, place_alisardakh_lake]],
            [0.6, [users_nomad, season_s, topic_eco, way_horse_1, infra_suit, place_alisardakh_lake]],
            [0.6, [users_nomad, season_m, topic_eco, way_horse_1, infra_suit, place_alisardakh_lake]],
            [1.5, [users_group, season_w, topic_eco, infra_cargo_drone, infra_suit, place_alisardakh_lake]],
            [1.5, [users_group, season_s, topic_eco, infra_cargo_drone, infra_suit, place_alisardakh_lake]],
            [1.5, [users_group, season_m, topic_eco, infra_cargo_drone, infra_suit, place_alisardakh_lake]],
            [0.6, [users_nomad, season_w, topic_eco, infra_cargo_drone, infra_suit, place_alisardakh_lake]],
            [0.6, [users_nomad, season_s, topic_eco, infra_cargo_drone, infra_suit, place_alisardakh_lake]],
            [0.6, [users_nomad, season_m, topic_eco, infra_cargo_drone, infra_suit, place_alisardakh_lake]],

            [1, [users_lux, season_s, topic_eco, way_zeppelin_2, infra_suit, place_jacklondon_lake]],
            [1, [users_lux, season_w, topic_eco, way_zeppelin_2, infra_suit, place_jacklondon_lake]],
            [1, [users_lux, season_m, topic_eco, way_zeppelin_2, infra_suit, place_jacklondon_lake]],
            [1, [users_lux, season_m, topic_eco, way_volgabus_noCO_3, infra_suit, place_jacklondon_lake]],
            [3, [users_group, season_s, topic_eco, way_zeppelin_2, infra_suit, place_jacklondon_lake]],
            [3, [users_group, season_w, topic_eco, way_zeppelin_2, infra_suit, place_jacklondon_lake]],
            [3, [users_group, season_m, topic_eco, way_zeppelin_2, infra_suit, place_jacklondon_lake]],
            [3, [users_group, season_m, topic_eco, way_volgabus_noCO_3, infra_suit, place_jacklondon_lake]],

            [0.6, [users_nomad, season_s, topic_gulag, infra_cargo_drone, place_drajni]],
            [0.6, [users_nomad, season_w, topic_gulag, infra_cargo_drone, place_drajni]],
            [1, [users_lux, season_w, topic_gulag, infra_cargo_drone, place_drajni]],

            [0.6, [users_nomad, season_s, topic_gulag, way_zeppelin_2, infra_unit, place_zirianka]],
            [0.6, [users_nomad, season_w, topic_gulag, way_zeppelin_2, infra_unit, place_zirianka]],
            [0.6, [users_nomad, season_m, topic_gulag, way_zeppelin_2, infra_unit, place_zirianka]],
            [0.6, [users_group, season_s, topic_gulag, way_zeppelin_2, infra_unit, place_zirianka]],
            [0.6, [users_group, season_w, topic_gulag, way_zeppelin_2, infra_unit, place_zirianka]],
            [0.6, [users_group, season_m, topic_gulag, way_zeppelin_2, infra_unit, place_zirianka]],
            [5, [users_researchers, season_s, topic_eco, way_zeppelin_2, infra_scir, place_zirianka]],
            [5, [users_researchers, season_w, topic_eco, way_zeppelin_2, infra_scir, place_zirianka]],
            [5, [users_researchers, season_m, topic_eco, way_zeppelin_2, infra_scir, place_zirianka]],

            [0.6, [users_nomad, season_w, topic_gulag, way_volgabus_noCO_3, infra_hom, place_kadikchan]],
            [0.6, [users_nomad, season_s, topic_gulag, way_volgabus_noCO_3, infra_hom, place_kadikchan]],
            [0.6, [users_nomad, season_m, topic_gulag, way_volgabus_noCO_3, infra_hom, place_kadikchan]],
            [1.5, [users_group, season_w, topic_gulag, way_volgabus_noCO_3, infra_hom, place_kadikchan]],
            [1.5, [users_group, season_s, topic_gulag, way_volgabus_noCO_3, infra_hom, place_kadikchan]],
            [1.5, [users_group, season_m, topic_gulag, way_volgabus_noCO_3, infra_hom, place_kadikchan]],
            [1.5, [users_group, season_w, topic_gulag, way_zeppelin_2, infra_hom, place_kadikchan]],
            [1.5, [users_group, season_s, topic_gulag, way_zeppelin_2, infra_hom, place_kadikchan]],
            [1.5, [users_group, season_m, topic_gulag, way_zeppelin_2, infra_hom, place_kadikchan]],
            [0.6, [users_nomad, season_w, topic_gulag, way_volgabus_noCO_3, infra_unit, place_kadikchan]],
            [0.6, [users_nomad, season_s, topic_gulag, way_volgabus_noCO_3, infra_unit, place_kadikchan]],
            [0.6, [users_nomad, season_m, topic_gulag, way_volgabus_noCO_3, infra_unit, place_kadikchan]],
            [1.5, [users_group, season_w, topic_gulag, way_volgabus_noCO_3, infra_unit, place_kadikchan]],
            [1.5, [users_group, season_s, topic_gulag, way_volgabus_noCO_3, infra_unit, place_kadikchan]],
            [1.5, [users_group, season_m, topic_gulag, way_volgabus_noCO_3, infra_unit, place_kadikchan]],
            [1.5, [users_group, season_w, topic_gulag, way_zeppelin_2, infra_unit, place_kadikchan]],
            [1.5, [users_group, season_s, topic_gulag, way_zeppelin_2, infra_unit, place_kadikchan]],
            [1.5, [users_group, season_m, topic_gulag, way_zeppelin_2, infra_unit, place_kadikchan]],

            [0.6, [users_nomad, season_w, topic_gulag, way_volgabus_2, infra_unit, place_karamken]],
            [0.6, [users_nomad, season_s, topic_gulag, way_volgabus_2, infra_unit, place_karamken]],
            [0.6, [users_nomad, season_m, topic_gulag, way_volgabus_2, infra_unit, place_karamken]],
            [0.6, [users_nomad, season_w, topic_gulag, way_moto_1, infra_unit, place_karamken]],
            [0.6, [users_nomad, season_s, topic_gulag, way_moto_1, infra_unit, place_karamken]],
            [0.6, [users_nomad, season_m, topic_gulag, way_moto_1, infra_unit, place_karamken]],
            [0.6, [users_group, season_w, topic_gulag, way_zeppelin_2, infra_unit, place_karamken]],
            [0.6, [users_group, season_s, topic_gulag, way_zeppelin_2, infra_unit, place_karamken]],
            [0.6, [users_group, season_m, topic_gulag, way_zeppelin_2, infra_unit, place_karamken]],
            [0.6, [users_group, season_w, topic_gulag, way_zeppelin_2, infra_unit, place_karamken]],
            [0.6, [users_group, season_s, topic_gulag, way_zeppelin_2, infra_unit, place_karamken]],
            [0.6, [users_group, season_m, topic_gulag, way_zeppelin_2, infra_unit, place_karamken]],

            [1.5, [users_group, season_s, topic_eco, way_volgabus_2, infra_camp, place_oym_kisiliahi]],
            [0.6, [users_nomad, season_s, topic_eco, way_moto_1, infra_camp, place_oym_kisiliahi]],
            [1.5, [users_group, season_s, topic_eco, infra_cargo_drone, infra_camp, place_oym_kisiliahi]],
            [0.6, [users_nomad, season_s, topic_eco, infra_cargo_drone, infra_camp, place_oym_kisiliahi]],

            [1.5, [users_group, season_w, topic_gulag, way_volgabus_noCO_3, infra_camp, place_olchansky_pereval]],
            [1.5, [users_group, season_w, topic_gulag, way_volgabus_noCO_3, infra_camp, place_olchansky_pereval]],
            [1.5, [users_group, season_s, topic_gulag, way_volgabus_noCO_3, infra_camp, place_olchansky_pereval]],
            [1, [users_nomad, season_s, topic_gulag, way_volgabus_noCO_3, infra_camp, place_olchansky_pereval]],
            [1, [users_nomad, season_m, topic_gulag, way_volgabus_noCO_3, infra_camp, place_olchansky_pereval]],
            [1, [users_nomad, season_m, topic_gulag, way_volgabus_noCO_3, infra_camp, place_olchansky_pereval]],

            [1.5, [users_group, season_s, topic_eco, infra_cargo_drone, infra_suit, place_ortobalagan]],
            [1.5, [users_group, season_w, topic_eco, infra_cargo_drone, infra_suit, place_ortobalagan]],
            [1.5, [users_group, season_m, topic_eco, infra_cargo_drone, infra_suit, place_ortobalagan]],
            [0.6, [users_nomad, season_s, topic_eco, infra_cargo_drone, infra_suit, place_ortobalagan]],
            [0.6, [users_nomad, season_w, topic_eco, infra_cargo_drone, infra_suit, place_ortobalagan]],
            [0.6, [users_nomad, season_m, topic_eco, infra_cargo_drone, infra_suit, place_ortobalagan]],
            [1.5, [users_group, season_s, topic_eco, way_volgabus_noCO_3, infra_suit, place_ortobalagan]],
            [1.5, [users_group, season_w, topic_eco, way_volgabus_noCO_3, infra_suit, place_ortobalagan]],
            [1.5, [users_group, season_m, topic_eco, way_volgabus_noCO_3, infra_suit, place_ortobalagan]],
            [0.6, [users_nomad, season_s, topic_eco, way_volgabus_noCO_3, infra_suit, place_ortobalagan]],
            [0.6, [users_nomad, season_w, topic_eco, way_volgabus_noCO_3, infra_suit, place_ortobalagan]],
            [0.6, [users_nomad, season_m, topic_eco, way_volgabus_noCO_3, infra_suit, place_ortobalagan]],
            [0.6, [users_nomad, season_s, topic_eco, way_boat_1, infra_suit, place_ortobalagan]],

            [0.6, [users_nomad, season_m, topic_gulag, way_zeppelin_2, infra_timpton, place_itik_kuel]],
            [0.6, [users_nomad, season_w, topic_gulag, way_zeppelin_2, infra_timpton, place_itik_kuel]],
            [0.6, [users_nomad, season_s, topic_gulag, way_zeppelin_2, infra_timpton, place_itik_kuel]],
            [0.6, [users_group, season_m, topic_gulag, way_zeppelin_2, infra_timpton, place_itik_kuel]],
            [0.6, [users_group, season_w, topic_gulag, way_zeppelin_2, infra_timpton, place_itik_kuel]],
            [0.6, [users_group, season_s, topic_gulag, way_zeppelin_2, infra_timpton, place_itik_kuel]],

            [1.5, [users_group, season_s, topic_oym, way_volgabus_noCO_3, infra_suit, place_juchugei]],
            [1.5, [users_group, season_w, topic_oym, way_volgabus_noCO_3, infra_suit, place_juchugei]],
            [1, [users_lux, season_s, topic_oym, way_volgabus_noCO_3, infra_suit, place_juchugei]],
            [1, [users_lux, season_w, topic_oym, way_volgabus_noCO_3, infra_suit, place_juchugei]],
            [1, [users_lux, season_m, topic_oym, way_volgabus_noCO_3, infra_suit, place_juchugei]],
            [0.6, [users_nomad, season_s, topic_oym, way_volgabus_noCO_3, infra_suit, place_juchugei]],
            [0.6, [users_nomad, season_w, topic_oym, way_volgabus_noCO_3, infra_suit, place_juchugei]],
            [1.5, [users_group, season_s, topic_oym, way_volgabus_noCO_3, infra_unit, place_juchugei]],
            [1.5, [users_group, season_w, topic_oym, way_volgabus_noCO_3, infra_unit, place_juchugei]],
            [1, [users_lux, season_s, topic_oym, way_volgabus_noCO_3, infra_unit, place_juchugei]],
            [1, [users_lux, season_w, topic_oym, way_volgabus_noCO_3, infra_unit, place_juchugei]],
            [1, [users_lux, season_m, topic_oym, way_volgabus_noCO_3, infra_unit, place_juchugei]],
            [0.6, [users_nomad, season_s, topic_oym, way_volgabus_noCO_3, infra_unit, place_juchugei]],
            [0.6, [users_nomad, season_w, topic_oym, way_volgabus_noCO_3, infra_unit, place_juchugei]],
            [0.6, [users_nomad, season_w, topic_oym, infra_cargo_drone, place_juchugei]],
            [0.6, [users_group, season_w, topic_oym, infra_cargo_drone, place_juchugei]],
            [1, [users_lux, season_w, topic_oym, infra_cargo_drone, place_juchugei]],

            [3, [users_academtour, season_w, topic_eco, way_zeppelin_2, infra_scir, place_honuu]],
            [3, [users_academtour, season_s, topic_eco, way_zeppelin_2, infra_scir, place_honuu]],
            [3, [users_academtour, season_m, topic_eco, way_zeppelin_2, infra_scir, place_honuu]],
            [5, [users_researchers, season_w, topic_eco, way_zeppelin_2, infra_scir, place_honuu]],
            [5, [users_researchers, season_s, topic_eco, way_zeppelin_2, infra_scir, place_honuu]],
            [5, [users_researchers, season_m, topic_eco, way_zeppelin_2, infra_scir, place_honuu]],
            [1, [users_startup, season_w, topic_eco, way_zeppelin_2, infra_scir, place_honuu]],
            [1, [users_startup, season_s, topic_eco, way_zeppelin_2, infra_scir, place_honuu]],
            [1, [users_startup, season_m, topic_eco, way_zeppelin_2, infra_scir, place_honuu]],
            [3, [users_academtour, season_w, topic_eco, way_zeppelin_2, infra_unit, place_honuu]],
            [3, [users_academtour, season_s, topic_eco, way_zeppelin_2, infra_unit, place_honuu]],
            [3, [users_academtour, season_m, topic_eco, way_zeppelin_2, infra_unit, place_honuu]],
            [5, [users_researchers, season_w, topic_eco, way_zeppelin_2, infra_unit, place_honuu]],
            [5, [users_researchers, season_s, topic_eco, way_zeppelin_2, infra_unit, place_honuu]],
            [5, [users_researchers, season_m, topic_eco, way_zeppelin_2, infra_unit, place_honuu]],
            [1, [users_startup, season_w, topic_eco, way_zeppelin_2, infra_unit, place_honuu]],
            [1, [users_startup, season_s, topic_eco, way_zeppelin_2, infra_unit, place_honuu]],
            [1, [users_startup, season_m, topic_eco, way_zeppelin_2, infra_unit, place_honuu]],

            [1, [users_group, season_m, topic_eco, way_zeppelin_2, infra_suit, place_momontailake]],
            [1, [users_group, season_w, topic_eco, way_zeppelin_2, infra_suit, place_momontailake]],
            [1, [users_group, season_s, topic_eco, way_zeppelin_2, infra_suit, place_momontailake]],

            [1, [users_group, season_m, topic_gulag, way_zeppelin_2, infra_hom, place_jebarikihaia]],
            [1, [users_group, season_m, topic_gulag, way_zeppelin_2, infra_timpton, place_jebarikihaia]],
            [1, [users_group, season_w, topic_gulag, way_zeppelin_2, infra_hom, place_jebarikihaia]],
            [1, [users_group, season_w, topic_gulag, way_zeppelin_2, infra_timpton, place_jebarikihaia]],
            [1, [users_group, season_s, topic_gulag, way_zeppelin_2, infra_hom, place_jebarikihaia]],
            [1, [users_group, season_s, topic_gulag, way_zeppelin_2, infra_timpton, place_jebarikihaia]],
            [1, [users_nomad, season_m, topic_gulag, way_zeppelin_2, infra_hom, place_jebarikihaia]],
            [1, [users_nomad, season_m, topic_gulag, way_zeppelin_2, infra_timpton, place_jebarikihaia]],
            [1, [users_nomad, season_w, topic_gulag, way_zeppelin_2, infra_hom, place_jebarikihaia]],
            [1, [users_nomad, season_w, topic_gulag, way_zeppelin_2, infra_timpton, place_jebarikihaia]],
            [1, [users_nomad, season_s, topic_gulag, way_zeppelin_2, infra_hom, place_jebarikihaia]],
            [1, [users_nomad, season_s, topic_gulag, way_zeppelin_2, infra_timpton, place_jebarikihaia]],

            [1, [users_group, season_m, topic_eco, way_cargodrone_3, infra_suit, place_emanjalake]],
            [1, [users_group, season_w, topic_eco, way_cargodrone_3, infra_suit, place_emanjalake]],
            [1, [users_group, season_s, topic_eco, way_cargodrone_3, infra_suit, place_emanjalake]],

            [1, [users_group, season_m, topic_gulag, way_cargodrone_3, infra_unit, place_susuman]],
            [1, [users_group, season_m, topic_gulag, way_volgabus_noCO_3, infra_unit, place_susuman]],
            [1, [users_group, season_w, topic_gulag, way_cargodrone_3, infra_unit, place_susuman]],
            [1, [users_group, season_w, topic_gulag, way_volgabus_noCO_3, infra_unit, place_susuman]],
            [1, [users_group, season_s, topic_gulag, way_cargodrone_3, infra_unit, place_susuman]],
            [1, [users_group, season_s, topic_gulag, way_volgabus_noCO_3, infra_unit, place_susuman]],
            [1, [users_nomad, season_m, topic_gulag, way_cargodrone_3, infra_unit, place_susuman]],
            [1, [users_nomad, season_m, topic_gulag, way_volgabus_noCO_3, infra_unit, place_susuman]],
            [1, [users_nomad, season_w, topic_gulag, way_cargodrone_3, infra_unit, place_susuman]],
            [1, [users_nomad, season_w, topic_gulag, way_volgabus_noCO_3, infra_unit, place_susuman]],
            [1, [users_nomad, season_s, topic_gulag, way_cargodrone_3, infra_unit, place_susuman]],
            [1, [users_nomad, season_s, topic_gulag, way_volgabus_noCO_3, infra_unit, place_susuman]],

            [1, [users_group, season_m, topic_eco, way_zeppelin_2, infra_camp, place_lenskiestolbi]],
            [1, [users_group, season_w, topic_eco, way_zeppelin_2, infra_camp, place_lenskiestolbi]],
            [1, [users_group, season_s, topic_eco, way_zeppelin_2, infra_camp, place_lenskiestolbi]],
        ]))
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

            <Select
                mode="multiple"
                style={{ width: '100%' }}
                // placeholder="Please select"
                defaultValue={order}
                onChange={(values) => {
                    console.log(values)
                    dispatchOrder({
                        type: 'ACTION_REORDER',
                        payload: values
                    })
                }}
            >
                {defaultOrder.map(x => (
                    <Select.Option
                        value={x}
                        key={x}
                    >{x}</Select.Option>
                ))}
            </Select>

            <Sankey
                data={data}
                defaultColorSet={['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb', '#97e3d5']}
            />

            <pre>
                {JSON.stringify(data, null, 4)}
            </pre>
        </div>
    )
}

export default Page