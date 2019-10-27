import * as React from 'react'

import axios from 'axios'
import { useRequest } from 'use-request-hook'

import lowdb from 'lowdb'
import Memory from 'lowdb/adapters/Memory'
import { IProjectDefinition } from '../app/types'

const loadDb = async () => {
    const res = await axios.get('/static/data.json')

    return res.data
}

export function useData(): [boolean, { project: IProjectDefinition, layers: any[], features: any[] }] {
    const { isLoading, data } = useRequest(loadDb, {})
    const [project, setProject] = React.useState<IProjectDefinition | undefined>(null)
    const [layers, setLayers] = React.useState([])
    const [features, setFeatures] = React.useState([])

    React.useEffect(() => {
        if (isLoading) {
            return
        }

        const m = new (Memory as any)()
        const low = lowdb(m) as any
        low.setState(data)

        setLayers(low.get('layers').value())

        const projects = low.get('projects').value()
        setProject(projects[0])

        const featureValues = low.get('features').value()
        setFeatures(featureValues.map(x => x.feature))
    }, [isLoading])

    return [isLoading, {
        project,
        layers,
        features,
    }]
}
