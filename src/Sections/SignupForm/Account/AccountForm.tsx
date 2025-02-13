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
      // Send email and credentials via POST request
      const response = await axios.post(
        'https://api-backend.peekabox.net/api/v1/stores/auth/initAuth',
        { email: email.trim() },
      );

      // Handle response status
      if (response.status === 404) {
        // Navigate to password page when 404 is received
        onNext({ email: email.trim() });
        navigate('/signup/Password');
      } else if (response.status === 200) {
        setErrorMessage('Store Found, please login');
      } else {
        // Handle unexpected response statuses (optional)
        setErrorMessage('Unexpected response, please try again.');
      }
    } catch (error: any) {
      // Handle errors only when there's an issue with the request
      if (error.response) {
        setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
      } else if (error.request) {
        setErrorMessage('No response received from the server.');
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="left-section">
        <Image imageSrc={SignupImage} />
      </div>
      <div className="right-section">
        <form onSubmit={handleEmailSubmit} className="login-form">
          <div className="heading-container">
            <Heading title="Sign up your business" subtitle="Enter your email and get started in a few minutes!" className="heading-container" />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-DarkGreen"
            />
            <div className="already-registered">
              Already registered? <Link to="/signup/login">Sign in</Link>
            </div>
          </div>
          <div className="login-button-container">
            <Button label="Continue" loading={loading} className="Green-button" />
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
        <Separator />
        <FooterLinks text1="By continuing, you agree to our" text2="Privacy Policy" and="and" text3="Terms and Conditions" dawonLink="Can't find your store?" />
      </div>
    </div>
  );
};

export default AccountForm;
