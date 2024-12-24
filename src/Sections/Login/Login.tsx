import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Image from '../../Components/Image/Image';
import Heading from '../../Components/Heading/Heading';
import ForgotPassword from './ForgotPassword';
import Button from '../../Components/Button/Button';
import CheckboxWithLabel from '../../Components/CheckboxWithLabel/CheckboxWithLabel';

import login from '../../assets/images/login.png';
import './Style/Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Checkbox state
  const [isChecked, setIsChecked] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const checkEmailExists = async (email: string) => {
    // Mock email verification
    return email === 'test@gmail.com';
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

    // Mock login request
    try {
      // Simulate API call
      if (email === 'test@gmail.com' && password === 'password123') {
        localStorage.setItem('token', 'mockToken123');
        console.log('Login successful');
        navigate('/');
      } else {
        setErrorMessage('Invalid email or password.');
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
              <Heading
                title="Sign in to your account"
                subtitle="Welcome Back! Let's get you Signed In"
                className="heading-container"
              />
            </div>
            <div className="input-group">
              <input
                placeholder="Enter your Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='login-button-container'>
            <Button label="Continue" loading={loading} className="Green-button" />
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="login-form">
            <div className="heading-container">
              <Heading
                title="Enter your Password"
                subtitle="Let's Keep It Safe - Enter Your Password"
                className="heading-container"
              />
            </div>
            <div className="input-group password-input">
              <input
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
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
              <CheckboxWithLabel
                label="Keep me logged in"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <ForgotPassword />
            </div>
            <div className='login-button-container'>

            <Button label="Sign In" loading={loading} className="Green-button" />
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
