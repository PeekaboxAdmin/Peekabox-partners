import React from 'react';

interface InputProps {
  type?: string; // The type of the input, e.g., "text", "email", "password"
  value: string; // The value of the input
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Event handler for input changes
  placeholder?: string; // Placeholder text
  label?: string; // Optional label for the input
  className?: string; // Optional class name for styling
  disabled?: boolean; // Optional flag to disable the input
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
  className,
  disabled = false,
}) => {
  return (
    <div className={`input-container ${className || ''}`}>
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field"
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
