import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom";
import 'vite/modulepreload-polyfill'
import CookieProvider from './contexts/CookieProvider';
import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <React.StrictMode>
      <Router>
      <CookieProvider>
        <App/>
        </CookieProvider>
      </Router>
  </React.StrictMode>
 
);
