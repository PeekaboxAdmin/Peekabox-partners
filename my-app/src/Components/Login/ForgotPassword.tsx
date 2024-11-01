
import React from 'react';
import './Style/Login.css';

const ForgotPassword: React.FC = () => {
  return (
    <div className="forgot-password-container">
      <a href="/forgot-password" className="forgot-password-link">
        forgot password?
      </a>
    </div>
  );
};

export default ForgotPassword;
