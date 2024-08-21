import React, { useState } from 'react'
import { qualities } from './utils'
import Quality from '../About/Quality';
import ReactCardFlip from 'react-card-flip';

const Corporate = () => {

    const [isFlipped_Card1, setIsFlippedCard_1] = useState(false);
    const [isFlipped_Card2, setIsFlippedCard_2] = useState(false);
    const [isFlipped_Card3, setIsFlippedCard_3] = useState(false);
    const [isFlipped_Card4, setIsFlippedCard_4] = useState(false);
    const [isFlipped_Card5, setIsFlippedCard_5] = useState(false);
    const [isFlipped_Card6, setIsFlippedCard_6] = useState(false);
    const [isFlipped_Card7, setIsFlippedCard_7] = useState(false);
    const [isFlipped_Card8, setIsFlippedCard_8] = useState(false);
  

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
    }else if (target.classList.contains("card-container5")) {
        setIsFlippedCard_5(!isFlipped_Card5);
      }else if (target.classList.contains("card-container6")) {
        setIsFlippedCard_6(!isFlipped_Card6);
      }else if (target.classList.contains("card-container7")) {
        setIsFlippedCard_7(!isFlipped_Card7);
      }else if (target.classList.contains("card-container8")) {
        setIsFlippedCard_8(!isFlipped_Card8);
      }
  }

  return (
    <div className='about'>
    <h1 className='title'>Corporate<span>Valeurs</span></h1>
    <h2 className='corporate-sub-title'>Pourquoi Nous choisir ?</h2>
    <section className='about-valeurs hide-mobile'>
        <div className='flex-resp-start-row '>
            {qualities.map((quality,index)=>{
                return (
                    <Quality
                        key={"quality__"+index}
                        title={quality.title}
                        type={quality.type}
                        text={quality.text}
                    />
                    )
                }
            )}
        </div>
    </section>
   
    <section className='corporate hide-pc' style={{margin:0, padding:"0 32px",minHeight:"unset"}}>
   
        <div className='cards-section' style={{marginTop:60}}>
            <div className='flex-c-container flex-container' style={{marginTop:40,flexDirection:"row"}} >
                <article className='card-container card-container1' onClick={handleClick} >
                    <div >
                    <ReactCardFlip isFlipped={isFlipped_Card1} flipDirection="horizontal" flipSpeedBackToFront={1} flipSpeedFrontToBack={1}>
                        <div className='card1' style={{borderWidth:4}}> 
                            <h1 className='art-h1'  style={{color:"white",fontSize:"1em"}}> Expertise</h1>
                            <span className='show-card'>{"En savoir plus >"}</span>
                        </div >
                        <div className='card2'  >
                            
                            <p className='art-p art-c hide-pc' style={{width:"100%"}}>Compréhension approfondie du milieu publicitaire.</p>
                        </div >
                    </ReactCardFlip>
                    </div>
                </article>

                <article className='card-container card-container2' onClick={handleClick} >
                    <div >
                    <ReactCardFlip isFlipped={isFlipped_Card2} flipDirection="horizontal" flipSpeedBackToFront={1} flipSpeedFrontToBack={1}>
                        <div className='card1'> 
                            <h1 className='art-h1'  style={{color:"white",fontSize:"1em"}}>Équipement</h1>
                            <span className='show-card'>{"En savoir plus >"}</span>
                        </div >
                        <div className='card2'>
                            <p className='art-p art-pl'>Renforcez l'image de votre entreprise avec des films corporatifs professionnels.
                            Nous créons des vidéos institutionnelles, des témoignages clients, des interviews et des présentations d'entreprise qui mettent en valeur vos valeurs, vos réalisations et votre vision stratégique.
                            </p>
                            <p className='art-p art-c hide-pc'>Technologies de pointe.</p>
                        </div >
                    </ReactCardFlip>
                    </div>
                </article>
            </div>
            

            <div className='flex-c-container flex-container'  style={{marginTop:40,flexDirection:"row"}}>
                <article className='card-container card-container3' onClick={handleClick} >
                    <div >
                    <ReactCardFlip isFlipped={isFlipped_Card3} flipDirection="horizontal" flipSpeedBackToFront={1} flipSpeedFrontToBack={1}>
                        <div className='card1'> 
                            <h1 className='art-h1'  style={{color:"white",fontSize:"1em"}}>Portfolio</h1>
                            <span className='show-card'>{"En savoir plus >"}</span>
                        </div >
                        <div className='card2' >
                            <p className='art-p art-pr'>Boostez votre présence en ligne avec des vidéos adaptées aux plateformes sociales.
                            Qu'il s'agisse de courtes vidéos percutantes, de stories Instagram, de publicités Facebook ou de vidéos YouTube, nous produisons des contenus qui suscitent l'engagement et augmentent votre visibilité.
                            </p>
                            <p className='art-p art-c hide-pc'>Capacité à s'adapter à vos besoins.</p>
                        </div >
                    </ReactCardFlip>
                    </div>
                </article>

                <article className='card-container card-container4' onClick={handleClick} >
                    <div>
                    <ReactCardFlip isFlipped={isFlipped_Card4} flipDirection="horizontal" flipSpeedBackToFront={1} flipSpeedFrontToBack={1}>
                        <div className='card1'> 
                            <h1 className='art-h1'  style={{color:"white",fontSize:"1em"}}> Engagement</h1>
                            <span className='show-card'>{"En savoir plus >"}</span>
                        </div >
                        <div className='card2'>
                            <p className='art-p art-pl '>Ajoutez une dimension dynamique à votre
                            communication avec nos services de motion design et d'animation. Nous créons des animations 2D et 3D, des graphiques animés et des vidéos explicatives qui simplifient des concepts complexes et captivent votre audience.
                            </p>
                            <p className='art-p art-c hide-pc'>Un engagement inébranlable.</p>
                        </div >
                    </ReactCardFlip>
                    </div>
                </article>
                </div>
            </div>
        </section>

    <h2 className='title title-big-btm' style={{marginTop:40}}>Corporate<span>Prestations</span></h2>
    <section className='services__body' style={{margin:0, padding:"0 50px"}}>
   
        <div className='cards-section'>
            <div className='flex-c-container flex-container' style={{margin:0}} >
                <article className='card-container card-container5' onClick={handleClick} >
                    <div >
                    <ReactCardFlip isFlipped={isFlipped_Card5} flipDirection="horizontal" flipSpeedBackToFront={1} flipSpeedFrontToBack={1}>
                        <div className='card1'> 
                            <h1 className='art-h1' style={{color:"white"}}><span className='hide-mobile'> 1. Vidéo  &nbsp;</span>Publicitaire</h1>
                            <span className='show-card'>{"En savoir plus >"}</span>
                        </div >
                        <div className='card2'  >
                            <p className='art-p art-pr art-c'>Nous transformons vos idées en campagnes
                                                        publicitaires visuelles captivantes qui capturent l'essence de votre marque.
                                                        De la conceptualisation à la post-production, notre équipe s'occupe de chaque étape pour garantir que votre
                                                        message atteint et engage votre public cible de manière efficace.
                            </p>
                            <p className='art-p art-c hide-pc' style={{width:"100%"}}>Nous transformons vos idées en campagnes
                                                        publicitaires visuelles captivantes qui capturent l'essence de votre marque.</p>
                        </div >
                    </ReactCardFlip>
                    </div>
                </article>

                <article className='card-container card-container6' onClick={handleClick} >
                    <div >
                    <ReactCardFlip isFlipped={isFlipped_Card6} flipDirection="horizontal" flipSpeedBackToFront={1} flipSpeedFrontToBack={1}>
                        <div className='card1'> 
                            <h1 className='art-h1'  style={{color:"white"}}><span className='hide-mobile'> 2. &nbsp; </span> Films Corporatifs</h1>
                            <span className='show-card'>{"En savoir plus >"}</span>
                        </div >
                        <div className='card2'>
                            <p className='art-p art-pl'>Renforcez l'image de votre entreprise avec des films corporatifs professionnels.
                            Nous créons des vidéos institutionnelles, des témoignages clients, des interviews et des présentations d'entreprise qui mettent en valeur vos valeurs, vos réalisations et votre vision stratégique.
                            </p>
                            <p className='art-p art-c hide-pc' style={{width:"100%"}}>Vidéos institutionnelles, des témoignages clients, des interviews et des présentations d'entreprise.</p>
                        </div >
                    </ReactCardFlip>
                    </div>
                </article>
            </div>
            

            <div className='flex-c-container flex-container2'>
                <article className='card-container card-container7' onClick={handleClick} >
                    <div >
                    <ReactCardFlip isFlipped={isFlipped_Card7} flipDirection="horizontal" flipSpeedBackToFront={1} flipSpeedFrontToBack={1}>
                        <div className='card1'> 
                            <h1 className='art-h1'  style={{color:"white"}}><span className='hide-mobile'> 3. &nbsp;</span> Réseaux Sociaux</h1>
                            <span className='show-card'>{"En savoir plus >"}</span>
                        </div >
                        <div className='card2' >
                            <p className='art-p art-pr'>Boostez votre présence en ligne avec des vidéos adaptées aux plateformes sociales.
                            Qu'il s'agisse de courtes vidéos percutantes, de stories Instagram, de publicités Facebook ou de vidéos YouTube, nous produisons des contenus qui suscitent l'engagement et augmentent votre visibilité.
                            </p>
                            <p className='art-p art-c hide-pc' style={{width:"100%"}}>Courtes vidéos percutantes, de stories Instagram, de publicités Facebook ou de vidéos YouTube.</p>
                        </div >
                    </ReactCardFlip>
                    </div>
                </article>

                <article className='card-container card-container8' onClick={handleClick} >
                    <div>
                    <ReactCardFlip isFlipped={isFlipped_Card8} flipDirection="horizontal" flipSpeedBackToFront={1} flipSpeedFrontToBack={1}>
                        <div className='card1'> 
                            <h1 className='art-h1'  style={{color:"white"}}><span className='hide-mobile'> 4. &nbsp;</span>Motion Design</h1>
                            <span className='show-card'>{"En savoir plus >"}</span>
                        </div >
                        <div className='card2'>
                            <p className='art-p art-pl '>Ajoutez une dimension dynamique à votre
                            communication avec nos services de motion design et d'animation. Nous créons des animations 2D et 3D, des graphiques animés et des vidéos explicatives qui simplifient des concepts complexes et captivent votre audience.
                            </p>
                            <p className='art-p art-c hide-pc' style={{width:"100%"}}> Nous créons des animations 2D et 3D, des graphiques animés et des vidéos explicatives.
                            </p>
                        </div >
                    </ReactCardFlip>
                    </div>
                </article>
                </div>
            </div>
        </section>
    </div>
    
  )
}

export default Corporate