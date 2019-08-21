import { caseKey } from './lib'
import { collect } from './dataviz';

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
export const users_startup = 'users_startup'
export const users_academtour = 'users_academtour'
export const users_researchers = 'users_researchers'
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
export const place_honuu = 'place_honuu'
export const place_momontailake = 'place_momontailake'
export const place_jebarikihaia = 'place_jebarikihaia'
export const place_emanjalake = 'place_emanjalake'
export const place_susuman = 'place_susuman'
export const place_lenskiestolbi = 'place_lenskiestolbi'
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
export const infra_timpton = 'infra_timpton'
export const infra_scir = 'infra_scir'

export const sankeyNodes = [
    {
        "id": users_lux,
        "label": 'люкс',
        // "color": "rgb(0, 0, 0)",
    },
    {
        "id": users_mass,
        "label": 'массовый туризм',
        // "color": "#cc0000"
    },
    {
        "id": users_nomad,
        "label": 'номады',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": users_group,
        "label": 'организованные группы до 12 человек',
        // "color": "#cc3300"
    },
    {
        "id": users_startup,
        "label": 'стартаперы',
        "color": "#ff6600"
    },
    {
        "id": users_academtour,
        "label": 'академические туры',
        "color": "rgb(0, 255, 255)"
    },
    {
        "id": users_researchers,
        "label": 'исследователи',
        "color": "rgb(0, 255, 255)"
    },
    {
        "id": topic_eco,
        "label": 'первозданная природа',
        "color": "#ccff66"
    },
    {
        "id": topic_gulag,
        "label": 'история современности',
        "color": "#4d9cc4"
    },
    {
        "id": topic_oym,
        "label": 'социальная культура в экстремальных условиях',
        "color": "#ff99cc"
    },

    {
        "id": season_w,
        "label": 'зима',
        // "color": "rgb(0, 255, 255)"
    },
    {
        "id": season_s,
        "label": 'лето',
        // "color": "#ffff90"
    },
    {
        "id": season_m,
        "label": 'межсезонье',
        // "color": "#ff7f00"
    },

    {
        "id": infra_zeppelin,
        "label": 'дирижабль',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": infra_volgobus,
        "label": 'snowbus',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": infra_drone,
        "label": 'аэродрон',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": infra_cargo_drone,
        "label": 'грузовой коптер',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": infra_cert,
        "label": infra_cert,
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": infra_plane,
        "label": 'малая авиация',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": infra_unit,
        "label": 'жилой модуль',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": infra_suit,
        "label": 'спальный модуль',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": infra_shelter,
        "label": '"спасательный" модуль',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": infra_camp,
        "label": 'хозмодуль для глэмпинга',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": infra_hom,
        "label": 'резиденция',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": infra_guest,
        "label": 'гостевой дом',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": infra_infobox,
        "label": 'инфобокс',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": infra_office,
        "label": 'проектный офис',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": infra_bukhanka,
        "label": 'буханка',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": infra_roads,
        "label": 'дороги',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": infra_kayak,
        "label": infra_kayak,
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": infra_horse,
        "label": 'животноводческие фермы',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": infra_dog,
        "label": infra_dog,
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": infra_hotel,
        "label": 'гостиница',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": infra_palatka,
        "label": 'палатка',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": infra_scc,
        "label": 'социально-культурный центр',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": infra_timpton,
        "label": 'демонстрационный дом',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": infra_scir,
        "label": 'научная резиденция',
        "color": "rgb(0, 255, 255)"
    },
    {
        "id": place_oymyakon,
        "label": 'оймякон',
        "color": "rgb(0, 255, 255)"
    },
    {
        "id": place_hotkey,
        "label": 'теплый ключ',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_shelter,
        "label": '"спасательный" модуль',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_suit,
        "label": 'спальный модуль',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_magadan,
        "label": 'магадан',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_tomtor,
        "label": 'томтор',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_kuranahsala,
        "label": 'куранах-сала',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_drajni,
        "label": 'дражный',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_yuchugey,
        "label": 'ючугей',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_jacklondon_lake,
        "label": 'озеро джека лондона',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_zirianka,
        "label": 'зырянка',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_topolynoe,
        "label": 'тополиное',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_kadikchan,
        "label": 'кадыкчан',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_labinkir,
        "label": 'озеро лабынкыр',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_nelkan,
        "label": 'нелькан',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_yurti_meteo,
        "label": 'метеостанция юрты',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_ustnera,
        "label": 'усть-нера',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_handiga,
        "label": 'хандыга',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_alisardakh_lake,
        "label": 'озеро алысардах',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_karamken,
        "label": 'карамкен',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_oym_kisiliahi,
        "label": 'оймяконские кисиляхи',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_academic_hotkey,
        "label": place_academic_hotkey,
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_olchansky_pereval,
        "label": 'ольчанский перевал',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_ortobalagan,
        "label": 'орто-балаган',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_itik_kuel,
        "label": 'ытык-кюель',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_juchugei,
        "label": 'ючугей',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_honuu,
        "label": 'хонуу',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_momontailake,
        "label": 'озеро момонтай',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_jebarikihaia,
        "label": 'джебарики-хая',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_emanjalake,
        "label": 'озеро эманджа',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_susuman,
        "label": 'сусуман',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": place_lenskiestolbi,
        "label": 'ленские столбы',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": way_moto_1,
        "label": 'мотоцикл',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": way_car_1,
        "label": 'автомобиль',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": way_plane_1,
        "label": 'малая авиация',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": way_boat_1,
        "label": 'каяк',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": way_horse_1,
        "label": 'гужевой транспорт',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": way_zeppelin_2,
        "label": 'дирижабль',
        "color": "rgb(0, 255, 255)"
    },
    {
        "id": way_volgabus_2,
        "label": 'snowbus',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": way_pontoneroad_2,
        "label": 'gjynjyyst ljhjub',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": way_volgabus_noCO_3,
        "label": 'snowbus гибридный',
        // "color": "rgb(0, 0, 0)"
    },
    {
        "id": way_cargodrone_3,
        "label": 'грузовой коптер',
        // "color": "rgb(0, 0, 0)"
    },
]

