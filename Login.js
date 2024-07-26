import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from './userSlice';


const Login = () => {
  const [loginData, setLoginData] = useState({username:"", password:""});
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const { username, password } = loginData;

    try {
      const response = await fetch('http://localhost:3001/login', { // Replace with your actual backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming you want to store the token and user data in localStorage
        localStorage.setItem('token', data.token);
        console.log(data.user,"user")
        dispatch(setUser(data.user));
        navigate('/dashboard'); // Navigate to the dashboard on successful login
      } else {
        const errorText = await response.text();
        alert(`Login failed: ${errorText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed: An unexpected error occurred.');
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          name="username" 
          value={loginData.username} 
          onChange={handleChange} 
          placeholder="Username" 
        />
        <input 
          type="password" 
          name="password" 
          value={loginData.password} 
          onChange={handleChange} 
          placeholder="Password" 
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;
