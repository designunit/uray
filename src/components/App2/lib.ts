import { Feature, Geometry, Point } from 'geojson'
import { isSubset } from '../../lib'
import { getCaseKeysSet, getCaseKeys } from '../../app/lib'
import { IFeatureProperties } from '../../app/types'

export function createFeatureMap<K, T, G extends Geometry = Geometry>(features: Feature<G, T>[], key: (properties: T) => K) {
    return features.reduce(
        (acc, feature) => {
            acc.set(key(feature.properties), feature)
            return acc
        },
        new Map<K, Feature<G, T>>()
    )
}

export function createFeatureFilter(checkedCaseKeys: string[]): (feature: Feature<Point, IFeatureProperties>) => boolean {
    const checkedCaseKeysSet = new Set(checkedCaseKeys)
    
    return feature => {
        return feature.properties.cases.some(caseItem => {
            const x = new Set(getCaseKeys(caseItem))

            return isSubset(checkedCaseKeysSet, x)
        })
    }
}
