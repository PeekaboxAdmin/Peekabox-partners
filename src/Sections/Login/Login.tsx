import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Image from '../../Components/Image/Image';
import Heading from '../../Components/Heading/Heading';
import ForgotPassword from './ForgotPassword';
import Button from '../../Components/Button/Button';
import CheckboxWithLabel from '../../Components/CheckboxWithLabel/CheckboxWithLabel';
import loginpic from '../../assets/images/login.png';
import './Style/Login.css';
import { useDispatch } from 'react-redux';
import { setStoreAuth } from '../../GlobalStateManagement/storeAuthSlice';
import axios from 'axios';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('test123@gmail.com');
  const [password, setPassword] = useState<string>('test123456789!');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch();

  // Checkbox state
  const [isChecked, setIsChecked] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    
    try {
      const apiurl = process.env.REACT_APP_API_URL
      const response = await axios.post(
        `${apiurl}/api/v1/stores/auth/logIn`,
        { email, password },
        {
          withCredentials: true, 
        }
      );
      
        console.log(response.data.data)

      if (response.status === 200) {
        const { message , storeAuth } = response.data.data;
        
        dispatch(setStoreAuth({  Store_id: storeAuth._id }));
        
        // Redirect user after successful login
        navigate('/');
      } else {
        setErrorMessage('Login failed');
      }
    } catch (err) {
      setErrorMessage('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="left-section">
        <Image imageSrc={loginpic} />
      </div>
      <div className="right-section">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="heading-container">
            <Heading
              title="Sign in to your account"
              subtitle="Welcome Back! Let's get you Signed In"
              className="heading-container"
            />
          </div>
          <div className="input-group">
            <input
              placeholder="Enter your Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group password-input">
            <input
              placeholder="Password"
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
          <div className="options-row">
            <CheckboxWithLabel
              label="Keep me logged in"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <ForgotPassword />
          </div>
          <div className='login-button-container'>
            <Button label="Sign In" loading={loading} className="Green-button" />
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
