import React from 'react'
import { Link } from 'react-router-dom'

const pages = [
  {id:1, name:"Nouveau Projet", path:"/admin/newProject"},
  {id:2, name:"Projets", path:"/admin/projects"},
  {id:3, name:"Galeries", path:"/admin/galleries"},
]

const AdminHome = () => {
 
  return (
    <div className='admin-home'>
        <div className='admin-pages'>
        {pages.map((item)=>
              <Link key={item.id} to={item.path}>{item.name}</Link>
            )}
        </div>
          
   
    </div>
  )
}

export default AdminHome