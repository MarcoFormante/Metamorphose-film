import React from 'react'

const persons = [
    {
        instaName:"thibaud.richard",
        instaLink:"https://www.instagram.com/thibaud.richard/",
        name:'Thibaud RICHARD',
        src:'thibaud.webp',
        desc_big:
        <>
        Je me suis toujours évadé grâce au cinéma, profondément animé par mon 
       
        imaginaire et mes envies de création.
      
        J’ai toujours ressenti le besoin d’imaginer et de rêver. À mes yeux Metamorphose  
      
        est la rencontre entre 3 humains animés d’une passion commune : la Création.
        </>,
        skills: ["RÉALISATION","CADRAGE","MONTAGE", "EFFETS SPECIAUX"]

    },

    {   
        instaName:"napy.video",
        instaLink:"https://www.instagram.com/napy.video/",
        name:'NAPY',
        src:'romain.webp',
        desc_big:
        <>
        "Moi c'est Romain, un passionné de vidéo, de drone et de photographie.
        A travers mon objectif, je cherche à capturer l'essence et la personnalité de chaque moment.
        Mon approche est à la fois artistique et authentique,  
        cherchant à figer des moments uniques qui racontent des histoires."
        </>,
        skills: ["RÉALISATION", "PHOTOGRAPHIE" ,"ÉTALONNAGE", "PILOTAGE DRONE"]
    },

   

    {
        instaName:"vincii_pauly",
        instaLink:"https://www.instagram.com/vincii_pauly/",
        name:'Vincent PAULY',
        src:'vincent.webp',
        desc_big: <>
        Fan absolu de cinéma, cet art a toujours eu un effet salvateur sur moi.
        Très rigoureux et motivé dans tout ce que j'entreprends, pour moi cette entreprise 
        permet de développer notre savoir faire et nos connaissances. 
        Elle reflète notre envie commune d’aller le plus loin possible dans cette aventure.
        </>,
        skills: ["RÉALISATION","CADRAGE","MONTAGE", "STORYBOARD"]
    },
]

const aboutDescFirst = <>
<span className=''>
Tout a commencé avec 3 esprits créatifs et passionnés, qui ont uni leurs forces pour
donner naissance à une aventure unique.
</span>


</>





export {persons, aboutDescFirst}


