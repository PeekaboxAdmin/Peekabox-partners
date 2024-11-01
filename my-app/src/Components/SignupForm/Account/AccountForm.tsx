import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Image from '../../Image';
import Heading from '../../Heading';
import Button from '../../Button';
import SignupImage from '../../Login/Style/images/Signup.png'; // Adjust path as necessary
import SearchBar from '../../SearchBar';

// import '../../Login/Style/Login.css'
import '../Style/Signup.css';

const AccountForm: React.FC<{ onNext: (account: { email: string; password: string }) => void }> = ({ onNext }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const mockVerifyEmail = async (email: string) => {

    return email === "batoul@gmail.com"; 
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const emailExists = await mockVerifyEmail(email.trim()); // Trim whitespace
    if (emailExists) {
      setIsEmailVerified(true);
    } else {
      setErrorMessage('Email not found. Please sign up.');
    }
    setLoading(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const accountData = { email, password };

    // Simulate login process (replace with actual API call)
    console.log('Account Data:', accountData);
    onNext(accountData);
    navigate('/account'); // Redirect to account page
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="left-section">
        <Image imageSrc={SignupImage} />
      </div>
      <div className="right-section">
        {!isEmailVerified ? (
          <form onSubmit={handleEmailSubmit} className="login-form">
            <div className="heading-container">
              <Heading title="Sign up your business"
                       subtitle="Find your store and get started in a few minutes!" />
              
            </div>
            
            <div className="input-group">
              <label>Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="already-registered">
                Already registered? <Link to="/login">Sign in</Link>
              </div>
            </div>

            <Button
              label="Continue"
              loading={loading}
            />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="login-form">
            <div className="heading-container">
              <Heading title="Enter your Password" subtitle="" />
            </div>
            <div className="input-group password-input">
              <label>Password *</label>
              <input
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
            <Button
              label="Create Account"
              loading={loading}
            />
            
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </form>
        )}
        <p className="terms">
          By continuing, you agree to our <a href="/privacy-policy">Privacy Policy</a> and <a href="/terms">Terms and Conditions</a>
        </p>
        <p className="find-store">
          <a href="/">Can't find your store?</a>
        </p>
      </div>
    </div>
  );
};

export default AccountForm;
