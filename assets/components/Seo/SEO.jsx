import React from "react";
import { Helmet } from 'react-helmet-async';


const SEO = ({ title, description, name, type, keywords,url}) => {
   

    return (
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        {keywords && <meta name="keywords" content={keywords}/>}
        <meta name="robots" content="index, follow"/>
        <meta property="og:url" content={url}/>
        <meta property="og:type" content={type} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:creator" content={name} />
        <meta name="twitter:card" content={type} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href={url} />
        
      </Helmet>
    );
  }
  
  export default SEO;