import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../middleware/axiosInstance'
import {  Link } from 'react-router-dom'
import { Draggable } from "react-drag-reorder";
import Fallback from '../../../components/Spinner/Fallback';


const Projects = () => {
  const [projects, setProjects] = useState([])
 const [loading, setLoading] = useState(false)
 

  useEffect(()=>{
    axiosInstance.get('admin/projects')
    .then(res => {
      if (res.status === 200) {
        if (res.data.projects) {
          setProjects(res.data.projects)
        }
      }
    }).catch(err => {
      console.log(err)
    }).finally(()=> setLoading(false))
  },[])

const PosChange = (currPos,newPos) => {
  setLoading(true)
  let newProjects = [...projects]
  let project = newProjects.splice(currPos,1)
  let projectID = project[0].id
  let secondProjectID = projects[newPos].id
  newProjects.splice(newPos,0,...project)
  setProjects(newProjects)
  const formdata = new FormData()
  formdata.append("currId",projectID)
  formdata.append("newId",secondProjectID)
  axiosInstance.post('admin/projects/reorder',formdata)
  .then(res => {
    if (res.status !== 200) {
      alert("An error occured during reordering")
      window.location.reload()
    }
  }).catch(err => {
    console.log(err)
    alert("An error occured during reordering")
    window.location.reload()
  });
  setLoading(false)
}

  return (
    <div className='ad-projects'>
      <h1>Projects</h1>
     { loading &&  <Fallback/>}
      <ul>
       { projects.length > 0 && 
       <Draggable onPosChange={PosChange}>
        {projects.map((project,i) => {
        return (
          <li key={project.id} data-index={i} className={`project_${project.isActive ? "active" : "inactive"}`}>
            <Link to={"update"} state={project.id}>{project.name}</Link>
            </li>
        )}
        )}
         </Draggable>}


      </ul>
    </div>
  )
}

export default Projects