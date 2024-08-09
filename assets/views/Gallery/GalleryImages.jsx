import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ShowImage } from '../../components/ShowImage/ShowImage'
import { axiosInstance } from '../../middleware/axiosInstance'
import Fallback from '../../components/Spinner/Fallback'

const GalleryImages = () => {
    const [isShowingImage,setIsShowingImage] = useState(false)
    const [images,setImages] = useState([])
    const [imgSrc,setImgSrc] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()

   
    const showImage = useCallback((e,index)=>{
        setIsShowingImage(true)
        setImgSrc(index)
    },[setIsShowingImage,setImgSrc])


    //**@USE EFFECT */
    useEffect(()=>{
        if (isShowingImage) {
            document.body.style.overflow = "hidden"
        }else{
            document.body.style.overflow = "auto"
        }
    },[isShowingImage])



    useEffect(()=> {
        setIsLoading(true)
        const galleries=["concert","tournage","studio","evenements"]
        if(!galleries.includes(location?.state?.toLowerCase())){
            navigate('/galerie')
        }
        if (sessionStorage.getItem("gallery-"+location.state) && !sessionStorage.getItem("token-ad")) {
            setImages(JSON.parse(sessionStorage.getItem("gallery-"+location.state)))
            setIsLoading(false)
            return
        }
        const getImages = async()=>{
        axiosInstance.get("gallery/"+ location.state)
        .then(res => {
            if (res.status === 200) {
                sessionStorage.setItem("gallery-"+location.state,JSON.stringify(res.data?.images))
                setImages(res.data?.images)
            }
        }).catch(err => console.error("error fetching images"))
        .finally(()=> setIsLoading(false))
        }
        getImages()
    },[location.state])

    //**@RETURN */

  return (
    <div className='gallery__images'>
       {isLoading && <Fallback/>}
        {location.state && <h1 className='gallery__images__gallery-name'>Galerie<span>{location.state}</span></h1>}
        <ShowImage isShowingImage={isShowingImage} isSrc={true} imgSrc={imgSrc} setImgSrc={setImgSrc} setIsShowingImage={setIsShowingImage} images={images}/>
        <div className='gallery__images__flex'>
        { images.map((image,index)=>
            <figure>
                <img onClick={(e)=>showImage(e,index)} src={"/assets/uploads/images/galleries/"+ image.src} alt=''/>
            </figure>
        )}
        {images.length < 1 && <p className='c-white t-center'>Il n'y a pas d'images dans cette galerie</p>}
        </div>
    </div>
  )
}

export default GalleryImages