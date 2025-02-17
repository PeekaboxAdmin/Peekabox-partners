import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Image from '../../../Components/Image/Image';
import Heading from '../../../Components/Heading/Heading';
import Button from '../../../Components/Button/Button';
import SignupImage from '../../../assets/images/Signup.png';
import VerificationCodeInput from '../../../Components/VerificationCodeInput/VerificationCodeInput';
import FooterLinks from '../../../Components/FooterLink/FooterLinks';
import '../Style/Signup.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setStoreAuth } from '../../../GlobalStateManagement/storeAuthSlice';

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ''; // Retrieve email from navigation state
  const password = location.state?.password || ''; // Retrieve password from navigation state

  const [verificationCode, setVerificationCode] = useState<string>(''); 
  const [otp, setOtp] = useState<string>(''); // State to store OTP value
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
const dispatch = useDispatch();

  

  

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); 
   //
    try {
      // API call to verify the OTP
      const response = await axios.post('https://api-backend.peekabox.net/api/v1/stores/auth/verifyOTP', {
          purpose: "SIGNUP",
          email: email,
          OTPValue: otp,
          password: password
      },
      { 
        withCredentials: true, 
      }
    
    );
      if (response.status === 200) {
        console.log('OTP verified successfully');
        const storeId = response.data.data.storeAuth._id;
        console.log(storeId)
         dispatch(setStoreAuth({ Store_id: storeId }));
        // Navigate to the dashboard or success page
        navigate('/StoreCreate');

      }
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data?.errorMessage || 'Failed to verify OTP. Please try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
      console.log(email)
      console.log(otp)
   
    } finally {
      setLoading(false);
    }
  };

    // Handle OTP input change
    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      // Only allow numeric input for OTP
      if (/^\d*$/.test(value)) {
        setOtp(value);
      }
    };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
       {/* Left side with logo and slogan */}
       <header className="flex md:hidden justify-center items-center flex-col p-4 bg-white w-full">
        <h1 className="text-3xl font-bold text-pink-500">Peekabox</h1>
        <p className="text-sm italic text-pink-500 mt-2 hidden md:block">"Help us reduce waste"</p>
      </header>

      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-white p-8">
        <h1 className="text-4xl font-bold mb-2 p-2 text-pink-500">Peekabox</h1>
        <p className="text-lg italic text-pink-500 hidden md:block">"Help us reduce waste"</p>
      </div>


      <div className="flex justify-center items-center w-full md:w-1/2 mt-12 md:mt-12">
      <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-md">
        <form onSubmit={handleCodeSubmit} className="login-form">
          <div className="heading-container">
            <Heading
              title="Verify Your Email"
              subtitle="Almost There! Type in Your Verification Code"
              className="heading-container"
            />
            <span className="verifyEmailSpan">{email}</span>
          </div>
        {/*  <VerificationCodeInput 
            value={verificationCode} 
            onChange={setVerificationCode} 
          /> */}
          <input
        type="digit"
        value={otp}
        onChange={handleOtpChange}
        maxLength={6} // OTP length, assuming it's 6 digits
        placeholder="Enter OTP"
        required
      />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <div className="login-button-container">
            <Button label="Verify" loading={loading} className="Green-button" />
          </div>
        </form>
        
        <div className="flex justify-between items-center mt-4 text-sm">
            <a href="/register" className="text-black hover:underline">
              Didn't get ? Click here to resend code.
            </a>
            </div>
        
       
      </div>
    </div>
    </div>
  );
};

export default VerifyEmail;
