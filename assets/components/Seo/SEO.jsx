import React from "react";
import { Helmet } from 'react-helmet-async';


const SEO = ({ title,keywords,url,robots}) => {
   

    return (
    <Helmet>
      <title>{title}</title>
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots || "index, follow"} />
      <link rel="canonical" href={"https://meta.metamorphose.com" + url} />
      </Helmet>
    );
  }
  
  export default SEO;