export const sankeyDataStage1 = {
    nodes: sankeyNodes,
    links: collect([
        [1, [users_group, season_w, topic_gulag, way_car_1, place_topolynoe]],
        [1, [users_group, season_s, topic_gulag, way_car_1, place_topolynoe]],

        [1, [users_group, season_s, topic_gulag, way_car_1, infra_guest, place_hotkey]],
        [1, [users_group, season_m, topic_gulag, way_car_1, infra_guest, place_hotkey]],
        [1, [users_group, season_w, topic_gulag, way_car_1, infra_guest, place_hotkey]],

        [0.6, [users_nomad, season_s, topic_gulag, way_car_1, place_kuranahsala]],
        [0.6, [users_nomad, season_w, topic_gulag, way_car_1, place_kuranahsala]],
        [0.6, [users_nomad, season_m, topic_gulag, way_car_1, place_kuranahsala]],

        [15, [users_mass, season_w, topic_oym, way_plane_1, infra_hotel, place_tomtor]],
        [1, [users_group, season_w, topic_oym, way_plane_1, infra_hotel, place_tomtor]],
        [1, [users_group, season_m, topic_oym, way_plane_1, infra_hotel, place_tomtor]],
        [1, [users_group, season_s, topic_oym, way_plane_1, infra_hotel, place_tomtor]],
        [1, [users_group, season_s, topic_oym, way_plane_1, infra_hotel, place_tomtor]],

        [1, [users_group, season_s, topic_gulag, way_car_1, infra_guest, place_ustnera]],
        [1, [users_group, season_w, topic_gulag, way_car_1, infra_guest, place_ustnera]],

        [1, [users_group, season_w, topic_gulag, way_car_1, infra_hotel, place_handiga]],
        [1, [users_group, season_s, topic_gulag, way_car_1, infra_hotel, place_handiga]],
        [1, [users_group, season_m, topic_gulag, way_car_1, infra_hotel, place_handiga]],
        [15, [users_mass, season_w, topic_gulag, way_car_1, infra_hotel, place_handiga]],

        [1, [users_group, season_w, topic_oym, way_car_1, place_oymyakon]],
        [0.6, [users_nomad, season_w, topic_oym, way_car_1, infra_guest, place_oymyakon]],
        [1, [users_mass, season_w, topic_oym, way_car_1, infra_guest, place_oymyakon]],

        [1, [users_group, season_s, topic_eco, way_boat_1, place_yurti_meteo]],
        [0.6, [users_nomad, season_s, topic_eco, way_boat_1, place_yurti_meteo]],
        [1, [users_group, season_w, topic_eco, way_car_1, place_yurti_meteo]],
        [0.6, [users_nomad, season_w, topic_eco, way_car_1, place_yurti_meteo]],
        [1, [users_group, season_w, topic_oym, way_car_1, place_yurti_meteo]],

        [1, [users_group, season_w, topic_eco, way_horse_1, infra_guest, place_labinkir]],
        [1, [users_group, season_s, topic_eco, way_horse_1, infra_guest, place_labinkir]],
        [1, [users_group, season_m, topic_eco, way_horse_1, infra_guest, place_labinkir]],
        [1, [users_group, season_w, topic_oym, way_horse_1, infra_guest, place_labinkir]],

        [1, [users_group, season_w, topic_eco, way_horse_1, place_alisardakh_lake]],
        [1, [users_group, season_s, topic_eco, way_horse_1, place_alisardakh_lake]],
        [1, [users_group, season_m, topic_eco, way_horse_1, place_alisardakh_lake]],
        [0.6, [users_nomad, season_w, topic_eco, way_horse_1, place_alisardakh_lake]],
        [0.6, [users_nomad, season_s, topic_eco, way_horse_1, place_alisardakh_lake]],
        [0.6, [users_nomad, season_m, topic_eco, way_horse_1, place_alisardakh_lake]],

        [1, [users_lux, season_s, topic_eco, way_plane_1, place_jacklondon_lake]],
        [1, [users_lux, season_w, topic_eco, way_plane_1, place_jacklondon_lake]],
        [1, [users_lux, season_m, topic_eco, way_plane_1, place_jacklondon_lake]],
        [1, [users_lux, season_m, topic_eco, way_car_1, place_jacklondon_lake]],

        [0.6, [users_nomad, season_s, topic_gulag, way_car_1, place_drajni]],
        [0.6, [users_nomad, season_w, topic_gulag, way_car_1, place_drajni]],
        [1, [users_lux, season_w, topic_gulag, way_car_1, place_drajni]],

        [0.6, [users_nomad, season_s, topic_gulag, way_car_1, place_zirianka]],
        [0.6, [users_nomad, season_w, topic_gulag, way_car_1, place_zirianka]],
        [0.6, [users_nomad, season_m, topic_gulag, way_car_1, place_zirianka]],

        [0.6, [users_nomad, season_w, topic_gulag, way_car_1, place_kadikchan]],
        [0.6, [users_nomad, season_s, topic_gulag, way_car_1, place_kadikchan]],
        [0.6, [users_nomad, season_m, topic_gulag, way_car_1, place_kadikchan]],

        [0.6, [users_nomad, season_w, topic_gulag, way_car_1, place_karamken]],
        [0.6, [users_nomad, season_s, topic_gulag, way_car_1, place_karamken]],
        [0.6, [users_nomad, season_m, topic_gulag, way_car_1, place_karamken]],
        [0.6, [users_nomad, season_w, topic_gulag, way_moto_1, place_karamken]],
        [0.6, [users_nomad, season_s, topic_gulag, way_moto_1, place_karamken]],
        [0.6, [users_nomad, season_m, topic_gulag, way_moto_1, place_karamken]],

        [1, [users_group, season_s, topic_eco, way_car_1, place_oym_kisiliahi]],
        [0.6, [users_nomad, season_s, topic_eco, way_moto_1, place_oym_kisiliahi]],

        [1, [users_group, season_w, topic_gulag, way_car_1, place_olchansky_pereval]],
        [1, [users_group, season_s, topic_gulag, way_car_1, place_olchansky_pereval]],
        [1, [users_group, season_m, topic_gulag, way_car_1, place_olchansky_pereval]],

        [1, [users_group, season_s, topic_eco, way_car_1, place_ortobalagan]],
        [1, [users_group, season_w, topic_eco, way_car_1, place_ortobalagan]],
        [1, [users_group, season_m, topic_eco, way_car_1, place_ortobalagan]],
        [0.6, [users_nomad, season_s, topic_eco, way_car_1, place_ortobalagan]],
        [0.6, [users_nomad, season_w, topic_eco, way_car_1, place_ortobalagan]],
        [0.6, [users_nomad, season_m, topic_eco, way_car_1, place_ortobalagan]],
        [0.6, [users_nomad, season_s, topic_eco, way_boat_1, place_ortobalagan]],

        [0.6, [users_nomad, season_m, topic_gulag, way_car_1, place_itik_kuel]],
        [0.6, [users_nomad, season_w, topic_gulag, way_car_1, place_itik_kuel]],
        [0.6, [users_nomad, season_s, topic_gulag, way_car_1, place_itik_kuel]],

        [1, [users_group, season_s, topic_oym, way_car_1, place_juchugei]],
        [1, [users_group, season_w, topic_oym, way_car_1, place_juchugei]],
        [1, [users_lux, season_s, topic_oym, way_car_1, place_juchugei]],
        [1, [users_lux, season_w, topic_oym, way_car_1, place_juchugei]],
        [1, [users_lux, season_m, topic_oym, way_car_1, place_juchugei]],
        [0.6, [users_nomad, season_s, topic_oym, way_car_1, place_juchugei]],
        [0.6, [users_nomad, season_w, topic_oym, way_car_1, place_juchugei]],
    ]),
}

export const sankeyDataStage2 = {
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

        [1, [users_academtour, season_w, topic_eco, way_plane_1, infra_hom, place_honuu]],
        [1, [users_academtour, season_s, topic_eco, way_plane_1, infra_hom, place_honuu]],
        [1, [users_academtour, season_m, topic_eco, way_plane_1, infra_hom, place_honuu]],
        [1, [users_academtour, season_w, topic_eco, way_plane_1, infra_hom, place_honuu]],
        [1, [users_academtour, season_s, topic_eco, way_plane_1, infra_hom, place_honuu]],
        [1, [users_academtour, season_m, topic_eco, way_plane_1, infra_hom, place_honuu]],
        [1, [users_group, season_w, topic_eco, way_plane_1, infra_hom, place_honuu]],
        [1, [users_group, season_s, topic_eco, way_plane_1, infra_hom, place_honuu]],
        [1, [users_group, season_m, topic_eco, way_plane_1, infra_hom, place_honuu]],

    ])
}

export const sankeyDataStage3 = {
    nodes: sankeyNodes,
    links: collect([
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

    ])
}