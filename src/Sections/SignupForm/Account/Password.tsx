import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Image from '../../../Components/Image/Image';
import Heading from '../../../Components/Heading/Heading';
import Button from '../../../Components/Button/Button';
import SignupImage from '../../../assets/images/Signup.png'
import PasswordCriteria from '../../../Components/PasswordCriteria';
import '../Style/Signup.css';
import { useNavigate } from 'react-router-dom';

interface PasswordProps {
  password: string;
  onChange: (password: string) => void;
}

const Password: React.FC<PasswordProps> = ({ password, onChange }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to validate password
  const isPasswordValid = (password: string): boolean => {
    const hasMinLength = password.length >= 12;
    const hasNumber = /[0-9]/.test(password);
    const hasLetter = /[A-Za-z]/.test(password);
    return hasMinLength && hasNumber && hasLetter;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isPasswordValid(password)) {
     {/* navigate('/signup/account'); */}
     navigate('/signup/Created-Account');
    } else {
      setErrorMessage(
        "Password must be at least 12 characters long and contain at least one number and one letter."
      );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div
        className="lg:w-3/5 w-full h-1/2 lg:h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${SignupImage})` }}
      ></div>
      <div className="right-section">
        <form className="login-form" onSubmit={handleFormSubmit}>
          <div className="heading-container">
            <Heading title="Create a Password" subtitle="Almost Done! Set Up Your Password" className='heading-container' />
          </div>
          <div className="input-group password-input">
            <input
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => onChange(e.target.value)}
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
          <PasswordCriteria />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <div className='login-button-container'>
                    <Button label="Continue"  className='Green-button'  />
                    </div>
        </form>
      </div>
    </div>
  );
};

export default Password;
