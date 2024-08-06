import React, { useEffect, useState } from 'react'
import ReactCardFlip from 'react-card-flip';
import ServicesCards from './ServicesCards';

 const Services = () => {
  const [isFlipped_Card1, setIsFlippedCard_1] = useState(false);
  const [isFlipped_Card2, setIsFlippedCard_2] = useState(false);
  const [isFlipped_Card3, setIsFlippedCard_3] = useState(false);
  const [isFlipped_Card4, setIsFlippedCard_4] = useState(false);
  

  const handleClick = (e)=> {
    e.preventDefault();
    const target = e.currentTarget
    if (target.classList.contains("card-container1")) {
      setIsFlippedCard_1(!isFlipped_Card1);
    }else if (target.classList.contains("card-container2")) {
      setIsFlippedCard_2(!isFlipped_Card2);
    }else if (target.classList.contains("card-container3")) {
      setIsFlippedCard_3(!isFlipped_Card3);
    }else if (target.classList.contains("card-container4")) {
      setIsFlippedCard_4(!isFlipped_Card4);
    }
  }


  
  return (
    <div className='services__body'>
      <h1 className='title relative'>Services</h1>
      <p className='p-desc hide-mobile relative'>Chez metamorphose, nous proposons une expérience complète, une immersion dans l'art de capturer des moments
       exclusifs et de raconter des histoires uniques. <br/>
        Découvrez nos services, où chaque étape est une pièce maîtresse dans la création de notre projet commun.</p>
        
       <ServicesCards 
        handleClick={handleClick} 
        isFlipped_Card1={isFlipped_Card1} 
        isFlipped_Card2={isFlipped_Card2} 
        isFlipped_Card3={isFlipped_Card3}
        isFlipped_Card4={isFlipped_Card4}
        />
        
        <section className='services-footer relative'>
            <p className='p-footer hide-mobile'>Laissez-nous être le partenaire de confiance pour concrétiser vos idées visuelles. <br/>
            Contactez-nous dès aujourd'hui pour discuter de la manière dont nous pouvons donner vie à votre projet.</p>

            <a className='mail'  href="mailto:metamorphoseproductions@gmail.com">metamorphoseproductions@gmail.com</a>
        </section>
       
       
    </div>
  )
}

export default Services

