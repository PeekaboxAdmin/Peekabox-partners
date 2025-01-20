import React, { useState } from 'react';  
import { useNavigate, Link } from 'react-router-dom';
import Image from '../../../assets/images/Signup.png';
import googleImage from '../../../assets/images/Google.png';

const AccountForm: React.FC<{ onNext: (account: { email: string }) => void }> = ({ onNext }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Mock email verification
  const mockVerifyEmail = async (email: string) => {
    return email === 'test@gmail.com'; // Mock condition for email
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const emailExists = await mockVerifyEmail(email.trim());
    if (emailExists) {
      onNext({ email: email.trim() });
      navigate('/signup/Verify-Email');
    } else {
      setErrorMessage('Email not found. Please sign up.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Side - Image Section */}
      <div
        className="lg:w-3/5 w-full h-1/2 lg:h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${Image})` }}
      ></div>

      {/* Right Side - Form Section */}
      <div className="lg:w-2/5 w-full flex items-start justify-center bg-white mt-[-100px] lg:mt-0 py-16 px-4">
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">Sign up your business</h1>
          <p className="text-sm lg:text-base text-black mb-8">
            Enter your email and get started in a few minutes!
          </p>
          <form className="space-y-4" onSubmit={handleEmailSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-DarkGreen"
            />

            {/* "Already registered? Sign in" link */}
            <p className="text-sm text-gray-600 mt-2 text-right">
              Already registered?{' '}
              <Link to="/signup/login" className="text-pinkCustom font-semibold">
                Sign in
              </Link>
            </p>

            <button
              type="submit"
              className="w-full py-2 bg-DarkGreen text-white rounded-md hover:bg-DarkGreen-hover transition"
            >
              Continue
            </button>
          </form>

          <div className="flex justify-center items-center my-4">
            <div className="w-1/3 border-t border-gray-300"></div>
            <span className="px-2 text-sm text-gray-600">or</span>
            <div className="w-1/3 border-t border-gray-300"></div>
          </div>

          <button
            className="w-3/4 py-1 border border-[#F4F7FE] flex items-center justify-center rounded-md bg-[#F4F7FE] hover:bg-[#F4F7FE] transition duration-200 mx-auto"
          >
            <img
              src={googleImage} 
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            <span className="text-gray-600">Sign in with Google</span>
          </button>

          <p className="text-xs text-gray-500 mt-40">
            By continuing, you agree to our{" "}
            <a href="#" className="text-DarkGreen underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="text-DarkGreen underline">
              Terms and Conditions
            </a>
          </p>
          <p className="text-xs text-black mt-2">
  <a href="#" className="text-pinkCustom">
    Can’t find your store?
  </a>
</p>
        </div>
      </div>
    </div>
  );
};

export default AccountForm;
