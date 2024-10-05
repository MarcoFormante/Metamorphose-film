import React, { useState } from 'react'
import { createContext } from 'react'

export const ProjectsContext = createContext()

const ProjectsContextProvider = ({children}) => {
    const [contextProjects, setContextProjects ] = useState([])

  return (
    <ProjectsContext.Provider value={{contextProjects,setContextProjects}}>
      {children}
    </ProjectsContext.Provider>
  )
}

export default ProjectsContextProvider