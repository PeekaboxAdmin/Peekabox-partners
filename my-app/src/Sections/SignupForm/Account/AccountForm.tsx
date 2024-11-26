import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Image from '../../../Components/Image/Image';
import Heading from '../../../Components/Heading/Heading';
import Button from '../../../Components/Button/Button';

import SignupImage from '../../../assets/images/Signup.png'
import Separator from '../../../Components/Separator/Separator';
import AuthButton from '../../../Components/AuthButton/AuthButton';
import FooterLinks from '../../../Components/FooterLink/FooterLinks';

import '../Style/Signup.css';

const AccountForm: React.FC<{ onNext: (account: { email: string }) => void }> = ({ onNext }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Mock email verification
  const mockVerifyEmail = async (email: string) => {
    return email === 'batoul@gmail.com'; // Mock condition for email
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const emailExists = await mockVerifyEmail(email.trim());
    if (emailExists) {
      
      onNext({ email: email.trim() });
     
      navigate('/Verify-Email');
    } else {
      setErrorMessage('Email not found. Please sign up.');
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="left-section">
        <Image imageSrc={SignupImage} />
      </div>
      <div className="right-section">
        <form onSubmit={handleEmailSubmit} className="login-form">
          <div className="heading-container">
            <Heading title="Sign up your business" subtitle="Enter your email and get started in a few minutes!" className='heading-container' />
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
              Already registered? <Link to="/login">Sign in</Link>
            </div>
          </div>
          <Button label="Continue" loading={loading} className='Green-button' />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
        <Separator />
        <AuthButton />
        <FooterLinks text1="By continuing, you agree to our" text2="Privacy Policy" and="and" text3="Terms and Conditions" dawonLink="Can't find your store?"/>
      </div>
    </div>
  );
};

export default AccountForm;
