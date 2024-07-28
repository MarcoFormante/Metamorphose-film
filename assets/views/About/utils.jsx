import React from 'react'

const persons = [
    {
        instaName:"@thibaud.richard",
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
        instaName:"@napy.video",
        instaLink:"https://www.instagram.com/napy.video/",
        name:'Romain PINNA',
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
        instaName:"@vincii_pauly",
        instaLink:"https://www.instagram.com/vincii_pauly/",
        name:'Vincent PAULY',
        src:'vincent.webp',
        desc_big: <>
        Fan absolu de cinéma, cet art a toujours eu un effet salvateur sur moi.
        Très rigoureux et motivé dans tout ce que j'entreprends, pour moi cette entreprise 
        permet de développer notre savoir faire et nos connaissances. 
        Elle reflète notre envie commune d’aller le plus loin possible dans cette aventure.
        </>,
        skills: ["RÉALISATION","CADRAGE","MONTAGE", "SCENARISATION"]
    },
]

const aboutDescFirst = <>
Bienvenue dans l'univers Metamorphose, un endroit débordant de créativité, où notre passion pour l'art prend vie.
Tout a commencé avec trois esprits créatifs et passionnés, qui ont uni leurs forces pour
donner naissance à une aventure unique.
Nous sommes Romain, Vincent et Thibaud, d'anciens étudiants en cinéma qui ont décidé de transformer leur amour pour la création en quelque chose de concret: une agence de production audiovisuelle.
</>


const qualities = 
    [
        {
            title: "Polyvalence",
            type: 0,
            text: `La polyvalence est bien plus
            qu'une compétence, c'est
            notre état d'esprit.
            Nous sommes des
            créateurs intrépides,
            embrassant la diversité des
            défis avec une passion dévorante.`
        },
        {
            title: "Exigence",
            type: 1,
            text: `Chaque détail compte, de la planification à l'exécution, nous nous efforçons de dépasser vos attentes.`
        },
        {
            title: "Connaissance",
            type: 0,
            text: `Notre approche repose sur une alliance harmonieuse entre la connaissance technique et
                    l'expertise artistique, la combinaison idéale pour développer votre projet.`
        },
        
    ]
   


export {qualities,persons, aboutDescFirst}


