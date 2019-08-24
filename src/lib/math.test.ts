import { round } from './math'

describe('lib math', () => {
    describe('round', () => {
        it('should properly trim number', () => {
            const sample = round(147.71239410235, 1000)

            expect(sample).toEqual(147.712)
        })
    })
})