import React, { useState } from 'react'
import Quality from '../../components/About/Quality'
import insta from "./insta.png"
import mail from "./mail.png"
import linked from "./linked.png"
import { qualities,persons,aboutDescFirst } from './utils'
import ReactCardFlip from 'react-card-flip';
import Contact from '../Contact/Contact'


 

const About = () => {
    const [isFlipped_Card1, setIsFlippedCard_1] = useState(false);
    const [isFlipped_Card2, setIsFlippedCard_2] = useState(false);
    const [isFlipped_Card3, setIsFlippedCard_3] = useState(false);

    const handleClick = (e)=> {
        e.preventDefault();
        const target = e.currentTarget
        if (target.classList.contains("card-container0")) {
          setIsFlippedCard_1(!isFlipped_Card1);
        }else if (target.classList.contains("card-container1")) {
          setIsFlippedCard_2(!isFlipped_Card2);
        }else if (target.classList.contains("card-container2")) {
          setIsFlippedCard_3(!isFlipped_Card3);
        }
      }
    
    
      const handleSetFlippedState = (index) => {
        switch (index) {
            case 0:
              return isFlipped_Card1
            case 1:
              return isFlipped_Card2
            case 2:
              return isFlipped_Card3
            default:
              return false
          }
      }

     
   
  return (
      <div className='about '>
        <section className='about-valeurs'>
          <h1 className='title'>A Propos<span>Valeurs</span></h1>
            <p className='about__desc'> {aboutDescFirst} </p>
          <div className='flex-resp-start-row'>
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
        
        
          <section> 
          <h2 className='title'>A Propos<span>Equipe</span></h2>
          <div className='hide-mobile'>
            {persons.map((person,index) =>
            <article>
            <div className={index === 1 ? "article-container-left" : "article-container"}>
                <img  src={"/assets/static/images/" + person.src} alt="" />
                <div className={index === 1 ? "flex-left" : "flex-right"}>
                    <div>
                        <h1 >{person.name}</h1>
                        <a className='article-insta'  href={person.instaLink}>{person.instaName}</a>
                    </div>
                  
                    <ul>
                        {person.skills.map((skill, index) => 
                        <li key={"skills__" + index}>{skill}</li>
                        )}
                    </ul>
                </div>
            </div>
            <p className='person-desc'>{person.desc_big}</p>
            </article>)
            }
        </div>  
          </section>
         
          <div className='hide-pc'>
          <div className='cards-container-flex-col '>
         { 
            persons.map((person,index) => 
                index < 3  &&
            <article className={`card-container ${"card-container" + index }`} onClick={handleClick} >
                  <div >
                  <ReactCardFlip isFlipped={handleSetFlippedState(index)} flipDirection="horizontal" flipSpeedBackToFront={1} flipSpeedFrontToBack={1}>
                      <div className='card1'> 
                          <h1 className='art-h1'>{person.name}</h1>
                          <img src={"/assets/static/images/" + person.src} alt="" />
                          <span className='show-card'>{"En savoir plus >"}</span>
                      </div >
                      <div className='card2'>
                        <ul>
                            {person.skills.map((skill, index) => 
                            <li key={"skills__" + index}>{skill}</li>
                            )}  
                        </ul>
                      </div >
                  </ReactCardFlip>
                </div>
              </article>)
            }
          </div>
          </div>
          <h3 className='title title-contact'>A Propos<span>Contact</span></h3>
          <Contact/>
        <div className='about-contact'>
            <ul className='about-contact__list'>
                <li><a target='_blank' rel='noreferrer' href={"https://www.instagram.com/metamorphosefilm/"}><img src={insta} id='insta' alt="Account instagram metamorphose" title="Account instagram metamorphose" /></a></li>
                <li><a target='_blank' rel='noreferrer' href={"mailto:metamorphoseproduction@gmail.com"}><img src={mail} id='mail' alt="Account mail metamorphose" title="Account mail metamorphose" /></a></li>
                <li><a target='_blank' rel='noreferrer' href={"https://www.linkedin.com/in/metamorphose-film-500321296/"}><img src={linked} id='linked' alt="Account Linkedin metamorphose" title="Account Linkedin metamorphose" /></a></li>
            </ul>
        </div>
      
        
            
    </div>
        
    )
}

export default About




