import './Signup.css'
import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const formref=useRef()
  const emailref=useRef()
  const passwordref=useRef()
  const confirmref=useRef()
  const navigate = useNavigate()

   const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordref.current.value !== confirmref.current.value) {
      alert("Password and Confirm Password do not match");

      return;
    }

    const signupDetails = {
      email: emailref.current.value,
      password: passwordref.current.value,
      confirmPassword: confirmref.current.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/users/signup",
        signupDetails
      );

      if (response.status === 201) {
        alert("User signed up successfully");
        navigate("/login"); 
      } else {
        throw new Error("Failed to signup");
      }
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.err || err.message || "Something went wrong");
    }
  };

 

  return (
    <>
    <div className='heading'><h1>Signup</h1></div>
    <form ref={formref} id='form' onSubmit={handleSubmit}>
        <label htmlFor="usernameid"></label>Email:
        <input ref={emailref} type="email" name="username" id="usernameid" required/><br />

        <label htmlFor="emailid"></label>Password:
        <input ref={passwordref} type="text" name="email" id="emailid" required></input><br />

        <label htmlFor="passwordid"></label>Confirm Password:
        <input ref={confirmref} type="password" name="password" id="passwordid" required></input><br />

        <button type='submit'>Signup</button>
    </form>
    
    </>
  )
}

export default Signup