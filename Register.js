import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const userObject = {
    fname: "",
    lname: "",
    email: "",
    username: "",
    password: ""
  }
const Register = () => {
  const [user, setUser] = useState(userObject);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior
    // Replace with your actual registration API URL
    const apiURL = 'http://localhost:3001/register';

    try {
      const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        alert('Registered successfully!');
        // Clear the form
        setUser(userObject);
        // Optionally, navigate to the login page or another page
      } else {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed: An unexpected error occurred.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input 
          type="text" 
          name="fname" 
          value={user.fname} 
          onChange={handleChange} 
          placeholder="First Name" 
        />
        <input 
          type="text" 
          name="lname" 
          value={user.lname} 
          onChange={handleChange} 
          placeholder="Last Name" 
        />
        <input 
          type="email" 
          name="email" 
          value={user.email} 
          onChange={handleChange} 
          placeholder="Email" 
        />
        <input 
          type="text" 
          name="username" 
          value={user.username} 
          onChange={handleChange} 
          placeholder="Username" 
        />
        <input 
          type="password" 
          name="password" 
          value={user.password} 
          onChange={handleChange} 
          placeholder="Password" 
        />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;

