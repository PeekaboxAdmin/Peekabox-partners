import React from 'react';

import './Button.css'


interface CustomButtonProps {
  label: string;
  loading?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset"; // Optional type prop
  onClick?: () => void;
}

const Button: React.FC<CustomButtonProps> = ({
  label,
  loading = false,
  className,
  type, // Optional, no default value
  onClick,
}) => {
  return (
    //<div className="login-button-container">
      <button
        type={type || undefined} // Pass 'type' only if it's provided
        disabled={loading}
        className={className}
        onClick={onClick}
      >
        {loading ? "Loading..." : label}
      </button>
    //</div>
  );
};

export default Button;

