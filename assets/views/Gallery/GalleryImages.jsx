import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ShowImage } from '../../components/ShowImage/ShowImage'
import { axiosInstance } from '../../middleware/axiosInstance'
import Fallback from '../../components/UI/Spinner/Spinner'
import { purifyImages } from '../../security/Dompurify/purify'
import MoreItems from '../../components/common/ShowMoreButton/ShowMoreButton'
import BackButton from '../../components/common/BackButton/BackButton'

const GalleryImages = () => {
    const [isShowingImage,setIsShowingImage] = useState(false)
    const [images,setImages] = useState([])
    const [imgSrc,setImgSrc] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [newImageLength, setNewImageLength] = useState(0)
    const [imageOffset, setImageOffset] = useState(0)
    const [totalImages, setTotalImages] = useState(null)
    const [canSearchNewImages, setCanSearchNewImages] = useState(false)
    const [isFetchingNewImages, setIsFetchingNewImages] = useState(false)
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



useEffect(()=>{
  if (totalImages > newImageLength) {
      setCanSearchNewImages(true)
  }else{
      setCanSearchNewImages(false)
  }
},[totalImages,newImageLength])



    useEffect(()=> {
        images.length < 1 ? setIsLoading(true) : setIsFetchingNewImages(true)
        const galleries=["concert","tournage","studio","evenements"]
        if(!galleries.includes(location?.state?.toLowerCase())){
            navigate('/galerie')
        }
        const getImages = async()=>{
        axiosInstance.get("gallery/"+ location.state,{
            params: {
                offset: imageOffset,
            }
        })
        .then(res => {
            if (res.status === 200) {
                const dataImages = res.data?.images
                const purifiedImgs = purifyImages(dataImages)
                const imgs = [...images,...purifiedImgs]
                setImages(prev => [...prev,...purifiedImgs])
                res.data?.total > 0 &&  setTotalImages(res.data?.total)
                setNewImageLength(imgs.length)  
            }
        }).catch(err => console.error("error fetching images"))
          .finally(()=> {
            setIsLoading(false)
            setIsFetchingNewImages(false)
          })
        }

        getImages()
    },[location.state,imageOffset])


    const handleImagesOffset = ()=>{
      if (canSearchNewImages) {
          setImageOffset(prev => prev + 1)
          setCanSearchNewImages(false)
      }
    }

    //**@RETURN */

  return (
    <>
      <div className="gallery__images">
        {isLoading && <Fallback />}
     
          <BackButton
            props={{ width: 24, height: 24 }}
            callback={() => navigate("/galerie")}
            label={"Retour"}
          />
         
        {location.state && (
          <h1 className="gallery__images__gallery-name">
            Galerie<span>{location.state}</span>
          </h1>
        )}
        <ShowImage
          isShowingImage={isShowingImage}
          isSrc={true}
          imgSrc={imgSrc}
          setImgSrc={setImgSrc}
          setIsShowingImage={setIsShowingImage}
          images={images}
        />
        <div className="gallery__images__flex">
          {images.map((image, index) => (
            <figure>
              <img
                onClick={(e) => showImage(e, index)}
                src={"/assets/uploads/images/galleries/" + image.src}
                alt=""
                id={index === images.length - 1 ? "last" : ""}
              />
            </figure>
          ))}
          {images.length < 1 && (
            <p className="c-white t-center">
              Il n'y a pas d'images dans cette galerie
            </p>
          )}
        </div>

        <div
          className={`spinner ${!isFetchingNewImages ? "spinner-hidden" : ""}`}
        >
          <svg width="100" height="100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="white"
              strokeWidth="10"
              fill="transparent"
              strokeDashoffset={5}
              strokeDasharray={40}
            />
          </svg>
        </div>
      </div>

      <MoreItems
        hidden={!canSearchNewImages}
        callback={canSearchNewImages ? handleImagesOffset : null}
      />
    </>
  );
}

export default GalleryImages