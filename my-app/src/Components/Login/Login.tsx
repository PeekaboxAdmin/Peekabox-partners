import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Image from '../Image/Image';
import Heading from '../Heading/Heading';
import ForgotPassword from './ForgotPassword';
import Button from '../Button/Button';
import CheckboxWithLabel from '../CheckboxWithLabel/CheckboxWithLabel'

import login from '../../assets/images/login.png'
import './Style/Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const checkEmailExists = async (email: string) => {
    return email === "batoul@gmail.com"; 
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      setIsEmailVerified(true);
    } else {
      setErrorMessage('Email not found. Please sign up.');
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const loginData: { email: string; password: string } = { email, password };

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        console.log('Login successful:', data);
        navigate('/dashboard');
      } else {
        setErrorMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="left-section">
        <Image imageSrc={login} />
      </div>
      <div className="right-section">
        {!isEmailVerified ? (
          <form onSubmit={handleEmailSubmit} className="login-form">
            <div className="heading-container">
              <Heading title="Sign in to your account" subtitle="Welcome Back!Let's get you Signed In" />
            </div>
            <div className="input-group">
              
              <input
              placeholder='Enter your Email'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button
              label="Countinue"
              loading={loading}
            />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="login-form">
            <div className="heading-container">
              <Heading title="Enter your Password" subtitle="Let's Keep It Safe - Enter Your Password" />
            </div>
            <div className="input-group password-input">
              
              <input
              placeholder='Password'
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            
            <div className="options-row">
                        <CheckboxWithLabel />
                        <ForgotPassword />
                    </div>

             
            <Button
              label="Sign In"
              loading={loading}
            />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            
          </form>
        )}
       
      </div>
    </div>
  );
};

export default Login;
