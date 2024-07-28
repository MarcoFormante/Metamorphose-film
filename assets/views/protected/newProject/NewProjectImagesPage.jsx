import React from 'react'

const NewProjectImagesPage = ({handleImages}) => {
  return (
    <div>
        <div className='inpt-container'>
          <label htmlFor='p-images'>Project Images</label>
          <input type='file' required id='p-images' name='p-images' accept='.jpg,.jpeg,.png,.webp' multiple onChange={(e)=>handleImages(e.target.files)} />
        </div>
    </div>
  )
}

export default NewProjectImagesPage