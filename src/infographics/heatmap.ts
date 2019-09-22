export class HeatmapBuilder {
    public static new() {
        return new HeatmapBuilder()
    }

    private field: string
    private radius: number
    private minZoom: number
    private maxZoom: number

    public setField(value: string) {
        this.field = value

        return this
    }

    public setRadius(value: number) {
        this.radius = value

        return this
    }

    public setMinZoom(value: number) {
        this.minZoom = value

        return this
    }

    public setMaxZoom(value: number) {
        this.maxZoom = value

        return this
    }

    public build(): any {
        const weight = !this.field ? null : (
            ['interpolate', ['linear'], ['get', this.field],
                0, 0,
                11, 1,
            ]
        )

        const conf: any = {
            type: 'heatmap',
        }

        if (this.minZoom) {
            conf.minzoom = this.minZoom
        }

        if (this.maxZoom) {
            conf.maxzoom = this.maxZoom
        }

        if (weight) {
            conf.paint = {
                // Increase the heatmap weight based on frequency and property magnitude
                'heatmap-weight': ['interpolate', ['linear'], ['get', this.field],
                    0, 0,
                    11, 1,
                ],
                // Increase the heatmap color weight weight by zoom level
                // heatmap-intensity is a multiplier on top of heatmap-weight
                // 'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, MAX_ZOOM_LEVEL, 3],
                // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                // Begin color ramp at 0-stop with a 0-transparancy color
                // to create a blur-like effect.
                // 'heatmap-color': [
                //     'interpolate',
                //     ['linear'],
                //     ['heatmap-density'],
                //     0,
                //     'rgba(33,102,172,0)',
                //     0.2,
                //     'rgb(103,169,207)',
                //     0.4,
                //     'rgb(209,229,240)',
                //     0.6,
                //     'rgb(253,219,199)',
                //     0.8,
                //     'rgb(239,138,98)',
                //     0.9,
                //     'rgb(255,201,101)',
                // ],
                // Transition from heatmap to circle layer by zoom level
                // 'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0],
            }
        }

        return this.mergePaint(conf)
    }

    private mergePaint(conf) {
        // 'heatmap-radius': ['interpolate', ['linear'], ['zoom'],
        //     0, 2,
        //     MAX_ZOOM_LEVEL, 20,
        // ],

        if (this.radius) {
            return {
                ...conf,
                paint: {
                    ...conf.paint,
                    'heatmap-radius': this.radius,
                },
            }
        }

        return conf
    }
}
