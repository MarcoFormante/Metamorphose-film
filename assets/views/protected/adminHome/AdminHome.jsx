import React from 'react'
import { Link } from 'react-router-dom'

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
              <Link key={item.id} to={item.path}>{item.name}</Link>
            )}
        </div>
          
   
    </div>
  )
}

export default AdminHome