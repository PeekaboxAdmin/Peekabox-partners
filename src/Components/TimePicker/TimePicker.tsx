import React from 'react';

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ value, onChange }) => {
  // Generate time options in 30-minute intervals (24-hour format)
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute of [0, 30]) {
        const formattedHour = String(hour).padStart(2, '0');
        const formattedMinute = String(minute).padStart(2, '0');
        const timeValue = `${formattedHour}:${formattedMinute}`;

        // Format for display
        let displayHour = hour;
        const amPm = hour < 12 ? 'AM' : 'PM';

        // Convert to 12-hour format for display
        if (displayHour === 0) displayHour = 12;
        if (displayHour > 12) displayHour -= 12;

        const displayTime = `${displayHour}:${formattedMinute} ${amPm}`;

        options.push({ value: timeValue, display: displayTime });
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: '5px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        minWidth: '120px',
        height: '36px', // Match height of other inputs
        backgroundColor: '#fff',
        cursor: 'pointer',
      }}>
      <option value=''>Select Time</option>
      {timeOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.display}
        </option>
      ))}
    </select>
  );
};
export default TimePicker;
