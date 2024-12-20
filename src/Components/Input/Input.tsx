import React from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'file' | 'url' | 'tel' | 'date' | 'time'; // Restrict to valid input types
  value: string | number; // Allow both string and number values
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Event handler for input changes
  placeholder?: string; // Placeholder text
  label?: string; // Optional label for the input
  className?: string; // Optional class name for styling
  disabled?: boolean; // Optional flag to disable the input
  required?: boolean; // Optional flag to make the input required
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void; // Optional onKeyDown handler
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
  className,
  disabled = false,
  required = false,
  onKeyDown,
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
        required={required}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default Input;
