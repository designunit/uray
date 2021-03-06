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

```
PORT=8000 DB_PATH="../db.json" npm start
```

```
docker run --rm --name uray-server -p 8000:3000 -v $PWD/db.json:/data/db.json tmshv/uray-server
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

Uray layer definitions

```json
{
    "editor": [
        { "field": "day", "view": ["select", [
            "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс",
        ]] },
        { "field": "state", "view": ["select", [
            "Стоит", "Сидит", "Сидит НПМ", "Движется", "Другое",
        ]] },
        { "field": "activity", "view": ["select", [
            "Выпивают", "Едят", "С собакой", "Играют", "Спорт", "Велосипед", "Кафе",
        ]] },
        { "field": "weather", "view": ["select", [
            "Облачно", "Солнце", "Дождь", "Снег",
        ]] },
        { "field": "gender", "view": ["select", [
            "М", "Ж",
        ]] },
        { "field": "age", "view": ["select", [
            "Дети", "Молодежь", "Взрослые", "Пенсионеры",
        ]] },
        { "field": "group", "view": ["select", [
            "Нет", "Другое", "Студенты", "Школьники", "Семья",
        ]] },
        { "field": "groupSize", "view": ["input"] },
        { "field": "comment", "view": ["text"] },
    ],
    "markerText": ["select", "weather", "", ["☼", "☁︎", "☂︎", "☸︎"]],
    "markerColor": ["select", "gender", "", ["deeppink", "deepskyblue"]]
    //"filter": ["state", "age"]
}
```

```json
{
    "editor": [
        { "field": "dateCreated", "view": ["value"] },
        {
            "field": "activity",
            "view": ["select", [
                "Стоит", "Движется", "Выпивают/Едят", "С собакой", "Играют", "Спорт", "Велосипед", "Кафе",
            ]]
        },
        { "field": "gender", "view": ["select", [
            "М", "Ж",
        ]] },
        { "field": "age", "view": ["select", [
            "Дети", "Молодежь", "Взрослые", "Пенсионеры",
        ]] },
        { "field": "group", "view": ["select", [
            "Нет", "Другое", "Студенты", "Школьники", "Семья",
        ]] },
        { "field": "groupSize", "view": ["input"] },
        { "field": "comment", "view": ["text"] },
    ],
    "markerText": ["fn", "x",
        "return x.properties.groupSize || ''"
    ],
    "markerColor": ["select", "gender", "", ["deepskyblue", "deeppink"]]
}
```

## Links

- [d3-cloud](https://github.com/jasondavies/d3-cloud)
- [Mapbox expression parser source code](https://github.com/mapbox/mapbox-gl-js/tree/master/src/style-spec/expression)
