import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip';
import Prices from './Prices';
import TarifsPcCards from './TarifsPcCards';
import TarifsMobileCards from './TarifsMobileCards';


const Tarifs = () => {
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
      <div className='tarifs about mt'>
          <h2 className='title'>Tarifs<span>Formules</span></h2>
      </div>
      <Prices/>
      <div className='tarifs about'  id='capsule' style={{paddingBottom:0}}>
        <h1 className='title' style={{paddingTop:20}} >Tarifs<span>Description</span></h1>
          <div className='tarifs-content'>
              <h2 className='sub-tl'>Comment se déroule la réalisation d'une capsule?</h2>
              <div className='phar-fx'>
                <p>
                Dans un premier temps, on pourrait définir une capsule appelé aussi visualizer comme un clip minimaliste. <br/><br/>
                Aujourd'hui, l'importance des réseaux sociaux dans la communication d'un artiste est devenue plus qu'importante.
                Avec cette effervescence, les capsules ont pris une réelle place au sein de la création chez Métamorphose. <br/><br/>
                De plus, le budget pour une capsule reste beaucoup plus abordable qu'un clip offrant un avantage créatif décuplé pour l'artiste.
                </p>

                <img src="/assets/static/images/tarifs.webp" alt="" />
              </div>
          </div>

          <div className='tarifs-content' id='clip'>
              <h2 className='sub-tl sub-tl-m'>Comment se déroule la réalisation d'un clip?</h2>
          </div>
      </div>

    {/** PC */}
    <TarifsPcCards/>

    {/** Mobile */}
      <TarifsMobileCards 
      handleClick={handleClick} 
      isFlipped_Card1={isFlipped_Card1} 
      isFlipped_Card2={isFlipped_Card2} 
      isFlipped_Card3={isFlipped_Card3}
      isFlipped_Card4={isFlipped_Card4}
      />

    </>
  )
}

export default Tarifs


   