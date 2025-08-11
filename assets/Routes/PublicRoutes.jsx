import { Navigate, Route, Routes } from 'react-router-dom'
import React, { lazy, Suspense} from 'react';
import ProjectsContextProvider from '../contexts/ProjectsContext';

const Home = lazy(() => import('../views/Home/Home'));
const Services = lazy(() => import('../views/Services/Services'));
const About = lazy(() => import('../views/About/About'));
const Gallery = lazy(() => import('../views/Gallery/Gallery'));
const GalleryImages = lazy(() => import('../views/Gallery/GalleryImages'));
const Project = lazy(() => import('../views/Project/Project'));
const Login = lazy(() => import('../views/Login/Login'));
const ErrorHandler = lazy(() => import('../views/ErrorHandler/ErrorHandler'));
const PrivacyPolicy = lazy(() => import('../views/PrivacyPolicy/PrivacyPolicy'));
const ServicesVideoTrailer = lazy(() => import('../views/Services/ServiceVideoTrailer/ServicesVideoTrailer'));

const PublicRoutes = ({isAuth,setIsAuth}) => {
  return (
    <ProjectsContextProvider>
      <Suspense fallback={null}>
      <Routes>
          <Route exact path="/" element={<Home /> }/>
          <Route exact path="/privacy-policy" element={<PrivacyPolicy/> }/>
          <Route path="*" element={<Navigate to="/error/404"/>}/>
          <Route path="/services" element={<Services />} />
          <Route path="/services/:name" element={<ServicesVideoTrailer />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/galerie" element={<Gallery />} />
          <Route path="/galerie/:name" element={<GalleryImages />} />
          <Route path="projet/:name" element={<Project />} />
          <Route path='/login' element={<Login isAuth={isAuth} setIsAuth={setIsAuth} /> }/>
          <Route path='/error/:status' element={<ErrorHandler/>}/>
      </Routes>
      </Suspense>
    
    </ProjectsContextProvider>
  )
}

export default PublicRoutes


