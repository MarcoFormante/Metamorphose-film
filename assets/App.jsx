import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './styles/app.css';
import Header from './components/layout/Header/Header';
import { axiosInstance } from './api/axiosInstance';
import useEventListener from './hooks/useEventListener';
import ProtectedRoute from './Routes/ProtectedRoute';
import Spinner from './components/UI/Spinner/Spinner';
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
const  PrivacyPolicy = lazy(()=> import('./views/PrivacyPolicy/PrivacyPolicy')); 
import {Cookies} from 'react-cookie-consent';



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
  const c = document.cookie

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
      if (Cookies.get("cookieConsent") === "false") {
          Cookies.remove("cookieConsent");
      }
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



  return (
    <HelmetProvider context={helmetContext}>
      
      <div className={`app ${headerColor}`} >
        <Header isShowingPages={isShowingPages} setIsShowingPages={setIsShowingPages} headerColor={headerColor} />
        <main className="main">
          <Routes>
            <Route exact path="/" element={<Suspense fallback={<Spinner/>}><Home /></Suspense>} />
            <Route path="*"   element={<Navigate to="/"/>}/>
            <Route path="/services" element={<Suspense fallback={<Spinner/>}><Services /></Suspense>} />
            <Route path="/a_propos" element={<Suspense fallback={<Spinner/>}><About /></Suspense>} />
            <Route path="/galerie" element={<Suspense fallback={<Spinner/>}><Gallery /></Suspense>} />
            <Route path="/galerie/:name" element={<Suspense fallback={<Spinner/>}><GalleryImages /></Suspense>} />
            <Route path="projet/:name" element={<Suspense fallback={<Spinner/>}><Project /></Suspense>} />
            <Route path='/login' element={<Suspense><Login isAuth={isAuth} setIsAuth={setIsAuth} /> </Suspense>}/>
            <Route path='/error/:status' element={<Suspense><ErrorHandler/></Suspense>}/>
            <Route path='/privacy-policy' element={<Suspense><PrivacyPolicy/></Suspense>}/>
          
            <Route element={<ProtectedRoute isAuth={isAuth} setIsAuth={setIsAuth}/>}>
                  <Route path='/admin/home' element={<Suspense><AdminHome/></Suspense>}/>
                  <Route path='/admin/newproject' element={<Suspense><NewProject/></Suspense>}/>
                  <Route path='/admin/projects/' element={<Suspense><Projects/></Suspense>}/>
                  <Route path='/admin/galleries' element={<Suspense><Galleries/></Suspense>}/>
                  <Route path='/admin/gallery/:name' element={<Suspense><AdminGallery/></Suspense>}/>
                  <Route path='/admin/gallery/add' element={<Suspense><AddImages/></Suspense>}/>
                  <Route path='/admin/projects/update' element={<Suspense><ProjectUpdate/></Suspense>} />
                  <Route path="admin/*"   element={<Navigate to="/admin/home"/>}/>
            </Route>
            </Routes>
        </main>
      </div>
    </HelmetProvider>
  );
}

export default App;





