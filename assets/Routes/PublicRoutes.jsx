import { Navigate, Route, Routes } from 'react-router-dom'
import React, { lazy} from 'react';
import ProjectsContextProvider from '../contexts/ProjectsContext';
import ServicesVideoTrailer from '../views/Services/ServiceVideoTrailer/ServicesVideoTrailer';

const Home = lazy(() => import('../views/Home/Home'));
const Services = lazy(() => import('../views/Services/Services'));
const About = lazy(() => import('../views/About/About'));
const Gallery = lazy(() => import('../views/Gallery/Gallery'));
const GalleryImages = lazy(() => import('../views/Gallery/GalleryImages'));
const Project = lazy(() => import('../views/Project/Project'));
const Login = lazy(() => import('../views/Login/Login'));
const ErrorHandler = lazy(() => import('../views/ErrorHandler/ErrorHandler'));

const PublicRoutes = ({cookie,isAuth,setIsAuth}) => {
  return (
    <ProjectsContextProvider> 
      <Routes>
          <Route exact path="/" element={<Home /> }/>
          <Route path="*" element={<Navigate to="/error/404"/>}/>
          <Route path="/services" element={<Services />} />
          <Route path="/services/:name" element={<ServicesVideoTrailer />} />
          <Route path="/a_propos" element={<About />} />
          <Route path="/galerie" element={<Gallery />} />
          <Route path="/galerie/:name" element={<GalleryImages />} />
          <Route path="projet/:name" element={<Project cookie={cookie} />} />
          <Route path='/login' element={<Login isAuth={isAuth} setIsAuth={setIsAuth} /> }/>
          <Route path='/error/:status' element={<ErrorHandler/>}/>
      </Routes>
    </ProjectsContextProvider>
  )
}

export default PublicRoutes