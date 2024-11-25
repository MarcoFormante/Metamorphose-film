import React, {useState } from 'react'
import ServicesCards from './ServicesCards';
import TarifsMobileCards from '../Tarifs/TarifsMobileCards';
import Corporate from '../Corporate/Corporate';
import SEO from '../../components/Seo/SEO';

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
   
      <div className='services__body ' id='services-page'>
        <h1 className='title relative'>Services</h1>
        <p className='p-desc hide-mobile relative'>Chez metamorphose, nous proposons une expérience complète, une immersion dans l'art de capturer des moments
          exclusifs et de raconter des histoires uniques. <br/>
          Découvrez nos services, où chaque étape est une pièce maîtresse dans la création de notre projet commun.
        </p>
        <section>
          <ServicesCards />
        </section>
        <section>
          <div className='tarifs mt'>
            <div className='tarifs-content' >
                  <h2 className='section-title mt mb'>Comment se déroule la réalisation d'un projet ?</h2>
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
        
        <section className='mb'>
            <div>
                  <h2 className='section-title sub-tl sub-tl-m'>Nos types de projets :</h2>
            </div>

            <Corporate/>
        </section>
          
        <section className='services-footer'>
            <p className='p-footer hide-mobile'>Laissez-nous être le partenaire de confiance pour concrétiser vos idées visuelles. <br/>
            Contactez-nous dès aujourd'hui pour discuter de la manière dont nous pouvons donner vie à votre projet.</p>

            <a className='mail'  href="mailto:metamorphoseproductions@gmail.com">metamorphoseproductions@gmail.com</a>
        </section>
      </div>
    </>
  )
}

export default Services

