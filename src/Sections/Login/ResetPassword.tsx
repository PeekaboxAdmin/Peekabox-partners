import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Style/Login.css';
import SignupImage from '../../assets/images/Signup.png';
import PasswordCriteria from '../../Components/PasswordCriteria';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  // Extract token from URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const resetToken = queryParams.get('token');
    if (resetToken) {
      setToken(resetToken);
    } else {
      setIsError(true);
      setMessage('Invalid or missing reset token. Please request a new password reset.');
    }
  }, [location.search]);

  const isPasswordValid = (password: string): boolean => {
    const hasMinLength = password.length >= 12;
    const hasNumber = /[0-9]/.test(password);
    const hasLetter = /[A-Za-z]/.test(password);
    return hasMinLength && hasNumber && hasLetter;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    // Validate passwords
    if (!isPasswordValid(password)) {
      setIsError(true);
      setMessage('Password must be at least 12 characters and include both letters and numbers.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setIsError(true);
      setMessage('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'https://api-backend.peekabox.net/api/v1/stores/auth/resetPassword', 
        { 
          token, 
          password 
        },
        { withCredentials: true }
      );
      
      if (response.data.success) {
        setIsSubmitted(true);
        setMessage('Password has been reset successfully!');
        setTimeout(() => navigate('/signup/login'), 3000);
      } else {
        setIsError(true);
        setMessage(response.data.errorMessage || 'Failed to reset password.');
      }
    } catch (error: any) {
      setIsError(true);
      setMessage(error.response?.data?.errorMessage || 'An error occurred. Please try again later.');
      console.error('Password reset error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      {/* Left side with logo and slogan */}
      <div className="signup-image">
        <img src={SignupImage} alt="Reset Password" className="signup-img" />
      </div>

      {/* Right side with form */}
      <div className="signup-form">
        <h1 className="signup-title">Reset Password</h1>
        {!isSubmitted ? (
          <>
            <p className="signup-subtitle">
              Please enter your new password below.
            </p>
            {token ? (
              <form onSubmit={handleSubmit} className="login-form">
                <div className="input-group-login password-input">
                  <label className="signup-label">New Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your new password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
                
                <div className="input-group-login password-input">
                  <label className="signup-label">Confirm Password</label>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
                
                <PasswordCriteria />
                
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
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="error-container">
                <p className="error-message">{message}</p>
                <div className="login-button-container">
                  <button 
                    onClick={() => navigate('/signup/forgot-password')} 
                    className="signup-button"
                  >
                    Request New Reset Link
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="success-message">
            <p className="success-text">{message}</p>
            <p>Redirecting to login page...</p>
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

export default ResetPassword;