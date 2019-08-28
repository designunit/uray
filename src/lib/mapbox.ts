import { LatLon } from '../app/types'

export function latLonFromTuple(latLng: [number, number]): LatLon {
    return {
        latitude: latLng[1],
        longitude: latLng[0],
    }
}

export function tupleFromLatLon(latLon: LatLon): [number, number] {
    return [latLon.longitude, latLon.latitude]
}
