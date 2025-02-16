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
        navigate('/signup/Password', { state: { email: email.trim() } });
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

    {/* Right side with registration form */}
    <div className="flex justify-center items-center w-full md:w-1/2 mt-12 md:mt-12">
      <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-md">
        <h1 className="text-2xl font-bold mb-6 text-start">Sign up you business today</h1>
        <form onSubmit={handleEmailSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <button
            type="submit"
            className="Green-button"
          >
            Continue
          </button>
        </form>

        {/* Links for additional actions */}
        <div className="flex justify-between items-center mt-4 text-sm">
          {errorMessage}
        </div>

        {/* Links for additional actions */}
        <div className="flex justify-between items-center mt-4 text-sm">
          <a href="/login" className="text-pink-600 hover:underline">
            Already have an account?
          </a>
        </div>

        <div className="flex justify-between items-center mt-8 text-sm">
          <a href="/login" className="text-pink-600 hover:underline">
            By continue you agree to our terms and condition
          </a>
        </div>

      </div>
    </div>
  </div>
  );
};

export default AccountForm;
