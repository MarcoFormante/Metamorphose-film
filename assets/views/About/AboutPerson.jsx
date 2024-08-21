import React from 'react'
import { Link } from 'react-router-dom'

const AboutPerson = ({reversed,src,instaName,instaLink,name,desc_big,skills,index}) => {
    return (
        <div className={reversed ? "about__person about__person__reversed" : "about__person"}>
              <div className={'about__person__img about__person__img' + index}>
                  <img src={"/assets/static/images/" + src} alt=""  className={'img__'+index}/>
              </div>
              
              <div className={`about__person__desc about__person__desc__`+index}>
                <div>
                <div className='about__person__header'>
                    <Link target='_blank' className={'link__' + index} to={instaLink}><span className={'insta__'+index}>{instaName}</span></Link>
                    <p className='name'>{name}</p>
                </div>
               
                <p className={'about__person__desc__text about__person__desc__text--big about__person__desc__text--big__'+ index}>
                    {desc_big}
                </p>  
                </div>
              
                <div className={`skills skills${index}`}>
                    <ul className={'skills__'+ index}>
                        {skills?.map((s,key)=> <li key={s + key}>{s}</li>)}
                    </ul>
              </div>
                
                </div>

                
          </div>
    )
}

export default AboutPerson