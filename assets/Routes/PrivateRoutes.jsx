import React, { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';
const NewProject = lazy(() => import('../views/protected/newProject/NewProject'));
const Projects = lazy(() => import('../views/protected/projects/Projects'));
const Galleries = lazy(() => import('../views/protected/galleries/Galleries'));
const AdminHome = lazy(() => import('../views/protected/adminHome/AdminHome'));
const AdminGallery = lazy(() => import('../views/protected/gallery/Gallery'));
const AddImages = lazy(() => import('../views/protected/gallery/addImages/AddImages'));
const ProjectUpdate = lazy(() => import('../views/protected/projects/projectUpdate/ProjectUpdate'));

const PrivateRoutes = ({isAuth,setIsAuth}) => {
  return (
    <Routes>
        <Route  element={<ProtectedRoute isAuth={isAuth} setIsAuth={setIsAuth}/>}>
                <Route path='/home' element={<AdminHome/>}/>
                <Route path='/newproject' element={<NewProject/>}/>
                <Route path='/projects/' element={<Projects/>}/>
                <Route path='/galleries' element={<Galleries/>}/>
                <Route path='/gallery/:name' element={<AdminGallery/>}/>
                <Route path='/gallery/add' element={<AddImages/>}/>
                <Route path='/projects/update' element={<ProjectUpdate/>} />
                <Route path="*"   element={<Navigate to="/admin/home"/>}/>
        </Route>
    </Routes>
  )
}

export default PrivateRoutes