import React, { useState } from 'react';
import axios from 'axios';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/signup', {
        username,
        email,
        password,
      });
      // You can add success feedback or navigation here
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/login', {
        email,
        password,
      });
      // You can add success feedback or navigation here
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        {isLogin ? (
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <div className="loginsignup-fields">
              <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
            <p className="loginsignup-login"> Don't have an account? <span onClick={() => setIsLogin(false)}>Signup</span> </p>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <h1>Signup</h1>
            <div className="loginsignup-fields">
              <input type="text" placeholder='Enter your name' value={username} onChange={(e) => setUsername(e.target.value)} />
              <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Signup</button>
            <p className="loginsignup-login"> Already have an account? <span onClick={() => setIsLogin(true)}>Login</span> </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
