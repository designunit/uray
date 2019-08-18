```json
{
    "editor": [
        { "field": "name", "view": ["input"] },
        { "field": "description", "view": ["text"] },
        { "field": "stage", "view": ["select", ["СТАРТОВЫЙ", "ЦЕЛЕВОЕ", "ЕЩЕ"]] }
    ],
    "markerText": ["get", "properties.name"]
}
```


## Links 

- [Mapbox sxpression parser source code](https://github.com/mapbox/mapbox-gl-js/tree/master/src/style-spec/expression)