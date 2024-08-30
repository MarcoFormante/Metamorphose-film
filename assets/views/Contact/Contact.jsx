import React from 'react'
import { Link } from 'react-router-dom'

const Contact = () => {


  return (
      <div className="contact hide-mobile">
          <p className="contact__desc">
          Si vous souhaitez passer une commande, établir un partenariat, formuler
          une demande ou simplement obtenir des informations ? <br/>
          Metamorphose est à votre service afin de répondre à votre demande dans les plus brefs délais !
          </p>
          <div className='contact__links hide-pc'>
            <div className='contact__links__container'>
                <Link target='_blank' to={"https://www.instagram.com/metamorphosefilm/"}><span>INSTAGRAM</span></Link>
            </div>
            <div className='contact__links__container'>
                <Link target='_blank' to={"https://www.linkedin.com/in/metamorphose-film-500321296/"}><span>LINKDN</span></Link>
            </div>
            <div className='contact__links__container'>
                <Link to={"mailto:metamorphoseproduction@gmail.com"}><span>MAIL</span></Link>
            </div>
          </div>
          <div className='contact-footer hide-pc'>
            <span><i>contactez-nous:</i></span>
            <span>metamorphoseproductions@gmail.com</span>
          </div>
    </div>
  )
}


export default Contact