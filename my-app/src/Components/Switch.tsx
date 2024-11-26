import React from 'react';
import  '../Sections/Notification/Notification.css'

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({ checked, onCheckedChange, className }) => (
  <label className={`switch-container ${className}`}>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className="switch-input"
    />
    <span className={`switch-track ${checked ? 'checked' : ''}`}>
      <span className="switch-thumb" />
    </span>
  </label>
);

export default Switch;
