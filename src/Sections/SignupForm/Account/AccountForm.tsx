import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Image from '../../../Components/Image/Image';
import Heading from '../../../Components/Heading/Heading';
import Button from '../../../Components/Button/Button';
import axios from 'axios';

import SignupImage from '../../../assets/images/Signup.png'
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
      const response = await axios.post('http://localhost:8100/api/v1/stores/auth/initAuth', { email });
    
      if (response.status === 200) {
        console.log('Init success');
        navigate('/signup/login');
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Handle HTTP errors
          if (error.response.status === 404) {
            console.log('Sign-up email not found, navigating to password page');
            navigate('/signup/password', { state: { email } });
          } else {
            console.log('Sign-in failed:', error.response.data?.errorMessage || 'Unknown error');
            setErrorMessage('Sign-in failed: ' + (error.response.data?.errorMessage || 'Unknown error'));
          }
        } else {
          // Handle no response (network error)
          console.log('Network Error:', error.message);
          setErrorMessage('Network error: ' + error.message);
        }
      } else {
        // Handle unexpected errors
        console.log('Unexpected Error:', error);
        setErrorMessage('Unexpected error: ' + error);
      }
    }

  }
    

  return (
    <div className="login-page">
      <div className="left-section">
        <Image imageSrc={SignupImage} />
      </div>
      <div className="right-section">
        <form onSubmit={handleEmailSubmit} className="login-form">
          <div className="heading-container">
            <Heading title="Individual Store Sign up" subtitle="Enter your email and get started in a few minutes!" className='heading-container' />
          </div>
          <div className="input-group">
            <input
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="already-registered">
              Already registered? <Link to="/signup/login">Sign in</Link>
            </div>
          </div>
          <div className='login-button-container'>
           <Button label="Continue" loading={loading} className='Green-button' />
          </div>
          <div>
              <strong>If you are multiple chain brand please contact this number for registration +445882843048</strong>
            </div>

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
        <FooterLinks text1="By continuing, you agree to our" text2="Privacy Policy" and="and" text3="Terms and Conditions" dawonLink="Can't find your store?"/>
      </div>
    </div>
  );
};

export default AccountForm;
