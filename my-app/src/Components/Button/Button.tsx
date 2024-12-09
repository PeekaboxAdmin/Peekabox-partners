import React from 'react';

import './Button.css'


interface CustomButtonProps {
  label: string;
  loading?: boolean;
  className?:string;
  onClick?: () => void; // Optional onClick handler
}

const Button: React.FC<CustomButtonProps> = ({ label, loading ,className, onClick}) => {
  return (
    <div className="login-button-container">
      <button
        type="submit"
        disabled={loading}
        className={className}
        onClick={onClick}
      >
        {loading ? 'Loading...' : label}
      </button>
    </div>
  );
};

export default Button;
