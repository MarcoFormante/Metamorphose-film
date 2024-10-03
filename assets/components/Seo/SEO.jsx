import React from "react";
import { Helmet } from 'react-helmet-async';


const SEO = ({ title,url,robots}) => {
   

    return (
    <Helmet>
      <title>{title}</title>
      <meta name="robots" content={robots  ? "index, follow" : "noindex, nofollow"} />
      <link rel="canonical" href={"https://meta.metamorphose.com" + url} />
      </Helmet>
    );
  }
  
  export default SEO;