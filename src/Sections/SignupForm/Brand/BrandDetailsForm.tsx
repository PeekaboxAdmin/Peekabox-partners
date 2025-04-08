import React, { useState } from 'react';
import Triangle from '../../../Components/Triangle/Triangle';
import HeaderBar from '../../../Components/HeaderBar/HeaderBar';
import './BrandDetailsForm.css'; // Import the CSS file for styling

const BrandDetailsForm: React.FC<{ onNext: (data: any) => void }> = ({ onNext }) => {
  const [brandName, setBrandName] = useState('');
  const [brandAddress, setBrandAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ brandName, brandAddress });
  };

  return (
    <div className="branch-details-wrapper">
      <Triangle>
        <HeaderBar>Create Brand</HeaderBar>

        <form className="brand-details-form" onSubmit={handleSubmit}>
          <div className="form-step">
            <div className="step-badge">1</div>
            <div className="form-group">
              <h2 className="form-title">Enter the name of your brand or business.</h2>
              <p className="form-description">This helps customers identify your outlet.</p>
              <input
                id="branchName"
                type="text"
                placeholder="Type the name of your brand"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-separator"></div>

          <div className="form-step">
            <div className="step-badge">2</div>
            <div className="form-group">
              <h2 className="form-title">Brand Address</h2>
              <p className="form-description">
                Provide the complete address of your brand, including street, city, and country.
              </p>
              <input
                id="branchAddress"
                type="text"
                placeholder="Type the Branch Address"
                value={brandAddress}
                onChange={(e) => setBrandAddress(e.target.value)}
                className="form-input"
                required
              />
            </div>
          </div>

          <button type="submit" className="form-button">Next</button>
        </form>
      </Triangle>
    </div>
  );
};

export default BrandDetailsForm;