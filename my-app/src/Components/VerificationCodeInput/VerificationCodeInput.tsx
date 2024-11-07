import React, { useRef } from 'react';
import './VerificationCodeInput.css'


interface VerificationCodeInputProps {
  value: string;
  onChange: (value: string) => void;
}

const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({ value, onChange }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value: inputValue } = e.target;

    // Update the verification code in the parent component
    const newCodeArray = value.split('');
    newCodeArray[index] = inputValue;
    const newCode = newCodeArray.join('');
    onChange(newCode);

    // Move focus to the next input if the current one is filled
    if (inputValue && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Handle backspace to move focus to the previous input if empty
    if (e.key === 'Backspace' && index > 0 && !value[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="otp-input">
      {[...Array(4)].map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          ref={(el) => (inputRefs.current[index] = el as HTMLInputElement)}
          value={value[index] || ''} // Assign value to each input
          onChange={(e) => handleInput(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
};

export default VerificationCodeInput;
