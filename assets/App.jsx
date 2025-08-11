import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, useLocation} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './styles/app.css';
import { axiosInstance } from './api/axiosInstance';
import useEventListener from './hooks/useEventListener';
import Spinner from './components/UI/Spinner/Spinner';
import { useContext } from 'react';
import { CookieContext } from './contexts/CookieProvider';
import useCookie from './hooks/useCookie';

const Header = lazy(() => import('./components/layout/Header/Header'));
const PublicRoutes = lazy(() => import('./Routes/PublicRoutes'));
const PrivateRoutes = lazy(() => import('./Routes/PrivateRoutes'));
const CookieBanner = lazy(()=> import('./components/common/CookieBanner/CookieBanner'));


/**
 * 
 * App component
 * 
 */

function App() {
  const [isShowingPages, setIsShowingPages] = useState(false);
  const [isAuth, setIsAuth] = useState(sessionStorage.getItem("token-ad"));
  const helmetContext = {}
  const token = sessionStorage.getItem("token-ad")
  const {setOpenBanner,openBanner} = useContext(CookieContext)


  useEffect(()=>{
    if (token) {
      setIsAuth(true)
      axiosInstance.defaults.headers.common = {
      'Authorization': 'Bearer ' + token
    }
  };
  },[token])



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

  useEventListener("storage", window, eventStorageHandler);

  useEffect(()=>{
    if (sessionStorage.getItem("token-ad") && sessionStorage.getItem("csrfToken")) {
        setIsAuth(true)
        axiosInstance.defaults.headers.post['X-CSRF-Token'] = sessionStorage.getItem("csrfToken")
        axiosInstance.defaults.headers.delete['X-CSRF-Token'] = sessionStorage.getItem("csrfToken")
}},[])


  

  return (
    <HelmetProvider context={helmetContext}>
      <Suspense>
        { openBanner && <CookieBanner/>}
      </Suspense>
     
      <div className={`app `} >
        <Header isShowingPages={isShowingPages} setIsShowingPages={setIsShowingPages}  />
        <main className="main">
          <Suspense fallback={<Spinner/>} >
          <Routes>
            <Route path='/*' element={<PublicRoutes isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
            <Route path='/admin/*' element={<PrivateRoutes isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
            </Routes>
          </Suspense>
        </main>
      </div>
     <div style={{position:"fixed",zIndex:50,right:10,bottom:10,cursor:"pointer",height:25}} onClick={()=>setOpenBanner(true)}>
        <img src="/assets/static/icons/cookie.svg" alt="Cookies" />
     </div>
    </HelmetProvider>
  );
}

export default App;




