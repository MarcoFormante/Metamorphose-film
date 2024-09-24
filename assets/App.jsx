import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './styles/app.css';
import { axiosInstance } from './api/axiosInstance';
import useEventListener from './hooks/useEventListener';
import Spinner from './components/UI/Spinner/Spinner';
import { useContext } from 'react';
import { CookieContext } from './contexts/CookieProvider';
import PrivacyPolicy from './views/PrivacyPolicy/PrivacyPolicy';

const Header = lazy(() => import('./components/layout/Header/Header'));
const PublicRoutes = lazy(() => import('./Routes/PublicRoutes'));
const PrivateRoutes = lazy(() => import('./Routes/PrivateRoutes'));
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
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const { pathname } = useLocation();
  const helmetContext = {}
  const token = sessionStorage.getItem("token-ad")
  
  const {cookie} = useContext(CookieContext)
  

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


  // useEffect(()=>{
  //   if (!sessionStorage.getItem("reload")) {
  //     sessionStorage.setItem("reload", new Date().getTime());
  //   }
  // },[])


  // const handleFocus = () => {
  //   const lastTime = parseInt(sessionStorage.getItem("reload"), 10);
  //   const currentTime = new Date().getTime();
  //   const diff = currentTime - lastTime;
  //   const twoHours = 1000 * 60 * 60 * 2;
    
  //   if (diff > twoHours) {
  //     sessionStorage.clear();
  //       sessionStorage.setItem("reload", new Date().getTime());
  //       window.location.reload();
  //   }
  // };
  

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

  // useEventListener("focus", window, handleFocus);
  useEventListener("storage", window, eventStorageHandler);

  useEffect(()=>{
    if (sessionStorage.getItem("token-ad") && sessionStorage.getItem("csrfToken")) {
        setIsAuth(true)
        axiosInstance.defaults.headers.post['X-CSRF-Token'] = sessionStorage.getItem("csrfToken")
        axiosInstance.defaults.headers.delete['X-CSRF-Token'] = sessionStorage.getItem("csrfToken")
}},[])




  return (
    <HelmetProvider context={helmetContext}>
    { showPrivacyPolicy &&  <PrivacyPolicy setShowPrivacyPolicy={()=>setShowPrivacyPolicy(false)}/>}
     
       {!cookie && <CookieBanner openPrivacyPolicy={ () => setShowPrivacyPolicy(true)}/>}
      <div className={`app ${headerColor}`} >
        <Header isShowingPages={isShowingPages} setIsShowingPages={setIsShowingPages} headerColor={headerColor} />
        <main className="main">
          <Suspense fallback={<Spinner/>} >
          <Routes>
            <Route path='/*' element={<PublicRoutes cookie={cookie} isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
            <Route path='/admin/*' element={<PrivateRoutes isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
            </Routes>
          </Suspense>
        </main>
      </div>
     
    </HelmetProvider>
  );
}

export default App;





