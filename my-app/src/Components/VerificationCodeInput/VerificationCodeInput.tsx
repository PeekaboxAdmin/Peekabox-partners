import React, { useRef } from 'react';
import './VerificationCodeInput.css';

interface VerificationCodeInputProps {
  value: string;
  onChange: (value: string) => void;
}

const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({ value, onChange }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value: inputValue } = e.target;

    
    const newCodeArray = value.split('');
    newCodeArray[index] = inputValue;
    const newCode = newCodeArray.join('');
    onChange(newCode);

    
    if (inputValue && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && index > 0 && !value[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
   
    <div className="otp-input">
      {[...Array(4)].map((_, index) => (
        <input 
        className='otp'
          key={index}
          type="text"
          maxLength={1}
          ref={(el) => (inputRefs.current[index] = el as HTMLInputElement)}
          value={value[index] || ''}
          onChange={(e) => handleInput(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
   
    
    
  );
};

export default VerificationCodeInput;