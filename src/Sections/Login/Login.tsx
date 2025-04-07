import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setStoreAuth } from "../../GlobalStateManagement/storeAuthSlice";

import SignupImage from '../../assets/images/Signup.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false); // "Keep me logged in" state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const apiurl = process.env.REACT_APP_API_URL
      const response = await axios.post(
        `${apiurl}/api/v1/stores/auth/logIn`,
        { email, password },
        { withCredentials: true, }
      );
      if (response.data.success) {
        alert("Login successful!");
        const storeId = response.data.data.storeAuth._id;

        // Dispatch an object that matches StoreAuthState
        dispatch(setStoreAuth({ Store_id: storeId }));

        // Store token depending on "Keep me logged in"
        if (rememberMe) {
          localStorage.setItem("storeAuth", JSON.stringify(response.data.data.storeAuth)); // Persistent login
        } else {
          sessionStorage.setItem("storeAuth", JSON.stringify(response.data.data.storeAuth)); // Expires on browser close
        }

        navigate("/");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      alert("An error occurred during login. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      {/* Left side with logo and slogan */}
      <div className="signup-image">
          <img src={SignupImage} alt="Sign up" className="signup-img" />
      </div>

      {/* Right side with login form */}
      <div className="signup-form">
        <h1 className="signup-title">Partner Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group-login password-input">
            <label className="signup-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group-login password-input">
            <label className="signup-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="remember-me-container">
            <label className="remember-me-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="remember-me-checkbox"
              />
              Keep me logged in
            </label>
            <a href="/signup/forgot-password" className="forgotpass-link">Forgot password?</a>
            
          </div>

          <div className="login-button-container">
            <button type="submit" className="signup-button">
              Login
            </button>
          </div>
        </form>

        {/* Links for additional actions */}
        <div className="login-additional-links">
          <p className="signup-link">
            New Here? <a href="/signup">Sign Up </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
