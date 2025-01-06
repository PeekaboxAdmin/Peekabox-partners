import React from 'react';
import './CheckboxWithLabel.css';

type CheckboxWithLabelProps = {
  label: string; // Text to display next to the checkbox
  checked: boolean; // Whether the checkbox is checked
  onChange: (checked: boolean) => void; // Callback for when the checkbox value changes
  className?: string; // Optional class for custom styling
};

const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({
  label,
  checked,
  onChange,
  className = '',
}) => {
  return (
    <label className={`checkbox-label ${className}`}>
    { /*<div className="checkbox-container">*/}
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="checkbox-input accent-pinkCustom"
        />
        <span className={`checkbox-background ${checked ? 'checked' : ''}`} />
        <span className="checkbox-text">{label}</span>
  {  /* </div>*/}
    </label>
  );
};

export default CheckboxWithLabel;
