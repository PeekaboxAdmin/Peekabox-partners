import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Style/Login.css';
import SignupImage from '../../assets/images/Signup.png';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await axios.post(
        'https://api-backend.peekabox.net/api/v1/stores/auth/forgotPassword', 
        { email },
        { withCredentials: true }
      );
      
      if (response.data.success) {
        setIsSubmitted(true);
        setMessage('Reset link sent! Please check your email.');
        // Optionally redirect to a confirmation page or reset page
        // setTimeout(() => navigate('/reset-password'), 3000);
      } else {
        setIsError(true);
        setMessage(response.data.errorMessage || 'Failed to request password reset.');
      }
    } catch (error: any) {
      setIsError(true);
      setMessage(error.response?.data?.errorMessage || 'An error occurred. Please try again later.');
      console.error('Password reset request error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      {/* Left side with logo and slogan */}
      <div className="signup-image">
        <img src={SignupImage} alt="Forgot Password" className="signup-img" />
      </div>

      {/* Right side with form */}
      <div className="signup-form">
        <h1 className="signup-title">Forgot Password</h1>
        {!isSubmitted ? (
          <>
            <p className="signup-subtitle">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group-login">
                <label className="signup-label">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              {message && (
                <p className={`message ${isError ? 'error' : 'success'}`}>
                  {message}
                </p>
              )}
              
              <div className="login-button-container">
                <button 
                  type="submit" 
                  className="signup-button"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Reset Password'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="success-message">
            <p className="success-text">{message}</p>
            <div className="login-button-container">
              <button 
                onClick={() => navigate('/signup/login')} 
                className="signup-button"
              >
                Back to Login
              </button>
            </div>
          </div>
        )}
        
        <div className="login-additional-links">
          <p className="signup-link">
            Remembered your password? <a href="/signup/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;