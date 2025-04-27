import React, { useState } from 'react';
import './BrandFormStep2.css'; // Import the CSS file for styling
import Button from '../../../Components/Button/Button';
import Triangle from '../../../Components/Triangle/Triangle';
import HeaderBar from '../../../Components/HeaderBar/HeaderBar';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const BrandFormStep2: React.FC<{onNext: (data: { phoneNumber: string }) => void; onBack: () => void;}> = ({ onNext, onBack }) => {  
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { phoneNumber };
    onNext(formData);
  };

  return (
    <div className="branch-form-step2-wrapper">
      <Triangle>
        <HeaderBar>Create Brand</HeaderBar>

        <form className="branch-media-form" onSubmit={handleSubmit}>
          <div className="form-step">
            <div className="step-badge">3</div>
            <div className="form-group">
              <h2 className="form-title">Enter Brand Phone Number</h2>
              <p className="form-description">
                Enter the contact number of the brand. This will be used for important updates or inquiries.
              </p>
              <PhoneInput
                country={'ae'}
                value={phoneNumber}
                onChange={(phone) => setPhoneNumber(phone)}
                inputClass="form-input"
                containerClass="phone-input-container"
                dropdownClass="phone-input-dropdown"
                inputProps={{
                  name: 'phone',
                  required: true
                }}
              />
            </div>
          </div>

          <div className="form-buttons">
            <Button label="Back" onClick={onBack} className="back-button" />
            <Button label="Next" type="submit" className="next-button" />
          </div>
        </form>
      </Triangle>
    </div>
  );
};

export default BrandFormStep2;