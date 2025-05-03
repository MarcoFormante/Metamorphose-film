import React, {useState } from 'react'
import ServicesCards from './ServicesCards';
import TarifsMobileCards from '../Tarifs/TarifsMobileCards';
import Corporate from '../Corporate/Corporate';
import SEO from '../../components/Seo/SEO';
import { Helmet } from 'react-helmet-async';

const schemaServicesOffers = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Production audiovisuelle",
    "provider": {
      "@type": "Organization",
      "name": "Metamorphose Film",
      "url": "https://metamorphosefilm.com"
    },
    "serviceType": "Création de vidéos publicitaires, corporate, événementielles et clips musicaux",
    "areaServed": "France, Europe",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Types de projets",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Vidéo Publicitaire" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Vidéo Corporate" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Vidéo Événementielle" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Clip Vidéo" }}
      ]
    }
}

const schemaHowTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Réalisation d’un projet audiovisuel",
    "description": "Les 4 étapes clés de la création d’une vidéo professionnelle avec Metamorphose Film.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Préproduction",
        "itemListElement": [
          { "@type": "HowToDirection", "text": "Développer l'idée" },
          { "@type": "HowToDirection", "text": "Storyboard, Budget et Planning" }
        ]
      },
      {
        "@type": "HowToStep",
        "name": "Production",
        "itemListElement": [
          { "@type": "HowToDirection", "text": "Installation du matériel" },
          { "@type": "HowToDirection", "text": "Filmer les scènes, direction artistique" }
        ]
      },
      {
        "@type": "HowToStep",
        "name": "Postproduction",
        "itemListElement": [
          { "@type": "HowToDirection", "text": "Montage, Étalonnage, Effets spéciaux" }
        ]
      },
      {
        "@type": "HowToStep",
        "name": "Distribution",
        "itemListElement": [
          { "@type": "HowToDirection", "text": "Choisir les plateformes, marketing" }
        ]
      }
    ]
}

 const Services = () => {
  const [isFlipped_Card1, setIsFlippedCard_1] = useState(true);
  const [isFlipped_Card2, setIsFlippedCard_2] = useState(true);
  const [isFlipped_Card3, setIsFlippedCard_3] = useState(true);
  const [isFlipped_Card4, setIsFlippedCard_4] = useState(true);
  

  const handleClick = (e)=> {
    e.preventDefault();
    const target = e.currentTarget
    
    if (target.classList.contains("desc-card1")) {
      setIsFlippedCard_1(!isFlipped_Card1);
    }else if (target.classList.contains("desc-card2")) {
      setIsFlippedCard_2(!isFlipped_Card2);
    }else if (target.classList.contains("desc-card3")) {
      setIsFlippedCard_3(!isFlipped_Card3);
    }else if (target.classList.contains("desc-card4")) {
      setIsFlippedCard_4(!isFlipped_Card4);
    }
  }


  
  return (
    <>
      <SEO title={"Metamorphose Film - Services"} url={"/services"} robots={true} />

      <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaServicesOffers)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(schemaHowTo)}
      </script>
      </Helmet>
   
      <div className='services__body ' id='services-page'>
        <h1 className='title relative'>Services</h1>
    {/* <p className='p-desc hide-mobile relative'>
          Découvrez nos services, où chaque étape est une pièce maîtresse dans la création de notre projet commun.
        </p> */}
        <section className='mt-50'>
            <div>
                  <h2 className='section-title sub-tl sub-tl-m'>Nos types de projets :</h2>
            </div>
            <Corporate/>
        </section>
      
        <section>
          <div className='tarifs mt'>
            <div className='tarifs-content' >
                  <h2 className='section-title mt mb max-mobile-mt-20'>Comment se déroule la réalisation d'un projet ?</h2>
              </div>
              <TarifsMobileCards 
              handleClick={handleClick} 
              isFlipped_Card1={isFlipped_Card1} 
              isFlipped_Card2={isFlipped_Card2} 
              isFlipped_Card3={isFlipped_Card3}
              isFlipped_Card4={isFlipped_Card4}
              />
          </div>
       </section>
        
      
          
        <section className='services-footer'>
            <a className='mail'  href="mailto:metamorphoseproductions@gmail.com">metamorphoseproductions@gmail.com</a>
        </section>
      </div>
    </>
  )
}

export default Services

