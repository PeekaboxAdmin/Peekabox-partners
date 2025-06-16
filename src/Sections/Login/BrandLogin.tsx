'use client';

import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setBrandAuth } from '../../GlobalStateManagement/brandAuthSlice';

import SignupImage from '../../assets/images/Signup.png';
import './Style/Login.css';

const BrandLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    // Reset errors
    setErrors({});
    setError('');

    // Validate inputs
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // If there are errors, set them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const apiurl = process.env.REACT_APP_API_URL;
      const response = await axios.post(
        `${apiurl}/api/v1/brands/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        const brandId = response.data.data.brandAuth._id;

        // Store brand authentication info in Redux
        dispatch(setBrandAuth({ Brand_id: brandId }));

        // Save auth info based on "remember me" choice
        if (rememberMe) {
          localStorage.setItem(
            'brandAuth',
            JSON.stringify(response.data.data.brandAuth)
          );
        } else {
          sessionStorage.setItem(
            'brandAuth',
            JSON.stringify(response.data.data.brandAuth)
          );
        }

        // Navigate to brand created page where they can add branches
        navigate('/signup/brand-created');
      } else {
        setError(
          response.data.errorMessage ||
            'Login failed. Please check your credentials.'
        );
      }
    } catch (error: any) {
      setError(
        error.response?.data?.errorMessage ||
          'An error occurred during login. Please try again.'
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='signup-container'>
      <div className='signup-image'>
        <img
          src={SignupImage || '/placeholder.svg'}
          alt='Brand Login'
          className='signup-img'
        />
      </div>

      <div className='signup-form'>
        <h1 className='signup-title'>Brand Login</h1>
        <form onSubmit={handleSubmit} className='login-form'>
          <div className='input-group-login password-input'>
            <label className='signup-label'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 border rounded-md'
              placeholder='Enter your brand email'
              required
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
            )}
          </div>

          <div className='input-group-login password-input'>
            <label className='signup-label'>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 border rounded-md'
              placeholder='Enter your password'
              required
            />
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
            )}
          </div>

          {error && <p className='text-red-500 mt-2'>{error}</p>}

          <div className='remember-me-container'>
            <label className='remember-me-label'>
              <input
                type='checkbox'
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className='remember-me-checkbox'
              />
              Keep me logged in
            </label>
            <a href='/signup/forgot-brand-password' className='forgotpass-link'>
              Forgot password?
            </a>
          </div>

          <div className='login-button-container'>
            <button type='submit' className='signup-button' disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <div className='login-additional-links'>
          <p className='signup-link'>
            Need to register? <a href='/signup'>Sign Up</a>
          </p>
          <p className='signup-link mt-2'>
            Branch/Store Login? <a href='/signup/login'>Login as Store</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandLogin;
