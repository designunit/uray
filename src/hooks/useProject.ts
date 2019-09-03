import * as React from 'react'
import equal from 'fast-deep-equal'
import { IProjectDefinition } from '../app/types'
import { projectReducer } from '../reducers/projectReducer'
import { updateProject } from '../app/api'

export function useProject(initialState: IProjectDefinition): [IProjectDefinition, React.Dispatch<any>, boolean] {
    const [project, dispatch] = React.useReducer<React.Reducer<IProjectDefinition, any>>(projectReducer, initialState)
    const [updating, setUpdating] = React.useState(false)
    const projectRef = React.useRef(initialState)

    React.useEffect(() => {
        if (equal(projectRef.current, project)) {
            return
        }

        setUpdating(true)
        updateProject(project)
            .then((newProject) => {
                projectRef.current = newProject
                setUpdating(false)
            })
            .catch(() => {
                setUpdating(false)
            })
    }, [project])

    return [project, dispatch, updating]
}