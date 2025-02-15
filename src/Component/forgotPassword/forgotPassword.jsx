import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from '../Login/Login.module.css';
import {Hostlink} from '../Hostlink/Hostlink.jsx';
const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post(`${Hostlink}/user/forgot-password`, formData);
      setMessage(response.data.message);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Password reset failed');
    }
  };

  return (
    <div className={style.container}>
      <h2>Forgot Password</h2>
      <form className={style.mainCard} onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email"value={formData.email}onChange={handleChange} required />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} required />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ForgotPassword;
