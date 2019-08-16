import * as React from 'react'
import { FeatureCollection, Point, Feature } from 'geojson'
import { Marker } from 'react-map-gl'
import { Cluster } from '../Cluster'
import { Pin } from '../MarkerIcon/Pin'
import { ClusterLabel } from '../ClusterLabel';

export interface IClusterLayerProps<T> {
    map: mapboxgl.Map
    features: FeatureCollection<Point, T>
    renderFeature: (feature: Feature<Point, T>) => React.ReactNode,
    radius: number
    minZoom: number
    maxZoom: number
    clusterLabelColor: string
}

export function ClusterLayer<T>(props: IClusterLayerProps<T>) {
    return (
        <Cluster<T>
            map={props.map}
            minZoom={props.minZoom}
            maxZoom={props.maxZoom}
            radius={props.radius}
            extent={512}
            nodeSize={64}
            data={props.features.features}
            // getDataHash={() => favIds.join('')}
            getDataHash={() => ''}
            clusterMap={(props: any) => ({
                // fav: isFavovite(props.id)
            })}
            clusterReduce={(acc, props: any) => {
                // acc.fav = acc.fav | props.fav
            }}

            renderCluster={(cluster) => {
                const clusterId = cluster.properties.cluster_id
                const [longitude, latitude] = cluster.geometry.coordinates
                const clusterSize = cluster.properties.point_count
                // const fav = cluster.properties['fav']
                // const fill = fav ? 'gold' : null

                return (
                    <Marker
                        key={`cluster-${clusterId}`}
                        longitude={longitude}
                        latitude={latitude}
                    >
                        <ClusterLabel
                            label={`${clusterSize}`}
                            fill={props.clusterLabelColor}
                        />
                    </Marker>
                )
            }}

            renderFeature={props.renderFeature}
        />
    )
}