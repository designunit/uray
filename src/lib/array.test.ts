import { moveItemByIndex, arrayToDomains } from './array'

describe('lib array', () => {
    describe('moveItemByIndex', () => {
        it('should properly swap item with next item', () => {
            const sample = ['q', 'w', 'e', 'r', 't', 'y']
            const result = moveItemByIndex(sample, 2, 1)
            
            expect(result).toEqual(
                ['q', 'w', 'r', 'e', 't', 'y']
            )
        })

        it('should properly swap item with prev item', () => {
            const sample = ['q', 'w', 'e', 'r', 't', 'y']
            const result = moveItemByIndex(sample, 2, -1)
            
            expect(result).toEqual(
                ['q', 'e', 'w', 'r', 't', 'y']
            )
        })
    })
    
    describe('moveItemByIndex', () => {
        it('should properly map items to domains', () => {
            const sample = arrayToDomains(['q', 'w', 'e', 'r', 't', 'y'])
            
            expect(sample).toEqual([
                ['q', 'w'],
                ['w', 'e'],
                ['e', 'r'],
                ['r', 't'],
                ['t', 'y'],
            ])
        })
    })
})