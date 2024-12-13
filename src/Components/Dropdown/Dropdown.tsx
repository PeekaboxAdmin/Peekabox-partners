import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './Dropdown.css';

interface DropdownProps {
  selectedOption: string;
  options: string[];
  onSelect: (option: string) => void;
  placeholder?: string;
  buttonLabel?: string;
  dropdownType?: 'General' | 'timezone'; 
}

const Dropdown: React.FC<DropdownProps> = ({
  selectedOption,
  options,
  onSelect,
  placeholder = 'Select an option',
  dropdownType = 'General',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown-wrapper">
      <div className="dropdown">
        <button
          className="dropdown-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption || placeholder}

         
          {dropdownType === 'timezone' ? (
            <div className="chevron-container">
              <ChevronUp className="chevron" />
              <ChevronDown className="chevron" />
              
            </div>
          ) : (
            <ChevronDown className="chevron" />
          )}
        </button>

        {isOpen && (
          <div className="dropdown-menu">
            {options.map((option) => (
              <div
                key={option}
                className="dropdown-item"
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
