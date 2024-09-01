import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../api/axiosInstance';
import {  Link } from 'react-router-dom'
import { Draggable } from "react-drag-reorder";
import Fallback from '../../../components/UI/Spinner/Spinner';
import {purifyProjects} from '../../../security/Dompurify/purify'
import {z} from 'zod'


const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
 
//GET PROJECTS
  useEffect(()=>{
    axiosInstance.get('admin/projects')
    .then(res => {
      if (res.status === 200) {
        if (res.data.projects) {
          const purifiedProjects = purifyProjects(res.data.projects)
          setProjects(purifiedProjects)
        }
      }
    }).catch(err => {
      console.log(err)
    }).finally(()=> setLoading(false))
  },[])


//REORDER PROJECTS
  const PosChange = (currPos,newPos) => {
    if (currPos === newPos) {
      return
    }
  //VALIDATE Values
  const firstPos = z.string().safeParse(projects[currPos].id)
  const secondPos = z.string().safeParse(projects[newPos].id)
  if (!firstPos.success || !secondPos.success) {
    alert("An error occured during reordering")
    window.location.reload()
    return
  }
  const scrollY = window.scrollY
  setLoading(true)
  const formdata = new FormData()
  formdata.append("currId",firstPos.data)
  formdata.append("newId",secondPos.data)
  axiosInstance.post('admin/projects/reorder',formdata)
  .then(res => {
    if (res.status !== 200) {
      alert("An error occured during reordering")
      setLoading(false)
      window.location.reload()
    }else{
      let newProjects = [...projects]
      const first = newProjects[currPos]
      const second = newProjects[newPos]
      projects[currPos] = second
      projects[newPos] = first
      setProjects([...projects])
      setLoading(false)
      setTimeout(()=>{
        window.scrollTo(0, scrollY);
      },500)
    }
  }).catch(err => {
    console.log(err)
    setLoading(false)
    alert("An error occured during reordering")
    window.location.reload()
  });
  
}

  return (
    <div className='ad-projects'>
      <h1>Projects</h1>
     { loading &&  <Fallback/>}
      <ul>
       { projects.length > 0 && !loading && 
       <Draggable onPosChange={PosChange}>
        {projects.map((project,i) => {
        return (
          <li key={project.id} data-index={i} className={`project_${project.isActive ? "active" : "inactive"}`}>
            <Link to={"update"} state={project.id}>{project.name}</Link>
            </li>
        )}
        )}
         </Draggable>
         }
      </ul>
    </div>
  )
}

export default Projects