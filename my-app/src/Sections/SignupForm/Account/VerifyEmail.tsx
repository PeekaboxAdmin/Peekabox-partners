import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../Components/Image/Image';
import Heading from '../../../Components/Heading/Heading';
import Button from '../../../Components/Button/Button';
import SignupImage from '../../../assets/images/Signup.png'
import VerificationCodeInput from '../../../Components/VerificationCodeInput/VerificationCodeInput';
import FooterLinks from '../../../Components/FooterLink/FooterLinks';
import '../Style/Signup.css';

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');


  const mockVerifyCode = async (code: string) => {
    return code === '1234'; 
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const codeIsValid = await mockVerifyCode(verificationCode.trim());
    if (codeIsValid) {
      
      navigate('/password');
    } else {
      setErrorMessage('Invalid verification code. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="left-section">
        <Image imageSrc={SignupImage} />
      </div>
      <div className="right-section">
        <form onSubmit={handleCodeSubmit} className="login-form">
          <div className="heading-container">
            <Heading title="Verify Your Email" subtitle="Almost There! Type in Your Verification Code" className='heading-container' />
            <span className="verifyEmailSpan">Batoul@gmail.com</span>
          </div>
          <VerificationCodeInput 
            value={verificationCode} 
            onChange={setVerificationCode} 
          />
          <Button label="Verify" loading={loading}  className='Green-button' />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
        
        
        <FooterLinks text1=" Didn't get it? " text2="Send me a new email" and="" text3="" dawonLink="Try another method to verify?"/>
      </div>
    </div>
  );
};

export default VerifyEmail;
