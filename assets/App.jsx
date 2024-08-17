import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useLocation, Outlet, Navigate, useNavigate  } from 'react-router-dom';
import Fallback from './components/UI/Spinner/Spinner';
import { HelmetProvider } from 'react-helmet-async';
import './styles/app.css';

import { Header } from './components/layout/Header/Header';
import { axiosInstance } from './middleware/axiosInstance';


const Home = lazy(() => import('./views/Home/Home'));
const Gallery = lazy(() => import('./views/Gallery/Gallery'));
const About = lazy(() => import('./views/About/About'));
const Services = lazy(() => import('./views/Services/Services'));
const Project = lazy(() => import('./views/Project/Project'));
const Corporate = lazy(() => import('./views/Corporate/Corporate'));
const Tarifs = lazy(() => import('./views/Tarifs/Tarifs'));
const NewProject = lazy(() => import('./views/protected/newProject/NewProject'));
const Projects = lazy(() => import('./views/protected/projects/Projects'));
const Galleries = lazy(() => import('./views/protected/galleries/Galleries'));
const Login = lazy(() => import('./views/Login/Login'));
const AdminHome = lazy(() => import('./views/protected/adminHome/AdminHome'));
const GalleryImages = lazy(() => import('./views/Gallery/GalleryImages'));
const AdminGallery = lazy(() => import('./views/protected/gallery/Gallery'));
const AddImages = lazy(() => import('./views/protected/gallery/addImages/AddImages'));
const ProjectUpdate = lazy(() => import('./views/protected/projects/projectUpdate/ProjectUpdate'));


const colorMap = {
  "/services": "back__orange",
  "/corporate": "back__orange",
  "/tarifs": "back__black",
  "/contact": "back__orange",
  "/a_propos": "back__orange",
  "/galerie": "back__black",
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

  useEffect(() => {
    setHeaderColor(colorMap[pathname] || "");
  }, [pathname]);

  const token = sessionStorage.getItem("token-ad")

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
    console.log("asdasd");
    
    if (sessionStorage.getItem("token-ad") && pathname.includes("admin")) {
      return;
    }
    if (!sessionStorage.getItem("reload")) {
      sessionStorage.setItem("reload", new Date().getTime());
    } else {
      if (!pathname.match(/projet|galerie\//) || !pathname.includes("/")) {
        return;
      }
      const lastTime = parseInt(sessionStorage.getItem("reload"), 10);
      const currentTime = new Date().getTime();
      const diff = currentTime - lastTime;
      const twoHours = 1000 * 4;
      if (diff > twoHours) {
        sessionStorage.clear();
        sessionStorage.setItem("reload", new Date().getTime());
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("focus", ()=>{
      const lastTime = parseInt(sessionStorage.getItem("reload"), 10);
      const currentTime = new Date().getTime();
      const diff = currentTime - lastTime;
      const twoHours = 1000 * 60 * 60 * 2;
      if (diff > twoHours) {
        sessionStorage.clear();
        sessionStorage.setItem("reload", new Date().getTime());
        window.location.reload();
      }
    });

    return () => {
      window.removeEventListener("focus", ()=>{
        const lastTime = parseInt(sessionStorage.getItem("reload"), 10);
        const currentTime = new Date().getTime();
        const diff = currentTime - lastTime;
        const twoHours = 1000 * 60 * 60 * 2;
        if (diff > twoHours) {
          sessionStorage.clear();
          sessionStorage.setItem("reload", new Date().getTime());
          window.location.reload();
        }
      });
  }},[]);




  
  useEffect(()=>{
    window.addEventListener("storage",eventStorageHandler)

   return () => window.removeEventListener("storage",eventStorageHandler)
   
    function eventStorageHandler(){
      if (sessionStorage.getItem("token-ad")) {
        setIsAuth(false)
        sessionStorage.removeItem("token-ad")
        sessionStorage.removeItem("csrfToken")
        axiosInstance.defaults.headers.common = {}
        axiosInstance.defaults.headers.post['X-CSRF-Token'] = ""
        axiosInstance.defaults.headers.delete['X-CSRF-Token'] = ""
      }
    }
  },[])

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
          <Route exact path="/" element={<Suspense fallback={<Fallback/>}><Home /></Suspense>} />
          <Route path="*"   element={<Navigate to="/"/>}/>
          <Route path="/corporate" element={<Suspense fallback={<Fallback/>}><Corporate /></Suspense>} />
          <Route path="/tarifs" element={<Suspense fallback={<Fallback/>}><Tarifs /></Suspense>} />
          <Route path="/services" element={<Suspense fallback={<Fallback/>}><Services /></Suspense>} />
          <Route path="/a_propos" element={<Suspense fallback={<Fallback/>}><About /></Suspense>} />
          <Route path="/galerie" element={<Suspense fallback={<Fallback/>}><Gallery /></Suspense>} />
          <Route path="/galerie/:name" element={<Suspense fallback={<Fallback/>}><GalleryImages /></Suspense>} />
          <Route path="projet/:name" element={<Suspense fallback={<Fallback/>}><Project /></Suspense>} />
          <Route path='/login' element={<Suspense><Login isAuth={isAuth} setIsAuth={setIsAuth} /> </Suspense>}/>
        
        
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







const ProtectedRoute = ({isAuth,setIsAuth})=>{
  const navigate = useNavigate()
  const logout = ()=>{
    delete axiosInstance.defaults.headers.common['Authorization']
    sessionStorage.clear()
    navigate("/")
    setIsAuth(false)
  }

  const back = ()=>{
    window.history.back()
  }

  if (isAuth) {
      return (
        <div>
          <span className='logout-btn' onClick={logout}>Logout</span>
          <span className='back-btn' onClick={back}>Back</span>
            <Outlet/>
        </div>
        
      )
  }else{
      return <Navigate to="/login"/>
  }
}