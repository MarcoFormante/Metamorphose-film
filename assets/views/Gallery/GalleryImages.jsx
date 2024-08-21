import React, {useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ImageViewer from '../../components/UI/imageViewer/ImageViewer'
import { axiosInstance } from '../../api/axiosInstance'
import Fallback from '../../components/UI/Spinner/Spinner'
import { purifyImages } from '../../security/Dompurify/purify'
import MoreItems from '../../components/common/ShowMoreButton/ShowMoreButton'
import BackButton from '../../components/common/BackButton/BackButton'
import { getGalleryImages } from '../../api/imagesApi'

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

    
    // handle body overflow when image is showing in lightbox
    useEffect(()=>{
        if (isShowingImage) {
            document.body.style.overflow = "hidden"
        }else{
            document.body.style.overflow = "auto"
        }
    },[isShowingImage])


    // check if there are more images to fetch
    useEffect(()=>{
      if (totalImages > newImageLength) {
          setCanSearchNewImages(true)
      }else{
          setCanSearchNewImages(false)
      }
    },[totalImages,newImageLength])



    // check if the gallery name is valid
    useEffect(()=>{
      images.length < 1 ? setIsLoading(true) : setIsFetchingNewImages(true)
      const galleries=["concert","tournage","studio","evenements"]
      if(!galleries.includes(location?.state?.toLowerCase())){
          navigate('/galerie')
      }
    },[])


    // fetch images and if imageOffset is greater than 0 fetch new images and show loading spinner
    useEffect(()=> {
      const fetchImages = async()=>{
        if (imageOffset > 0) {
            setIsFetchingNewImages(true)
          }
        try {
          const galleryName = location.state
          const {imgs,total} = await getGalleryImages(galleryName, imageOffset)
          const purifiedImgs = purifyImages(imgs)
          setImages([...images,...purifiedImgs])
          total > 0 &&  setTotalImages(total)
          setNewImageLength(purifiedImgs.length) 
          setIsFetchingNewImages(false)
        } catch (error) {
          console.log(error);
        }finally{
          setIsLoading(false)
          setIsFetchingNewImages(false)
        }
    }
    fetchImages()
    },[imageOffset])


    // handle images offset when user clicks on show more button
    const handleImagesOffset = ()=>{
      if (canSearchNewImages) {
          setImageOffset(prev => prev + 1)
          setCanSearchNewImages(false)
      }
    }

  return  images && 
  (
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

        <ImageViewer
          isShowingImage={isShowingImage}
          isSrc={true}
          imgSrc={imgSrc}
          setImgSrc={setImgSrc}
          setIsShowingImage={setIsShowingImage}
          images={images}
        />

        <div className="gallery__images__flex">
          {images.map((image, index) => (
            <figure key={image.src + index}>
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