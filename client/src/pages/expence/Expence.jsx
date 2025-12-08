import React from 'react'
import { Link } from 'react-router-dom'

export const Expence = () => {
  return (
    <>
    <div>Welcome to Expence page</div>
    <h4>Your profile is Incomplete Click below!!!</h4>
    <Link to="/details">Complete Details</Link> 
    </>
    
  )
}
