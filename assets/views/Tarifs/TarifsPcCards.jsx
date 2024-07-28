import React from 'react'

const TarifsPcCards = () => {
  return (
    <div className='tarifs hide-mobile'>
    <div className='tarifs-content' >
            <div className='flex-container'>
                  <article className='desc-card'>
                    <div className='desc-card-left'>
                      
                      <h1>1. Préproduction </h1>
                      <h2>Concept et Planification</h2>
                      <ul>
                            <li>Développer l'idée</li>
                            <li>Storyboard</li>
                            <li>Budget et Planning</li>
                            <li>Casting et Répétitions</li>
                      </ul>
                    </div>

                    <div className='desc-card-right'>
                          
                    </div>
                  </article>

                  <article className='desc-card'>
                    <div className='desc-card-left'>
                      <h1>2. Production </h1>
                      <h2>Tournage</h2>
                      <ul>
                            <li>Installation du matériel</li>
                            <li>Filmer les scènes</li>
                            <li>Direction artistique</li>
                            <li className='op-0'>__</li>
                      </ul>
                    </div>

                    <div className='desc-card-right'>
                          
                    </div>
                  </article>

                  <article className='desc-card'>
                    <div className='desc-card-left'>
                      <h1>3. Postproduction </h1>
                      <h2>Montage / Édition</h2>
                      <ul>

                            <li>Dérushage et Assemblage</li>
                            <li>Édition audio</li>
                            <li>Étalonnage</li>
                            <li>Effets spéciaux, Graphismes</li>
                      </ul>
                    </div>

                    <div className='desc-card-right'>
                          
                    </div>
                  </article>

                  <article className='desc-card'>
                    <div className='desc-card-left'>
                      <h1>4. Distribution </h1>
                      <h2>Publication / Promotion</h2>
                      <ul>
                            <li>Choisir les plateformes</li>
                            <li>Télécharger et optimiser</li>
                            <li>Marketing</li>
                            <li className='op-0'>__</li>
                      </ul>
                    </div>
                    <div className='desc-card-right d-none'>
                    
                    </div>
                  </article>
            </div>
            
        </div>
    </div>
  )
}

export default TarifsPcCards