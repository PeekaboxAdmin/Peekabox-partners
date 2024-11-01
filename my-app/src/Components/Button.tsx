import React from 'react';
import './Login/Style/Login.css';

interface CustomButtonProps {
  label: string;
  loading?: boolean;
}

const Button: React.FC<CustomButtonProps> = ({ label, loading }) => {
  return (
    <div className="login-button-container">
      <button
        type="submit" // Keep it as submit for form submission
        disabled={loading}
        className="login-button"
      >
        {loading ? 'Loading...' : label}
      </button>
    </div>
  );
};

export default Button;
