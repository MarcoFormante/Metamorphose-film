import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './styles/app.css';
import Header from './components/layout/Header/Header';
import { axiosInstance } from './api/axiosInstance';
import useEventListener from './hooks/useEventListener';
import ProtectedRoute from './Routes/ProtectedRoute';
import Spinner from './components/UI/Spinner/Spinner';
import { useContext } from 'react';
import { CookieContext } from './contexts/CookieProvider';

const Home = lazy(() => import('./views/Home/Home'));
const Gallery = lazy(() => import('./views/Gallery/Gallery'));
const About = lazy(() => import('./views/About/About'));
const Services = lazy(() => import('./views/Services/Services'));
const Project = lazy(() => import('./views/Project/Project'));
const NewProject = lazy(() => import('./views/protected/newProject/NewProject'));
const Projects = lazy(() => import('./views/protected/projects/Projects'));
const Galleries = lazy(() => import('./views/protected/galleries/Galleries'));
const Login = lazy(() => import('./views/Login/Login'));
const AdminHome = lazy(() => import('./views/protected/adminHome/AdminHome'));
const GalleryImages = lazy(() => import('./views/Gallery/GalleryImages'));
const AdminGallery = lazy(() => import('./views/protected/gallery/Gallery'));
const AddImages = lazy(() => import('./views/protected/gallery/addImages/AddImages'));
const ProjectUpdate = lazy(() => import('./views/protected/projects/projectUpdate/ProjectUpdate'));
const ErrorHandler = lazy(()=> import('./views/ErrorHandler/ErrorHandler'));
const PrivacyPolicy = lazy(()=> import('./views/PrivacyPolicy/PrivacyPolicy')); 
const CookieBanner = lazy(()=> import('./components/common/CookieBanner/CookieBanner'));



const colorMap = {
  "/services": "back__orange",
  "/corporate": "back__orange",
  "/contact": "back__orange",
  "/a_propos": "back__black",
  "/galerie": "back__black",
  "/error/202": "back__orange",
};

/**
 * 
 * App component
 * 
 */

function App() {
  const [isShowingPages, setIsShowingPages] = useState(false);
  const [isAuth, setIsAuth] = useState(sessionStorage.getItem("token-ad"));
  const [headerColor, setHeaderColor] = useState("");
  const { pathname } = useLocation();
  const helmetContext = {}
  const token = sessionStorage.getItem("token-ad")
  const {cookie,setCookie} = useContext(CookieContext)
  
  

  useEffect(() => {
    if (pathname.includes("/error")) {
        setHeaderColor("back__orange" || "");
    }else{
      setHeaderColor(colorMap[pathname] || "");
    }
  }, [pathname]);


  useEffect(()=>{
    if (token) {
      setIsAuth(true)
    axiosInstance.defaults.headers.common = {
      'Authorization': 'Bearer ' + token
    }
  };
  },[token])


  useEffect(()=>{
    if (!sessionStorage.getItem("reload")) {
      sessionStorage.setItem("reload", new Date().getTime());
    }
  },[])


  const handleFocus = () => {
    const lastTime = parseInt(sessionStorage.getItem("reload"), 10);
    const currentTime = new Date().getTime();
    const diff = currentTime - lastTime;
    const twoHours = 1000 * 60 * 60 * 2;
    
    if (diff > twoHours) {
      sessionStorage.clear();
        sessionStorage.setItem("reload", new Date().getTime());
        window.location.reload();
    }
  };
  

  const eventStorageHandler = ()=>{
    if (sessionStorage.getItem("token-ad")) {
      setIsAuth(false)
      sessionStorage.removeItem("token-ad")
      sessionStorage.removeItem("csrfToken")
      axiosInstance.defaults.headers.common = {}
      axiosInstance.defaults.headers.post['X-CSRF-Token'] = ""
      axiosInstance.defaults.headers.delete['X-CSRF-Token'] = ""
    }
  }

  useEventListener("focus", window, handleFocus);
  useEventListener("storage", window, eventStorageHandler);

  useEffect(()=>{
    if (sessionStorage.getItem("token-ad") && sessionStorage.getItem("csrfToken")) {
        setIsAuth(true)
        axiosInstance.defaults.headers.post['X-CSRF-Token'] = sessionStorage.getItem("csrfToken")
        axiosInstance.defaults.headers.delete['X-CSRF-Token'] = sessionStorage.getItem("csrfToken")
}},[])


function handleCookie(){
setCookie(true)
}



  return (
    <HelmetProvider context={helmetContext}>
       {!cookie && <CookieBanner/>}
      <div className={`app ${headerColor}`} >
        <Header isShowingPages={isShowingPages} setIsShowingPages={setIsShowingPages} headerColor={headerColor} />
        <main className="main">
          <Suspense fallback={<Spinner/>} >
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/"/>}/>
            <Route path="/services" element={<Services />} />
            <Route path="/a_propos" element={<About />} />
            <Route path="/galerie" element={<Gallery />} />
            <Route path="/galerie/:name" element={<GalleryImages />} />
            <Route path="projet/:name" element={<Project cookie={cookie} />} />
            <Route path='/login' element={<Login isAuth={isAuth} setIsAuth={setIsAuth} /> }/>
            <Route path='/error/:status' element={<ErrorHandler/>}/>
            <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
          
            <Route element={<ProtectedRoute isAuth={isAuth} setIsAuth={setIsAuth}/>}>
                  <Route path='/admin/home' element={<AdminHome/>}/>
                  <Route path='/admin/newproject' element={<NewProject/>}/>
                  <Route path='/admin/projects/' element={<Projects/>}/>
                  <Route path='/admin/galleries' element={<Galleries/>}/>
                  <Route path='/admin/gallery/:name' element={<AdminGallery/>}/>
                  <Route path='/admin/gallery/add' element={<AddImages/>}/>
                  <Route path='/admin/projects/update' element={<ProjectUpdate/>} />
                  <Route path="admin/*"   element={<Navigate to="/admin/home"/>}/>
            </Route>
            </Routes>
          </Suspense>
        </main>
      </div>
     
    </HelmetProvider>
  );
}

export default App;





