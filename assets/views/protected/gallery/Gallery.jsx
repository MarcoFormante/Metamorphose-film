import React, { useCallback, useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '../../../middleware/axiosInstance'
import Fallback from '../../../components/Spinner/Fallback'
import { ShowImage } from '../../../components/ShowImage/ShowImage'


const galleries=[
    "Concert",
    "Tournage",
    "Studio",
    "Evenements"
]

const Gallery = () => {
const param = useParams()
const navigate = useNavigate()
const [images, setImages] = useState([])
const [isLoading, setIsLoading] = useState(true)
const [isShowingImage,setIsShowingImage] = useState(false)
const [imgSrc,setImgSrc] = useState(null)


    useEffect(() => {
        if(!galleries.includes(param.name)){
            navigate('/admin/galleries')
        }
    }, [])

    const showImage = useCallback((e,index)=>{
        setIsShowingImage(true)
        setImgSrc(index)
    },[setIsShowingImage,setImgSrc])

    useEffect(()=>{
        if (isShowingImage) {
            document.body.style.overflow = "hidden"
        }else{
            document.body.style.overflow = "auto"
        }
    },[isShowingImage])

    useEffect(() => {
        const getImages = async() => {
            setIsLoading(true)
            axiosInstance.get(`/gallery/${param.name}`)
            .then((res)=>{
                if(res.status === 200){
                    setImages(res.data.images)
                    setIsLoading(false)
                }
                if (res?.data?.error) {
                    console.error(res.data.error)
                }
            }).catch(err => {
                console.error(err)
                setIsLoading(false)
            })
        }
            getImages()
    }, [])

    const deleteImg = (id) => {
        setIsLoading(true)
        axiosInstance.delete(`admin/gallery/image/${id}`)
        .then(res => {
            if(res.status === 200){
                setImages(images.filter(img => img.id !== id))
                alert('Image deleted successfully')
                setIsLoading(false)
            }
        }).catch(err => {
            console.error(err)
            setIsLoading(false)
        })
    }

  return (
    <div className='admin-gallery'>
            <div className='gallery__images'>
            <ShowImage isShowingImage={isShowingImage} isSrc={true} imgSrc={imgSrc} setImgSrc={setImgSrc} setIsShowingImage={setIsShowingImage} images={images}/>
            </div>
        
      {isLoading &&  <Fallback/>}
        <div className='admin-gallery__header'>
            <h1>Gallery {param.name}</h1> 
            <Link to={"/admin/gallery/add"} state={{name:param.name}}>+ Add</Link>
        </div>
    
        <div className="gallery-images">
            {images.length > 0 ? images.map((img, index) => {
                return (
                    <div key={img.id} className="gallery-images__img-container">
                        <img onClick={(e)=>showImage(e,index)} src={"/assets/uploads/images/galleries/" + img.src} alt="Img-gallery" />
                        <span onClick={()=>deleteImg(img.id)}>X</span>
                    </div>
                )
            }) : <p className=''>No images in this gallery</p>
        }
        </div>
    </div>
  )
}

export default Gallery