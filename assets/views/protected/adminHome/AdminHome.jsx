import React from 'react'
import { Link } from 'react-router-dom'
import { axiosInstance } from '../../../middleware/axiosInstance'

const list = [
    "Add new Project",
    "Handle Projects",
    "Add images in Gallery page"
]

const pages = [
  {id:1, name:"New Project", path:"/admin/newProject"},
  {id:2, name:"Projects", path:"/admin/projects"},
  {id:3, name:"Galleries", path:"/admin/galleries"},
]

const AdminHome = () => {
 
  return (
    <div className='admin-home'>
       
        <div className='admin-pages'>
        {pages.map((item,index)=>
              <Link to={item.path}>{item.name}</Link>
            )}
        </div>
          
   
    </div>
  )
}

export default AdminHome