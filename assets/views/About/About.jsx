import React, { useState } from 'react'
import {persons,aboutDescFirst } from './utils'
import ReactCardFlip from 'react-card-flip';
import Contact from '../Contact/Contact'
import PageTitle from '../../components/common/PageTitle/PageTitle';


 

const About = () => {
    const [isFlipped_Card1, setIsFlippedCard_1] = useState(false);
    const [isFlipped_Card2, setIsFlippedCard_2] = useState(false);
    const [isFlipped_Card3, setIsFlippedCard_3] = useState(false);
    const [iconsFillColor, setIconsFillColor] = useState({insta:{class:"bg-black",fill:"#fff"},mail:{class:"bg-black",fill:"#fff"},linked:{class:"bg-black",fill:"#fff"}});

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

      const handleMouseEnterIconAnimation = (icon) => {
        switch (icon) {
            case "insta":
            setIconsFillColor(prev => ({...prev,insta:{class:"bg-white",fill:"#000"}}) )
            break;
            case "mail":
            setIconsFillColor(prev => ({...prev,mail:{class:"bg-white",fill:"#000"}}) )
            break;
            case "linked":
            setIconsFillColor(prev => ({...prev,linked:{class:"bg-white",fill:"#000"}}) )
            break;
        }
      }

      const handleMouseLeaveIconAnimation = (icon) => {
        switch (icon) {
            case "insta":
            setIconsFillColor(prev => ({...prev,insta:{class:"bg-black",fill:"#fff"}}) )
            break;
            case "mail":
            setIconsFillColor(prev => ({...prev,mail:{class:"bg-black",fill:"#fff"}}) )
            break;
            case "linked":
            setIconsFillColor(prev => ({...prev,linked:{class:"bg-black",fill:"#fff"}}) )
            break;
        }
      }
   
  return (
      <div className='about '>
        <section className='about-valeurs'>
          <PageTitle tag='h1' title={"À Propos"}/>
            <p className='about__desc'> {aboutDescFirst} </p>
        </section>
        
          <section> 
          <div className='hide-mobile'>
            {persons.map((person,index) =>
            <article key={person.instaName}>
            <div className={index === 1 ? "article-container-left" : "article-container"}>
                <img  src={"/assets/static/images/" + person.src} alt="" />
                <div className={index === 1 ? "flex-left" : "flex-right"}>
                    <div>
                        <h1 >{person.name}</h1>
                        <a className='article-insta'  href={person.instaLink}>{person.instaName}</a>
                    </div>
                  
                    <ul>
                        {person.skills.map((skill) => 
                        <li key={"skills__" + skill}>{skill}</li>
                        )}
                    </ul>
                </div>
            </div>
            </article>)
            }
        </div>  
          </section>
         
          <div className='hide-pc'>
          <div className='cards-container-flex-col '>
         { 
            persons.map((person,index) => 
                index < 3  &&
            <article key={person.name} className={`card-container ${"card-container" + index }`} onClick={handleClick} >
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
          <PageTitle tag='h2' className='mt mb' title={"Contact"}/>

          <Contact/>
        <div className='about-contact'>
            <ul className='about-contact__list'>
                <li className={iconsFillColor.insta.class} onMouseLeave={()=>handleMouseLeaveIconAnimation("insta")} onMouseEnter={()=>handleMouseEnterIconAnimation("insta")}><a target='_blank' rel='noreferrer' href={"https://www.instagram.com/metamorphosefilm/"}><SVG type={"insta"} fill={iconsFillColor.insta.fill}/></a></li>
                <li className={iconsFillColor.mail.class} onMouseLeave={()=>handleMouseLeaveIconAnimation("mail")}  onMouseEnter={()=>handleMouseEnterIconAnimation("mail")}><a target='_blank' rel='noreferrer' href={"mailto:metamorphoseproduction@gmail.com"}><SVG type={"mail"} fill={iconsFillColor.mail.fill}/></a></li>
                <li className={iconsFillColor.linked.class} onMouseLeave={()=>handleMouseLeaveIconAnimation("linked")} onMouseEnter={()=>handleMouseEnterIconAnimation("linked")}><a target='_blank' rel='noreferrer' href={"https://www.linkedin.com/company/metamorphose-film/"} ><SVG type={"linked"} fill={iconsFillColor.linked.fill}/></a></li>
            </ul>
        </div>
    </div>
    )
}

export default About



const SVG = ({type,fill}) => {

  if (type === "insta") {
    return (
      <svg width="57px" height="57px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  
  <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
  
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
  
  <g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill={fill}/> <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill={fill}/> <path fillRule="evenodd" clipRule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" fill={fill}/> </g>
  
  </svg>
    )
  }else if (type === "linked") {

    return (
      <svg width="155px" height="155px" viewBox="0 -192 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" fill={fill}>

      <g id="SVGRepo_bgCarrier" strokeWidth="1"/>
      
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
      
      <g id="SVGRepo_iconCarrier"> <g> <path d="M202.057143,74.9714286 L230.308571,109.714286 L208,109.714286 L182.857143,77.8057143 L182.857143,109.714286 L164.571429,109.714286 L164.571429,18.2857143 L182.857143,18.2857143 L182.857143,72.0457143 L206.08,45.7142857 L229.394286,45.7142857 L202.057143,74.9714286 Z M128.914286,43.8857143 C120.787189,44.0072946 113.236551,48.1071889 108.708571,54.8571429 L108.708571,45.7142857 L91.4285714,45.7142857 L91.4285714,109.714286 L109.714286,109.714286 L109.714286,79.8171429 C109.228856,75.4306044 110.587451,71.0395336 113.465306,67.6935939 C116.343161,64.3476542 120.481628,62.3475617 124.891429,62.1714286 C135.497143,62.1714286 137.142857,72.5942857 137.142857,79.8171429 L137.142857,109.714286 L155.428571,109.714286 L155.428571,75.7942857 C155.428571,55.68 148.754286,43.8857143 129.28,43.8857143 L128.914286,43.8857143 L128.914286,43.8857143 Z M292.571429,79.1771429 C292.641384,80.5171829 292.641384,81.85996 292.571429,83.2 L244.571429,83.2 L244.571429,83.84 C246.180812,91.7157313 253.271666,97.2566715 261.302857,96.9142857 C267.534814,97.1852048 273.608543,94.9075564 278.125714,90.6057143 L290.285714,99.7485714 C282.492218,107.701692 271.697708,111.986282 260.571429,111.542857 C251.352,112.12578 242.332413,108.684541 235.84426,102.108711 C229.356108,95.5328807 226.036241,86.4679167 226.742857,77.2571429 C226.553601,68.1728489 230.14904,59.4186661 236.668659,53.0897809 C243.188278,46.7608958 252.045327,43.4268918 261.12,43.8857143 C278.308571,43.8857143 292.571429,56.0457143 292.571429,79.1771429 L292.571429,79.1771429 Z M275.565714,71.3142857 C275.429974,67.6543136 273.796386,64.2108816 271.047593,61.7905603 C268.298799,59.3702389 264.676286,58.1856575 261.028571,58.5142857 C252.988748,57.6450726 245.707994,63.3078811 244.571429,71.3142857 L275.565714,71.3142857 Z M18.2857143,18.2857143 L0,18.2857143 L0,109.714286 L54.8571429,109.714286 L54.8571429,91.4285714 L18.2857143,91.4285714 L18.2857143,18.2857143 Z M347.428571,18.2857143 L365.714286,18.2857143 L365.714286,109.714286 L348.434286,109.714286 L348.434286,103.314286 C343.984638,108.796268 337.202524,111.848219 330.148571,111.542857 C321.559196,111.322256 313.441626,107.566635 307.712892,101.162914 C301.984158,94.7591935 299.152166,86.2751236 299.885714,77.7142857 C299.012676,69.1378257 301.783463,60.5891918 307.521582,54.1555424 C313.259702,47.7218931 321.437059,43.995336 330.057143,43.8857143 C336.471312,43.6048667 342.729753,45.9106081 347.428571,50.2857143 L347.428571,18.2857143 L347.428571,18.2857143 Z M348.8,77.7142857 C349.381889,73.4426146 348.085439,69.1282627 345.245304,65.8848994 C342.40517,62.6415361 338.299673,60.7869982 333.988571,60.7999321 C325.241789,61.4350869 318.614232,68.9571605 319.085714,77.7142857 C318.614232,86.4714109 325.241789,93.9934846 333.988571,94.6286393 C338.299673,94.6415732 342.40517,92.7870353 345.245304,89.543672 C348.085439,86.3003087 349.381889,81.9859569 348.8,77.7142857 L348.8,77.7142857 Z M73.1428571,16.4571429 C67.0426002,16.5439794 62.0499364,21.3369367 61.7142857,27.4285714 C61.7142857,33.7403971 66.8310314,38.8571429 73.1428571,38.8571429 C79.4546829,38.8571429 84.5714286,33.7403971 84.5714286,27.4285714 C84.2357779,21.3369367 79.2431141,16.5439794 73.1428571,16.4571429 L73.1428571,16.4571429 Z M64,109.714286 L82.2857143,109.714286 L82.2857143,45.7142857 L64,45.7142857 L64,109.714286 Z M512,9.14285714 L512,118.857143 C512,123.906603 507.906603,128 502.857143,128 L393.142857,128 C388.093397,128 384,123.906603 384,118.857143 L384,9.14285714 C384,4.09339657 388.093397,-3.55271368e-15 393.142857,-3.55271368e-15 L502.857143,-3.55271368e-15 C507.906603,-3.55271368e-15 512,4.09339657 512,9.14285714 Z M420.571429,45.7142857 L402.285714,45.7142857 L402.285714,109.714286 L420.571429,109.714286 L420.571429,45.7142857 Z M422.857143,27.4285714 C422.857143,21.1167457 417.740397,16 411.428571,16 C405.116746,16 400,21.1167457 400,27.4285714 C400,33.7403971 405.116746,38.8571429 411.428571,38.8571429 C417.740397,38.8571429 422.857143,33.7403971 422.857143,27.4285714 Z M493.714286,75.7942857 C493.714286,55.68 487.04,43.8857143 467.565714,43.8857143 C459.308825,43.8867299 451.594988,48.0007766 446.994286,54.8571429 L446.994286,45.7142857 L429.714286,45.7142857 L429.714286,109.714286 L448,109.714286 L448,79.8171429 C447.51457,75.4306044 448.873165,71.0395336 451.75102,67.6935939 C454.628875,64.3476542 458.767343,62.3475617 463.177143,62.1714286 C473.782857,62.1714286 475.428571,72.5942857 475.428571,79.8171429 L475.428571,109.714286 L493.714286,109.714286 L493.714286,75.7942857 Z" fill={fill}> </path> </g> </g>
      
      </svg>
    )
  }else if(type === "mail"){
    return (
      <svg height="57px" width="57px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.00 512.00" xmlSpace="preserve" fill={fill}>

<g id="SVGRepo_bgCarrier" strokeWidth="2"/>

<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

<g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{`fill:#FF1100;`} </style> <g> <path  className="st0" d="M510.746,110.361c-2.128-10.754-6.926-20.918-13.926-29.463c-1.422-1.794-2.909-3.39-4.535-5.009 c-12.454-12.52-29.778-19.701-47.531-19.701H67.244c-17.951,0-34.834,7-47.539,19.708c-1.608,1.604-3.099,3.216-4.575,5.067 c-6.97,8.509-11.747,18.659-13.824,29.428C0.438,114.62,0,119.002,0,123.435v265.137c0,9.224,1.874,18.206,5.589,26.745 c3.215,7.583,8.093,14.772,14.112,20.788c1.516,1.509,3.022,2.901,4.63,4.258c12.034,9.966,27.272,15.45,42.913,15.45h377.51 c15.742,0,30.965-5.505,42.967-15.56c1.604-1.298,3.091-2.661,4.578-4.148c5.818-5.812,10.442-12.49,13.766-19.854l0.438-1.05 c3.646-8.377,5.497-17.33,5.497-26.628V123.435C512,119.06,511.578,114.649,510.746,110.361z M34.823,99.104 c0.951-1.392,2.165-2.821,3.714-4.382c7.689-7.685,17.886-11.914,28.706-11.914h377.51c10.915,0,21.115,4.236,28.719,11.929 c1.313,1.327,2.567,2.8,3.661,4.272l2.887,3.88l-201.5,175.616c-6.212,5.446-14.21,8.443-22.523,8.443 c-8.231,0-16.222-2.99-22.508-8.436L32.19,102.939L34.823,99.104z M26.755,390.913c-0.109-0.722-0.134-1.524-0.134-2.341V128.925 l156.37,136.411L28.199,400.297L26.755,390.913z M464.899,423.84c-6.052,3.492-13.022,5.344-20.145,5.344H67.244 c-7.127,0-14.094-1.852-20.142-5.344l-6.328-3.668l159.936-139.379l17.528,15.246c10.514,9.128,23.922,14.16,37.761,14.16 c13.89,0,27.32-5.032,37.827-14.16l17.521-15.253L471.228,420.18L464.899,423.84z M485.372,388.572 c0,0.803-0.015,1.597-0.116,2.304l-1.386,9.472L329.012,265.409l156.36-136.418V388.572z"/> </g> </g>
</svg>
    )
  }
  
}
