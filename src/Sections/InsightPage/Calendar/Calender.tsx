import React, { useState, useMemo } from 'react';
import './Calender.css';
import { ChevronDown } from 'lucide-react';

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
}

interface CalendarMonth {
  month: string;
  year: number;
  days: CalendarDay[];
}

interface CalendarProps {
  initialMonth?: number;
  initialYear?: number;
}

const Calendar: React.FC<CalendarProps> = ({
  initialMonth = new Date().getMonth(),
  initialYear = new Date().getFullYear(),
}) => {
  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const [currentYear, setCurrentYear] = useState(initialYear);
  const [selectedDay, setSelectedDay] = useState<number | null>(null); 
  
  // Optionally, add state for dropdown visibility
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const currentCalendar = useMemo(
    () => buildCalendar(currentMonth, currentYear),
    [currentMonth, currentYear]
  );

  const handleMonthChange = (newMonth: number) => {
    setCurrentMonth(newMonth);
  };

  const handleYearChange = (newYear: number) => {
    setCurrentYear(newYear);
  };

  const handleDaySelect = (day: number) => {
    setSelectedDay(day); // Set the selected day
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <div className="month-container" onClick={() => setShowMonthDropdown(!showMonthDropdown)}>
          <span className="month">{currentCalendar.month}</span>
          <ChevronDown className="chevronY" />
          {showMonthDropdown && (
            <div className="dropdownm">
              {/* Month dropdown items */}
              {Array.from({ length: 12 }, (_, index) => (
                <div 
                  key={index} 
                  className="dropdown-itemm"
                  onClick={() => handleMonthChange(index)}
                >
                  {new Date(0, index).toLocaleString('default', { month: 'long' })}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="year-container" onClick={() => setShowYearDropdown(!showYearDropdown)}>
          <span className="year">{currentCalendar.year}</span>
          <ChevronDown className="chevronM" />
          {showYearDropdown && (
            <div className="dropdowny">
              {/* Year dropdown items */}
              {Array.from({ length: 20 }, (_, index) => (
                <div 
                  key={index} 
                  className="dropdown-itemy"
                  onClick={() => handleYearChange(currentYear - 10 + index)}
                >
                  {currentYear - 10 + index}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="calendar-body">
        <div className="days-of-week">
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day, index) => (
            <div key={index} className="day-of-week">
              {day}
            </div>
          ))}
        </div>
        <div className="days">
          {currentCalendar.days.map((day, index) => (
            <div
              key={index}
              className={`day ${day.isCurrentMonth ? 'current-month' : 'other-month'} ${selectedDay === day.date ? 'selected' : ''}`}
              onClick={() => handleDaySelect(day.date)} 
            >
              {day.date}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function buildCalendar(month: number, year: number): CalendarMonth {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: CalendarDay[] = [];

  
  for (let i = firstDay - 1; i >= 0; i--) {
    const date = new Date(year, month, 1 - i).getDate();
    days.unshift({ date, isCurrentMonth: false });
  }

 
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ date: i, isCurrentMonth: true });
  }

  
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({ date: i, isCurrentMonth: false });
  }

  return {
    month: new Date(year, month).toLocaleString('default', { month: 'long' }),
    year,
    days,
  };
}

export default Calendar;
