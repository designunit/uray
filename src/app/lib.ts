import { ICase } from './types'

export function caseKey(prefix: string, caseValue: string): string {
    return caseValue ? `${prefix}-${caseValue}` : null
}

export function getCaseKeysSet(cases: ICase[]): Set<string> {
    return new Set(cases
        .flatMap(x => [
            caseKey('topic', x.topic),
            caseKey('user', x.user),
            caseKey('season', x.season),
        ])
        .filter(Boolean)
    )
}