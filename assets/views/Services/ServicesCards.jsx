import React from 'react'
import ReactCardFlip from 'react-card-flip'

const ServicesCards = ({handleClick,isFlipped_Card1,isFlipped_Card2,isFlipped_Card3,isFlipped_Card4}) => {
  return (
    <section className='cards-section'>
    <div className='flex-c-container flex-container'>
        <article className='card-container card-container1' onClick={handleClick} >
            <div >
            <ReactCardFlip isFlipped={isFlipped_Card1} flipDirection="horizontal" flipSpeedBackToFront={1} flipSpeedFrontToBack={1}>
                <div className='card1'> 
                    <h1 className='art-h1'>Production Video</h1>
                    <span className='show-card'>{"En savoir plus >"}</span>
                </div >
                <div className='card2'  >
                  <p className='art-p art-pr'>Le fait que nous soyons spécialisés dans le clip vidéo a ceci  d'avantageux 
                      que nous arrivons parfaitement à transmettre des idées  simplement par la force des images.  
                      Ainsi nous sommes des touche-à-tout proposant en plus des  clips, les services suivants :  aftermovies, interviews, fictions, et vidéos corporates.
                  </p>
                  <p className='art-p art-c hide-pc'>Clip vidéo, aftermovies, interviews, fictions et corporates.</p>
                </div >
            </ReactCardFlip>
          </div>
        </article>

        <article className='card-container card-container2' onClick={handleClick} >
            <div >
            <ReactCardFlip isFlipped={isFlipped_Card2} flipDirection="horizontal" flipSpeedBackToFront={1} flipSpeedFrontToBack={1}>
                <div className='card1'> 
                    <h1 className='art-h1'>Montage</h1>
                    <span className='show-card'>{"En savoir plus >"}</span>
                </div >
                <div className='card2'>
                  <p className='art-p art-pl'>La magie opère dans la post-production.
                     Chaque coupe, chaque transition est  
                     murement réfléchie pour maximiser l'impact émotionnel  et narratif.
                  Le montage chez metamorphose est bien plus qu'une  simple étape technique, c'est l'étape ultime, celle où tout  se joue, transformant vos idées en réalité.
                  </p>
                  <p className='art-p art-c hide-pc'>Chaque coupe, chaque transition est murement réfléchie transformant vos idées en réalité.</p>
                </div >
            </ReactCardFlip>
          </div>
        </article>
    </div>
   

    <div className='flex-c-container flex-container2'>
        <article className='card-container card-container3' onClick={handleClick} >
            <div >
            <ReactCardFlip isFlipped={isFlipped_Card3} flipDirection="horizontal" flipSpeedBackToFront={1} flipSpeedFrontToBack={1}>
                <div className='card1'> 
                    <h1 className='art-h1'>Photographie</h1>
                    <span className='show-card'>{"En savoir plus >"}</span>
                </div >
                <div className='card2' >
                  <p className='art-p art-pr'>De la photographie événementielle à la séance de  portrait, nous nous 
                     efforçons de saisir l'émotion, la beauté et la vérité de   chaque moment.
                  </p>
                  <p className='art-p art-c hide-pc'>Événements, plateau, séance de portrait, shooting artistique et bien plus encore.</p>
                </div >
            </ReactCardFlip>
          </div>
        </article>

        <article className='card-container card-container4' onClick={handleClick} >
            <div>
            <ReactCardFlip isFlipped={isFlipped_Card4} flipDirection="horizontal" flipSpeedBackToFront={1} flipSpeedFrontToBack={1}>
                <div className='card1'> 
                    <h1 className='art-h1'>Drone</h1>
                    <span className='show-card'>{"En savoir plus >"}</span>
                </div >
                <div className='card2'>
                  <p className='art-p art-pl '>Que ce soit pour des vidéos promotionnelles, des  événements spéciaux ou des 
                      projets artistiques, notre service de drone apporte une  dimension unique, époustouflante et spectaculaire à vos  créations audiovisuelles.
                  </p>
                    <p className='art-p art-c hide-pc'>Pour apporter une dimension unique et époustouflante à vos créations vidéos.
                  </p>
                </div >
            </ReactCardFlip>
          </div>
        </article>
    </div>
  </section>
  )
}

export default ServicesCards