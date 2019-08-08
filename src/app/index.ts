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
    {
        name: 'федеральные маршруты с повышенным комфортом',
        value: 'LUX',
    },
    {
        name: 'Полюс Холода',
        value: 'СOLD',
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
