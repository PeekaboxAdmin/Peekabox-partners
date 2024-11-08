import React, { useState } from 'react';
import './CheckboxWithLabel.css';

function CheckboxWithLabel() {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <label className="checkbox-label">
            <div className="checkbox-container">
                <input 
                    type="checkbox" 
                    checked={isChecked} 
                    onChange={handleCheckboxChange} 
                    className="checkbox-input"
                />
                <span className={`checkbox-background ${isChecked ? 'checked' : ''}`} />
                <span className="checkbox-text">Keep me logged in</span>
            </div>
        </label>
    );
}

export default CheckboxWithLabel;
