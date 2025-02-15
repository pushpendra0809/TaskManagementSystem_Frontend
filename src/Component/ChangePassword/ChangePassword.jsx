import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from '../ChangePassword/ChangePassword.module.css';
import SideNavbar from '../../Admin/SideNavbar/SideNavbar.jsx';
import {Hostlink} from '../Hostlink/Hostlink.jsx';
const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
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
      const token = localStorage.getItem('token');

      const response = await axios.post(
        `${Hostlink}/user/change-password/`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }, 
        }
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Password change failed');
    }
  };

  return (
    <>
    <div className={style.withNavbar}>
    <SideNavbar />
    <div className={style.container}>
      <h2>Change Password</h2>
      <form className={style.mainCard} onSubmit={handleSubmit}>
        <div>
          <label>Current Password:</label>
          <input
            type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange}  required />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} required />
        </div>
        <button type="submit">Change Password</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    </div>
    </>
  );
};

export default ChangePassword;
