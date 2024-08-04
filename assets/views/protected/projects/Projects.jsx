import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../middleware/axiosInstance'
import {  Link } from 'react-router-dom'

const Projects = () => {
  const [projects, setProjects] = useState([])

  useEffect(()=>{
    axiosInstance.get('projects')
    .then(res => {
      if (res.status === 200) {
        if (res.data.projects) setProjects(res.data.projects)
      }
    }).catch(err => {
      console.log(err)
    })
  },[])


  return (
    <div className='ad-projects'>
      <h1>Projects</h1>
      <ul>
        {projects.map(project => 
          <li key={project.id} className={`project_${project.isActive ? "active" : "inactive"}`}>
            <Link to={"update"} state={project}>{project.name}</Link>
            </li>
        )}
      </ul>
    </div>
  )
}

export default Projects