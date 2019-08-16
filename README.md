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
