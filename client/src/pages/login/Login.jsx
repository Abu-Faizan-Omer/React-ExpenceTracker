import React, { useRef } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';  

const Login = () => {
  const formref = useRef();
  const emailref = useRef();
  const passwordref = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginDetails = {
      email: emailref.current.value,
      password: passwordref.current.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        loginDetails
      );

      if (response.status === 200) {
        const token = response.data.token;
        // redux me token store
        dispatch(login({ token }));
        alert("User Login successfully");
        navigate("/profile");
      } else {
        throw new Error("Failed to login");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.err || err.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className='heading'><h1>Login</h1></div>
      <form ref={formref} id='form' onSubmit={handleSubmit}>
        <label htmlFor="usernameid"></label>Email:
        <input ref={emailref} type="email" id="usernameid" required /><br />

        <label htmlFor="emailid"></label>Password:
        <input ref={passwordref} type="text" id="emailid" required /><br />

        <button type='submit'>Login</button>
      </form>
    </>
  );
};

export default Login;
