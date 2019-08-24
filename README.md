# [Uray](http://uray.ru) GIS web-application

## Run

### Run database

Install `json-server`

```
npm install -g json-server
```

Run db

```
json-server -d 0 -p 8000 db.json
```

### Run application

Install dependencies

```
npm i
```

Run dev server

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Editor

Cases layer definition

```json
{
    "editor": [
        { "field": "name", "view": ["input"] },
        { "field": "description", "view": ["text"] },
        {
            "field": "cases",
            "view": [
                "select-table",
                [
                    {
                        "field": "topic",
                        "options": [
                            {
                                "name": "Мегамаршрут",
                                "value": "EXT"
                            },
                            {
                                "name": "ГУЛАГ",
                                "value": "GUL"
                            },
                            {
                                "name": "Природный маршрут",
                                "value": "ECO"
                            },
                            {
                                "name": "Местный быт в суровом климате",
                                "value": "OYM"
                            },
                            {
                                "name": "золотодобыча, алмазы",
                                "value": "INDS"
                            }
                        ]
                    },
                    {
                        "field": "user",
                        "options": [
                            {
                                "name": "состоятельные туристы",
                                "value": "LUX"
                            },
                            {
                                "name": "российские туристы",
                                "value": "RUS"
                            },
                            {
                                "name": "иностранные туристы",
                                "value": "EU+JAP"
                            },
                            {
                                "name": "участники пробегов и экспедиций",
                                "value": "SPEC"
                            },
                            {
                                "name": "китайские туристы",
                                "value": "CHINA"
                            },
                            {
                                "name": "самостоятельные путешественники",
                                "value": "SOLO"
                            }
                        ]
                    },
                    {
                        "field": "season",
                        "options": [
                            {
                                "name": "зима",
                                "value": "W"
                            },
                            {
                                "name": "лето",
                                "value": "S"
                            },
                            {
                                "name": "межсезонье",
                                "value": "MID"
                            },
                            {
                                "name": "круглогодично",
                                "value": "A"
                            }
                        ]
                    }
                ]
            ]
        }
    ],
    "filter": "case-filter",
    "markerText": ["get", "properties.cases.length"]
}
```

## Links

- [Mapbox expression parser source code](https://github.com/mapbox/mapbox-gl-js/tree/master/src/style-spec/expression)
