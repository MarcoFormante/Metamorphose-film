import React from 'react'

const StaffList = ({title,items,className}) => {
    return items && (
      <React.Fragment>
         <h2>{title}</h2>
          <ul className='items-list'>
            {items?.split(',').map((item, i) => <li key={item +  i + className} className={className + "_item"}>{item}</li>)}
          </ul>
      </React.Fragment>
    )
  }

export default StaffList


