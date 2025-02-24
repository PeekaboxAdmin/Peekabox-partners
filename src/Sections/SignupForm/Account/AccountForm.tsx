import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Image from '../../../Components/Image/Image';
import Heading from '../../../Components/Heading/Heading';
import Button from '../../../Components/Button/Button';

import SignupImage from '../../../assets/images/Signup.png';
import Separator from '../../../Components/Separator/Separator';
import AuthButton from '../../../Components/AuthButton/AuthButton';
import FooterLinks from '../../../Components/FooterLink/FooterLinks';

import '../Style/Signup.css';

const AccountForm: React.FC<{ onNext: (account: { email: string }) => void }> = ({ onNext }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
  
    try {
      const response = await axios.post(
        'https://api-backend.peekabox.net/api/v1/stores/auth/initAuth',
        { email: email.trim() }
      );
  
      if (response.status === 404) {
        onNext({ email: email.trim() });
        navigate('/signup/password', { state: { email: email.trim() } });
      } else if (response.status === 200) {
        setErrorMessage('User Found');
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    } catch (error: any) {
      // Check if the error is specifically a 404 and handle navigation
      if (error.response?.status === 404) {
        onNext({ email: email.trim() });
        navigate('/signup/Password', { state: { email: email.trim() } });
      } else {
        // Handle other errors
        setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  //
  

  return (
    <div className="signup-container">
    {/* Left side with logo and slogan */}
      <div className="signup-image">
          <img src={SignupImage} alt="Sign up" className="signup-img" />
      </div>

    {/* Right side with registration form */}
      <div className="signup-form">
        
        <form onSubmit={handleEmailSubmit} className="login-form">
          <div className="heading-container">
            <h1 className="signup-title">Sign up your business</h1>
            <p className="signup-subtitle">Enter your email and get started in a few minutes!</p>
          </div>

          <div className="input-group-login password-input">
            <label className="signup-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signup-input"
              placeholder="Enter your email"
              required
            />
          </div>
          

          <div className="login-button-container">
            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? 'Processing...' : 'Continue'}
            </button>
          </div>
          
          {errorMessage && <p className="signup-error">{errorMessage}</p>}
        </form>
        
        <p className="signup-link">
          Already have an account? <a href="/signup/login">Sign in</a>
        </p>
      </div>
  </div>
  );
};

export default AccountForm;
