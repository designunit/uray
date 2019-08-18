import { caseKey } from './lib'

export const topicOptions = [
    {
        name: 'Мегамаршрут',
        value: 'EXT',
    },
    {
        name: 'ГУЛАГ',
        value: 'GUL',
    },
    {
        name: 'Природный маршрут',
        value: 'ECO',
    },
    {
        name: 'местный быт в суровом климате',
        value: 'OYM',
    },
    {
        name: 'золотодобыча, алмазы',
        value: 'INDS',
    },
]

export const userOptions = [
    {
        name: 'состоятельные туристы',
        value: 'LUX',
    },
    {
        name: 'российские туристы',
        value: 'RUS',
    },
    {
        name: 'иностранные туристы',
        value: 'EU+JAP',
    },
    {
        name: 'участники пробегов и экспедиций',
        value: 'SPEC',
    },
    {
        name: 'китайские туристы',
        value: 'CHINA',
    },
    {
        name: 'самостоятельные путешественники',
        value: 'SOLO',
    },
]

export const seasonOptions = [
    {
        name: 'зима',
        value: 'W',
    },
    {
        name: 'лето',
        value: 'S',
    },
    {
        name: 'межсезонье',
        value: 'MID',
    },
    {
        name: 'круглогодично',
        value: 'A',
    },
]

export const treeCaseData = () => [
    {
        title: 'Topic',
        key: 'topic',
        children: topicOptions.map(x => ({
            title: x.name,
            key: caseKey('topic', x.value),
        }))
    },
    {
        title: 'User',
        key: 'user',
        children: userOptions.map(x => ({
            title: x.name,
            key: caseKey('user', x.value),
        }))
    },
    {
        title: 'Season',
        key: 'season',
        children: seasonOptions.map(x => ({
            title: x.name,
            key: caseKey('season', x.value),
        }))
    },
]

export const users_lux = 'users_lux'
export const users_mass = 'users_mass'
export const users_nomad = 'users_nomad'
export const users_group = 'users_group'
export const topic_eco = 'topic_eco'
export const topic_gulag = 'topic_gulag'
export const topic_oym = 'topic_oym'
export const season_w = 'season_w'
export const season_s = 'season_s'
export const season_m = 'season_m'
export const infra_zeppelin = 'infra_zeppelin'
export const infra_volgobus = 'infra_volgobus'
export const infra_drone = 'infra_drone'
export const infra_cargo_drone = 'infra_cargo_drone'
export const infra_cert = 'infra_cert'
export const infra_plane = 'infra_plane'
export const infra_unit = 'infra_unit'
export const infra_suit = 'infra_suit'
export const infra_shelter = 'infra_shelter'
export const infra_camp = 'infra_camp'
export const infra_hom = 'infra_hom'
export const infra_guest = 'infra_guest'
export const infra_infobox = 'infra_infobox'
export const infra_office = 'infra_office'
export const infra_roads = 'infra_roads'
export const infra_kayak = 'infra_kayak'
export const infra_horse = 'infra_horse'
export const infra_dog = 'infra_dog'
export const infra_bukhanka = 'infra_bukhanka'
export const infra_hotel = 'infra_hotel'
export const infra_palatka = 'infra_palatka'
export const place_oymyakon = 'place_oymyakon'
export const place_zirianka = 'place_zirianka'
export const place_hotkey = 'place_hotkey'
export const place_handiga = 'place_handiga'
export const place_shelter = 'place_shelter'
export const place_suit = 'place_suit'
export const place_magadan = 'place_magadan'
export const place_ustnera = 'place_ustnera'
export const place_tomtor = 'place_tomtor'
export const place_yuchugey = 'place_yuchugey'
export const place_topolynoe = 'place_topolynoe'
export const place_kadikchan = 'place_kadikchan'
export const place_yurti_meteo = 'place_yurti_meteo'
export const place_kuranahsala = 'place_kuranahsala'
export const place_labinkir = 'place_labinkir'
export const place_nelkan = 'place_nelkan'
export const place_academic_hotkey = 'place_academic_hotkey'
export const place_alisardakh_lake = 'place_alisardakh_lake'
export const place_jacklondon_lake = 'place_jacklondon_lake'
export const place_drajni = 'place_drajni'
export const place_karamken = 'place_karamken'
export const place_oym_kisiliahi = 'place_oym_kisiliahi'
export const place_olchansky_pereval = 'place_olchansky_pereval'
export const place_ortobalagan = 'place_ortobalagan'
export const place_itik_kuel = 'place_itik_kuel'
export const place_juchugei = 'place_juchugei'
export const way_moto_1 = 'way_moto_1'
export const way_car_1 = 'way_car_1'
export const way_plane_1 = 'way_plane_1'
export const way_boat_1 = 'way_boat_1'
export const way_horse_1 = 'way_horse_1'
export const way_zeppelin_2 = 'way_zeppelin_2'
export const way_volgabus_2 = 'way_volgabus_2'
export const way_pontoneroad_2 = 'way_pontoneroad_2'
export const way_volgabus_noCO_3 = 'way_volgabus_noCO_3'
export const way_cargodrone_3 = 'way_cargodrone3'
export const infra_scc = 'infra_scc'

export const sankeyNodes = [
    {
        "id": users_lux,
        "color": "rgb(0, 0, 0)",
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
        "id": infra_hotel,
        "color": "rgb(0, 0, 0)"
    },
    {
        "id": infra_palatka,
        "color": "rgb(0, 0, 0)"
    },
    {
        "id": infra_scc,
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
        "id": way_moto_1,
        "color": "rgb(0, 0, 0)"
    },
    {
        "id": way_car_1,
        "color": "rgb(0, 0, 0)"
    },
    {
        "id": way_plane_1,
        "color": "rgb(0, 0, 0)"
    },
    {
        "id": way_boat_1,
        "color": "rgb(0, 0, 0)"
    },
    {
        "id": way_horse_1,
        "color": "rgb(0, 0, 0)"
    },
    {
        "id": way_zeppelin_2,
        "color": "rgb(0, 0, 0)"
    },
    {
        "id": way_volgabus_2,
        "color": "rgb(0, 0, 0)"
    },
    {
        "id": way_pontoneroad_2,
        "color": "rgb(0, 0, 0)"
    },
    {
        "id": way_volgabus_noCO_3,
        "color": "rgb(0, 0, 0)"
    },
    {
        "id": way_cargodrone_3,
        "color": "rgb(0, 0, 0)"
    },
]
