import { treeKey } from './lib'

describe('app lib', () => {
    describe('treeKey', () => {
        it('should create key based on input values', () => {
            expect(treeKey('prefix', 'value')).toEqual(
                'prefix-value',
            )
        })
    })
})
