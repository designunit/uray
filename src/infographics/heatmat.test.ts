import { HeatmapBuilder } from './heatmap'

describe('HeatmapBuilder', () => {
    it('should has properly defaults', () => {
        const sample = HeatmapBuilder
            .new()
            .build()

        expect(sample).toEqual({
            type: 'heatmap',
        })
    })

    it('should properly configure with setField', () => {
        const sample = HeatmapBuilder
            .new()
            .setField('Количество')
            .build()

        expect(sample.paint['heatmap-weight'][2][1]).toEqual('Количество')
    })

    it('should properly configure with setRadius', () => {
        const value = Math.random()
        const sample = HeatmapBuilder
            .new()
            .setRadius(value)
            .build()

        expect(sample.paint['heatmap-radius']).toEqual(value)
    })

    it('should properly configure with setMinZoom', () => {
        const value = Math.random()
        const sample = HeatmapBuilder
            .new()
            .setMinZoom(value)
            .build()

        expect(sample.minzoom).toEqual(value)
    })

    it('should properly configure with setMaxZoom', () => {
        const value = Math.random()
        const sample = HeatmapBuilder
            .new()
            .setMaxZoom(value)
            .build()

        expect(sample.maxzoom).toEqual(value)
    })
})
