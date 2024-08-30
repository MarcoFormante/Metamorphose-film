import React from 'react'
import ReactCardFlip from 'react-card-flip'

const TarifsMobileCards = ({handleClick,isFlipped_Card1,isFlipped_Card2,isFlipped_Card3,isFlipped_Card4}) => {
  return (
    <div className='tarifs '>
    <div className='tarifs-content' >
            <div className='flex-container'>
              <div className='desc-card1' onClick={handleClick} >
              <ReactCardFlip isFlipped={isFlipped_Card1} flipDirection="horizontal" flipSpeedBackToFront={1} flipSpeedFrontToBack={1}>
              <article className='desc-card '>
                  <div className='desc-card-left'>
                    <h2>Concept et Planification</h2>
                    <ul>
                          <li>Développer l'idée</li>
                          <li>Storyboard</li>
                          <li>Budget et Planning</li>
                         
                    </ul>
                  </div>
                  
                </article>

                <article className='desc-card  desc-card1'>
                  <div className='desc-card-left desc-card-left__mobile'>
                    <div className='desc-card-left__title'>
                        <h1>1. Préproduction </h1>
                    </div>
                   
                  </div>
                  
                </article>
              </ReactCardFlip>
              <div className='desc-card-right'>
                  </div>
              </div>
            
              <div className='desc-card2' onClick={handleClick} >
              <ReactCardFlip isFlipped={isFlipped_Card2} flipDirection="horizontal" flipSpeedBackToFront={1} flipSpeedFrontToBack={1}>
              <article className='desc-card'>
                  <div className='desc-card-left'>
                  <h2 className='t-b'>Tournage</h2>
                      <ul>
                            <li>Installation du matériel</li>
                            <li>Filmer les scènes</li>
                            <li>Direction artistique</li>
                           
                      </ul>
                  </div>
                 
                </article>

                <article className='desc-card'>
                  <div className='desc-card-left desc-card-left__mobile'>
                    <div className='desc-card-left__title'>
                        <h1>2. Production </h1>
                    </div>
                   
                  </div>
                  
                </article>
              </ReactCardFlip>
              <div className='desc-card-right'>
              </div>
              </div>

              <div className='desc-card3' onClick={handleClick} >

              <ReactCardFlip isFlipped={isFlipped_Card3} flipDirection="horizontal" flipSpeedBackToFront={1} flipSpeedFrontToBack={1}>
              <article className='desc-card'>
                  <div className='desc-card-left'>
                    <h2 className='t-b'>Montage / Édition</h2>
                    <ul>
                          <li className='t-s'>Dérushage et Assemblage </li>
                          <li>Étalonnage</li>
                          <li className='t-s'>Effets spéciaux, Graphismes</li>
                    </ul>
                  </div>
                 
                </article>

                <article className='desc-card'>
                  <div className='desc-card-left desc-card-left__mobile'>
                    <div className='desc-card-left__title'>
                        <h1>3. Postproduction </h1>
                    </div>
                   
                  </div>
                  
                </article>
              </ReactCardFlip>
              <div className='desc-card-right'>
                  </div>
              </div>



              <div className='desc-card4' onClick={handleClick} >

              <ReactCardFlip isFlipped={isFlipped_Card4} flipDirection="horizontal" flipSpeedBackToFront={1} flipSpeedFrontToBack={1}>
              <article className='desc-card'>
                  <div className='desc-card-left'>
                    <h2>Publication / Promotion</h2>
                    <ul>
                     
                          <li>Choisir les plateformes</li>
                          <li>Télécharger et optimiser</li>
                          <li>Marketing</li>
                          <li></li>
                    </ul>
                  </div>
                 
                </article>

                <article className='desc-card'>
                  <div className='desc-card-left desc-card-left__mobile'>
                    <div className='desc-card-left__title'>
                        <h1>4. Distribution</h1>
                    </div>
                  </div>
                  
                </article>
              </ReactCardFlip>
              <div className='desc-card-right op-0'>
              </div>
              </div>
              
            </div>
        </div>
    </div>
  )
}

export default TarifsMobileCards