import React,{useRef} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Details = () => {
    const formref = useRef();
    const fullnameref = useRef();
    const photoref = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please login first!");
            navigate('/login');
            return;
        }

        const details = {
            name: fullnameref.current.value,
            photoURL: photoref.current.value
        };

        try {
            const response = await axios.post(
                "http://localhost:3000/users/update",details,{
                    headers: { 'Authorization': token }   
                }
            );

            if (response.status === 200) {
                alert(" Profile updated successfully!");
                navigate("/expence"); // Back to expense page
            }
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Update failed!");
        }
    };

    const handleCancel = () => {
        navigate("/expence");
    };
  return (
    <>
    
    <form ref={formref} onSubmit={handleSubmit}>
        
        <label htmlFor="fullname"></label>FullName:
        <input ref={fullnameref}type="text" name='fullname' id='fullname' required/>

        <label htmlFor="photo"></label>Profile Photo:
        <input ref={photoref} type="url" name='photo' id='photo' required/>

        <button type='submit'>Update</button>
        
        <button onClick={handleCancel} type='submit'>Cancel</button>
    
    </form>
    </>
  )
}

export default Details