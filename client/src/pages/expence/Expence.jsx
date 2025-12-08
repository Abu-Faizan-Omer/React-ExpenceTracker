import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

export const Expence = () => {
  const navigate = useNavigate();


  const handleLogout=()=>{
    localStorage.clear();
    navigate('/login');
  }
  return (
    <>
    <div>Welcome to Expence page</div>
    <h4>Your profile is Incomplete Click below!!!</h4>
    <Link to="/details">Complete Details</Link> 

    <div>
      <button onClick={handleLogout} type='button'>Logout</button>
    </div>
    </>
    
  )
}
