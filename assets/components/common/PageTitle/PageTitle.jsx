import React from 'react'

const PageTitle = ({tag,title,className = ""}) => {
    const Component = tag || 'h1'
  return (
 
    <div className={`page-title ${className}` }>
        <Component className='page-title-title'>{title}</Component>
    </div>
  )
}

export default PageTitle