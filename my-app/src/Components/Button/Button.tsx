import React from 'react';

import './Button.css'


interface CustomButtonProps {
  label: string;
  loading?: boolean;
  className?:string;
}

const Button: React.FC<CustomButtonProps> = ({ label, loading ,className}) => {
  return (
    <div className="login-button-container">
      <button
        type="submit"
        disabled={loading}
        className={className}
      >
        {loading ? 'Loading...' : label}
      </button>
    </div>
  );
};

export default Button;
