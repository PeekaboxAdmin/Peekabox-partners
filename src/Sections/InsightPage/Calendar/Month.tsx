import React, { useState } from 'react';

interface MonthProps {
  month: string;
  onMonthChange: (newMonth: number) => void;
}

const Month: React.FC<MonthProps> = ({ month, onMonthChange }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const handleMonthClick = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleMonthSelect = (index: number) => {
    onMonthChange(index);
    setDropdownVisible(false);
  };

  return (
    <div className="month-container">
      <div className="month" onClick={handleMonthClick}>
        {month}
      </div>
      {isDropdownVisible && (
        <div className="dropdownm">
          {months.map((m, index) => (
            <div
              key={index}
              className="dropdown-itemm"
              onClick={() => handleMonthSelect(index)}
            >
              {m}
            </div>
          ))}
        </div>
      )}
    
    </div>
    
  );
};

export default Month;
