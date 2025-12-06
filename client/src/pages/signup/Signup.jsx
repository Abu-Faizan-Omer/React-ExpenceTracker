import React from 'react'
import './Signup.css'

const Signup = () => {
  return (
    <>
    <div className='heading'><h1>Signup</h1></div>
    <form action="" id='form'>
        <label htmlFor="usernameid"></label>Username:
        <input type="text" name="username" id="usernameid" required/><br />

        <label htmlFor="emailid"></label>Email:
        <input type="text" name="email" id="emailid" required></input><br />

        <label htmlFor="passwordid"></label>Password:
        <input type="password" name="password" id="passwordid" required></input><br />

        <button type='submit'>Signup</button>
    </form>
    
    </>
  )
}

export default Signup