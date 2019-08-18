import { arrayToDomains } from '../lib/array'
import { NivoLink } from '../components/Sankey'

export function collect(transitions: Array<[number, string[]]>): NivoLink[] {
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

// colors from category 10 https://github.com/d3/d3-scale-chromatic/blob/master/src/categorical/category10.js
export const defaultColorSet = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]
