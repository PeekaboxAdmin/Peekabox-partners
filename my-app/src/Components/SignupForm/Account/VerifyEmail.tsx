import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../Image/Image';
import Heading from '../../Heading/Heading';
import Button from '../../Button/Button';
import SignupImage from '../../../assets/images/Signup.png'
import VerificationCodeInput from '../../VerificationCodeInput/VerificationCodeInput';
import '../Style/Signup.css';

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState<string>(''); // State to hold the full code input
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Mock function to verify the code
  const mockVerifyCode = async (code: string) => {
    return code === '1234'; // Mock condition for a correct code
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
            <Heading title="Verify Your Email" subtitle="Almost There! Type in Your Verification Code" />
            <span className="verifyEmailSpan">Batoul@gmail.com</span>
          </div>
          <VerificationCodeInput 
            value={verificationCode} 
            onChange={setVerificationCode} // Directly updates the verificationCode
          />
          <Button label="Verify" loading={loading} />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
        
        <div className="bottom-links1">
          <p className="terms">
            Didn't get it? Send me a new email
          </p>
          <p className="find-store">
            <a href="/">Try another method to verify?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
