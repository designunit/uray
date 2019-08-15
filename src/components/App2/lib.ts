import { Feature, Geometry, Point } from 'geojson'
import { isSubset } from '../../lib'
import { getCaseKeys } from '../../app/lib'
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

export function createFeatureCaseFilter(checkedCaseKeys: string[], emptyFeature: boolean): (feature: Feature<Point, IFeatureProperties>) => boolean {
    const checkedCaseKeysSet = new Set(checkedCaseKeys)

    return feature => {
        if (Array.isArray(feature.properties.cases)) {
            if (feature.properties.cases.length === 0) {
                return emptyFeature
            }

            return feature.properties.cases.some(caseItem => {
                const x = new Set(getCaseKeys(caseItem))

                return isSubset(checkedCaseKeysSet, x)
            })
        }

        return emptyFeature
    }
}

export function createFeatureUserFilter<T>(checkedValues: { [name: string]: string[]}): (feature: Feature<Point, T>) => boolean {
    const filterKeys: string[] = Object.keys(checkedValues)
    const notSpecified = true

    return feature => {
        if (filterKeys.length === 0) {
            return notSpecified
        }

        return filterKeys.every(key => {
            const value = feature.properties[key]
            if (!value) {
                return notSpecified
            }
            const checkedValue = checkedValues[key]

            return checkedValue.includes(value)
        })
    }
}
