import * as React from 'react'
import Supercluster, { ClusterFeature } from 'supercluster'
import { Feature, Point } from 'geojson'

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

    renderCluster: <T>(feature: ClusterFeature<T>) => React.ReactNode,
    renderFeature: (feature: Feature) => React.ReactNode,
    data: Feature<Point, {url: string}>[]
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

        cluster.load(props.data);
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
                return this.props.renderCluster(cluster)
            }

            return this.props.renderFeature(cluster)
        })
    }
}
