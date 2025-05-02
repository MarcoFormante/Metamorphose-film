import React,{useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../../../components/common/BackButton/BackButton'
import SEO from '../../../components/Seo/SEO'
import Publicitaire from './pub/Publicitaire'
import Evenementiel from './evenementiel/Evenementiel'
import Corporate from './corporate/Corporate'
import ClipVideo from './clip/ClipVideo'

const ServiceComponent = {
    "publicitaire": <Publicitaire/>,
    "corporate":  <Corporate/>,
    "evenementiel":<Evenementiel/>,
    "clip-video": <ClipVideo/>
}



const ServicesVideoTrailer = () => {
const name = useParams().name
const navigate = useNavigate()


useEffect(() => {
 
  if (!ServiceComponent[name]) {
    return navigate("/services")
}
window.scrollTo({
  top:0
})
}, [name])


  return (
    <div id='service-video-trailer' >
      <SEO title={`Metamorphose Film - service ${name.replace("-","")}`} robots={true} url={`/services/${name}`}/>
      <BackButton callback={()=>navigate("/services")} label={"Retour"} props={{width: "30", height: "30"}}/>
        {ServiceComponent[name] ?? null}
    </div>
  )
} 

export default ServicesVideoTrailer