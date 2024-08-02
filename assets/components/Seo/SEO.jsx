import React from "react";
import { Helmet } from 'react-helmet-async';


const SEO = ({ title, description, name, type, keywords,url,robots,image}) => {
   

    return (
      <Helmet>
    <meta charSet="utf-8" />
    <title>{title}</title>
    <meta name='description' content={description} />
    {keywords && <meta name="keywords" content={keywords} />}
    <meta name="robots" content={robots || "index, follow"} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta property="og:url" content={url} />
    <meta property="og:type" content={type} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {image && <meta property="og:image" content={image} />}
    <meta name="twitter:creator" content={name} />
    <meta name="twitter:card" content={type} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {image && <meta name="twitter:image" content={image} />}
    <link rel="canonical" href={url} />
      </Helmet>
    );
  }
  
  export default SEO;