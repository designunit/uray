import * as React from 'react'
import Supercluster from 'supercluster'
import { Marker } from 'react-map-gl'
import { Circle } from '../MarkerIcon/Circle'
import { ClusterLabel } from './ClusterLabel';

export interface IClusterState {
    clusters: Array<Supercluster.ClusterFeature<any> | Supercluster.PointFeature<any>>
}

export interface IClusterProps {
    /** Mapbox map object */
    map: mapboxgl.Map,

    /** Minimum zoom level at which clusters are generated */
    minZoom: number,

    /** Maximum zoom level at which clusters are generated */
    maxZoom: number,

    /** Cluster radius, in pixels */
    radius: number,

    /** (Tiles) Tile extent. Radius is calculated relative to this value */
    extent: number,

    /** Size of the KD-tree leaf node. Affects performance */
    nodeSize: number,

    /** ReactDOM element to use as a marker */
    // element: () => React.ReactNode,
    // element: any,

    /**
     * Callback that is called with the supercluster instance as an argument
     * after componentDidMount
     */
    /* eslint-disable react/no-unused-prop-types */
    // innerRef: () => void,
    /* eslint-enable react/no-unused-prop-types */

    /** Markers as children */
    renderFeature: (x: any) => React.ReactNode,
    data: any[]
}

export class Cluster extends React.Component<IClusterProps, IClusterState> {
    private cluster: Supercluster

    constructor(props) {
        super(props);

        this.state = {
            clusters: [],
        };
    }

    componentDidMount() {
        this.createCluster(this.props);
        this.recalculate();

        this.props.map.on('moveend', this.recalculate);
    }

    componentWillReceiveProps(newProps) {
        const shouldUpdate =
            newProps.data !== this.props.data ||
            newProps.minZoom !== this.props.minZoom ||
            newProps.maxZoom !== this.props.maxZoom ||
            newProps.radius !== this.props.radius ||
            newProps.extent !== this.props.extent ||
            newProps.nodeSize !== this.props.nodeSize
            // ||
            // !shallowCompareChildren(this.props.children, newProps.children);

        if (shouldUpdate) {
            this.createCluster(newProps);
            this.recalculate();
        }
    }

    createCluster = (props: IClusterProps) => {
        const {
            minZoom,
            maxZoom,
            radius,
            extent,
            nodeSize,
            // innerRef,
        } = props
        const cluster = new Supercluster({
            minZoom,
            maxZoom,
            radius,
            extent,
            nodeSize,
        })

        cluster.load(props.data['features']);
        this.cluster = cluster;
        // if (innerRef) innerRef(this.cluster);
    }

    recalculate = () => {
        const zoom = this.props.map.getZoom()
        const bounds = this.props.map.getBounds().toArray()
        const bbox: any = bounds[0].concat(bounds[1])
        const clusters = this.cluster.getClusters(bbox, Math.floor(zoom))

        this.setState({
            clusters,
        })
    }

    render() {
        return this.state.clusters.map(cluster => {
            if (cluster.properties.cluster) {
                const [longitude, latitude] = cluster.geometry.coordinates
                const clusterSize = cluster.properties.point_count

                return (
                    <Marker
                        key={`cluster-${cluster.properties.cluster_id}`}
                        longitude={longitude}
                        latitude={latitude}
                    >
                        <ClusterLabel
                            label={`${clusterSize}`}
                        />
                    </Marker>
                )
            }

            return this.props.renderFeature(cluster)
        })
    }
}
