import * as React from 'react'
import { IProjectDefinition } from '../app/types'
import { projectReducer } from '../reducers/projectReducer'
import { updateProject } from '../app/api'

export function useProject(initialState: IProjectDefinition): [IProjectDefinition, React.Dispatch<any>, boolean] {
    const [project, dispatch] = React.useReducer<React.Reducer<IProjectDefinition, any>>(projectReducer, initialState)
    const [updating, setUpdating] = React.useState(false)

    React.useEffect(() => {
        setUpdating(true)
        updateProject(project)
            .then(() => {
                setUpdating(false)
            })
            .catch(() => {
                setUpdating(false)
            })
    }, [project])

    return [project, dispatch, updating]
}