import { ICase } from './types'
import { userOptions, topicOptions, seasonOptions } from './'

export function treeKey(prefix: string, value: string): string {
    return `${prefix}-${value}`
}

export function caseKey(prefix: string, caseValue: string): string {
    return treeKey(prefix, caseValue)
}

export function getCaseKeysSet(cases: ICase[]): Set<string> {
    return new Set(cases
        .flatMap(x => [
            caseKey('topic', x.topic),
            caseKey('user', x.user),
            caseKey('season', x.season),
        ])
    )
}

export function getCaseKeys(caseItem: ICase): string[] {
    return [
        caseKey('topic', caseItem.topic),
        caseKey('user', caseItem.user),
        caseKey('season', caseItem.season),
    ].filter(Boolean)
}

export function createDefaultCase(): ICase {
    const id = Date.now()

    return {
        id,
        topic: topicOptions[0].value,
        user: userOptions[0].value,
        season: seasonOptions[0].value,
    }
}
