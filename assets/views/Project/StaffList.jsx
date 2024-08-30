import React from 'react'

const StaffList = ({title,items,className}) => {
    return items && (
      <div className='staff-list-flex-item'>
         <h2>{title}</h2>
          <ul className='items-list'>
            {items?.split(',').map((item, i) => <li key={item +  i + className} className={className + "_item"}>{item}</li>)}
          </ul>
      </div>
    )
  }

export default StaffList


