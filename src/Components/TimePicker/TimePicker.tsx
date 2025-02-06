import React from "react";

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ value, onChange }) => {
  return (
    <input
      type="time"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: "5px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
    />
  );
};

export default TimePicker;
