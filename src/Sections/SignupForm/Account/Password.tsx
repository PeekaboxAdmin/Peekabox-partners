import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Image from '../../../Components/Image/Image';
import Heading from '../../../Components/Heading/Heading';
import Button from '../../../Components/Button/Button';
import SignupImage from '../../../assets/images/Signup.png';
import PasswordCriteria from '../../../Components/PasswordCriteria';
import '../Style/Signup.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Password: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ''; // Retrieve email from navigation state
  const [password, setPassword] = useState<string>(''); // State for the password
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to validate password
  const isPasswordValid = (password: string): boolean => {
    const hasMinLength = password.length >= 12;
    const hasNumber = /[0-9]/.test(password);
    const hasLetter = /[A-Za-z]/.test(password);
    return hasMinLength && hasNumber && hasLetter;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages

    // Check if email exists
    if (!email) {
      setErrorMessage('Email is missing. Please go back and provide your email.');
      return;
    }

    // Check if the password meets criteria
    if (!isPasswordValid(password)) {
      setErrorMessage('Password must be at least 12 characters long and include both letters and numbers.');
      return;
    }

    try {
      // trigger otp
      const response = await axios.post('https://api-backend.peekabox.net/api/v1/stores/auth/triggerOTP',
        {
          purpose: "SIGNUP",
          email: email
        }
      );
      
      if (response.status === 200) {
        console.log('OTP Triggered');
       navigate('/signup/verify-email', { state: { email, password } });
      }
    } catch (error) {
      console.error('Error setting password:', error);
      setErrorMessage('Failed to set password. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      {/* Left side with logo and slogan */}
      <div className="signup-image">
          <img src={SignupImage} alt="Sign up" className="signup-img" />
      </div>

      <div className="signup-form">
        <form className="login-form" onSubmit={handleFormSubmit}>
          <div className="heading-container">
            <h1 className="signup-title">Create a Password</h1>
            <p className="signup-subtitle">Almost Done! Set Up Your Password</p>
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
          <PasswordCriteria />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <div className="login-button-container">
            <Button label="Continue" className="signup-button" />
          </div>
        </form>


      </div>
    </div>
  );
};

export default Password;
