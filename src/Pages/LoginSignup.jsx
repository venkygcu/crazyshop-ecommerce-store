import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const ENABLE_MOCK = String(process.env.REACT_APP_ENABLE_MOCK_DATA).toLowerCase() === 'true';

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (ENABLE_MOCK) {
        await new Promise(res => setTimeout(res, 500));
        localStorage.setItem('authToken', 'mock-signup-token');
        window.dispatchEvent(new Event('auth-changed'));
        setSuccess('Signup successful. Redirecting...');
        navigate('/');
        return;
      }
      const res = await api.post('/auth/signup', {
        username,
        email,
        password,
      });
      const token = res?.data?.token;
      if (token) localStorage.setItem('authToken', token);
      window.dispatchEvent(new Event('auth-changed'));
      setSuccess('Signup successful. Redirecting...');
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (ENABLE_MOCK) {
        await new Promise(res => setTimeout(res, 500));
        localStorage.setItem('authToken', 'mock-login-token');
        window.dispatchEvent(new Event('auth-changed'));
        setSuccess('Login successful. Redirecting...');
        navigate('/');
        return;
      }
      const res = await api.post('/auth/login', {
        email,
        password,
      });
      const token = res?.data?.token;
      if (token) localStorage.setItem('authToken', token);
      window.dispatchEvent(new Event('auth-changed'));
      setSuccess('Login successful. Redirecting...');
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        {isLogin ? (
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <div className="loginsignup-fields">
              <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && <p className="form-error">{error}</p>}
            {success && <p className="form-success">{success}</p>}
            <button type="submit" disabled={loading}>{loading ? 'Processing...' : 'Login'}</button>
            <p className="loginsignup-login"> Don't have an account? <span onClick={() => setIsLogin(false)}>Signup</span> </p>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <h1>Signup</h1>
            <div className="loginsignup-fields">
              <input type="text" placeholder='Enter your name' value={username} onChange={(e) => setUsername(e.target.value)} required />
              <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && <p className="form-error">{error}</p>}
            {success && <p className="form-success">{success}</p>}
            <button type="submit" disabled={loading}>{loading ? 'Processing...' : 'Signup'}</button>
            <p className="loginsignup-login"> Already have an account? <span onClick={() => setIsLogin(true)}>Login</span> </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
