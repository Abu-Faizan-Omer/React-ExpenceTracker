import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());          // redux state + localStorage clear
    navigate('/login');
  };

  return (
    <>
      <div>Welcome to Profile page you have to update</div>
      <h4>Your profile is Incomplete Click below!!!</h4>
      <Link to="/details">Complete Details</Link>

      <div>
        <button onClick={handleLogout} type='button'>Logout</button>
      </div>
    </>
  );
};
