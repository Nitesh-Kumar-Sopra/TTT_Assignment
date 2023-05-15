import React from 'react'
import './error.css'
import { NavLink } from 'react-router-dom'
const Error = () => {
    
  
  return (
    <>
    <div>
      <p className='p'>Error 404 </p>
    </div>
    <div className='div11'>
        <NavLink to="/">
        <button className='btn'>Home</button>
        </NavLink>
    </div>
    </>
  )
}

export default Error
