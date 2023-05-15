import React from 'react'
import { NavLink } from 'react-router-dom';
import './submit.css';
const Submit = () => {
  return (
    <div>
      <p className='para1'>Terribly Tiny Tale Assignment</p>
      <NavLink to="home" /*style={({ isActive }) => ({ 
                            color: isActive ? 'greenyellow' : 'white' })}*/>
                            <button id='submit'>Click Me!</button>
                        </NavLink>
      
    </div>
  )
}

export default Submit
