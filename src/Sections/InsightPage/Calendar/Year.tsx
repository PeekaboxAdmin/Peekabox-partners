import React, { useState } from 'react';

interface YearProps {
  year: number;
  onYearChange: (newYear: number) => void;
}

const Year: React.FC<YearProps> = ({ year, onYearChange }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);


  const years = Array.from({ length: 41 }, (_, index) => year - 20 + index);

  const handleYearClick = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleYearSelect = (selectedYear: number) => {
    onYearChange(selectedYear);
    setDropdownVisible(false);
  };

  return (
    <div className="year-container">
      <div className="year" onClick={handleYearClick}>
        {year}
      </div>
      {isDropdownVisible && (
        <div className="dropdowny">
          {years.map((y) => (
            <div
              key={y}
              className="dropdown-itemy"
              onClick={() => handleYearSelect(y)}
            >
              {y}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Year;
