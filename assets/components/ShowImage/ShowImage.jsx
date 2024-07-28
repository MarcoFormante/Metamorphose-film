import React from 'react'

export const ShowImage = ({isShowingImage,imgSrc,setImgSrc,setIsShowingImage,images,isSrc}) => {
  return (
    <>
    
    { isShowingImage && <div className='black__background'>
        <img src={isSrc ? "/assets/uploads/images/galleries/" + images[imgSrc].src : images[imgSrc].src } alt=''/>
        <span role='button' className='btn-exit' onClick={()=>{
            setImgSrc(null)
            setIsShowingImage(false)
        }}>X</span>

        <span role='button' className='btn-right' onClick={()=>{
             setImgSrc(imgSrc + 1)
             if (images.length - 1 === imgSrc  ) {
                setImgSrc(0)
                return
            }
            
        }}>{">"}</span>

        <span role='button' className='btn-left' onClick={()=>{
                        setImgSrc(imgSrc - 1)
                        if (0 === imgSrc  ) {
                            setImgSrc(images.length - 1)
                            return
                        }
                    }}>{"<"}</span>
        </div>}
        </>
  )
}
