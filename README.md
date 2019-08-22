# Oymyakon

## Run

### Run database

Install `json-server`

```
npm install -g json-server
```

Run db

```
json-server -d 0 -p 8000 https://raw.githubusercontent.com/designunit/oymyakon-data/master/db.json
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