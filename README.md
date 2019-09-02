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
        { "field": "day", "view": ["select", ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]] },
        { "field": "state", "view": ["select", ["Стоит", "Сидит", "Сидит НПМ", "Движется", "Другое"]] },
        {
            "field": "activity",
            "view": ["select", ["Выпивают", "Едят", "С собакой", "Играют", "Спорт", "Велосипед", "Кафе"]]
        },
        { "field": "weather", "view": ["select", ["Облачно", "Солнце", "Дождь", "Снег"]] },
        { "field": "gender", "view": ["select", ["М", "Ж"]] },
        { "field": "age", "view": ["select", ["Дети", "Молодежь", "Взрослые", "Пенсионеры"]] },
        { "field": "group", "view": ["select", ["Нет", "Другое", "Студенты", "Школьники", "Семья"]] },
        { "field": "groupSize", "view": ["input"] },
        { "field": "comment", "view": ["text"] }
        //{"field": "group", "view": ["switch"]},
    ],
    "markerText": ["select", "weather", "", ["☼", "☁︎", "☂︎", "☸︎"]],
    "markerColor": ["select", "gender", "", ["deeppink", "deepskyblue"]]
    //"filter": ["state", "age"]
}

{
    "editor": [
        { "field": "dateCreated", "view": ["value"] },
        {
            "field": "activity",
            "view": ["select", ["Стоит", "Движется", "Выпивают/Едят", "С собакой", "Играют", "Спорт", "Велосипед", "Кафе"]]
        },
        { "field": "gender", "view": ["select", ["М", "Ж"]] },
        { "field": "age", "view": ["select", ["Дети", "Молодежь", "Взрослые", "Пенсионеры"]] },
        { "field": "group", "view": ["select", ["Нет", "Другое", "Студенты", "Школьники", "Семья"]] },
        { "field": "groupSize", "view": ["input"] },
        { "field": "comment", "view": ["text"] }
    ],
    "markerText": ["fn", "x",
        "return x.properties.groupSize || ''"
    ],
    "markerColor": ["select", "gender", "", ["deepskyblue", "deeppink"]]
}
```

## Links

- [Mapbox expression parser source code](https://github.com/mapbox/mapbox-gl-js/tree/master/src/style-spec/expression)
