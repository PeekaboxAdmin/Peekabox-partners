import React, { useState } from 'react';
import './BrandFormStep4.css';
import Button from '../../../Components/Button/Button';
import Triangle from '../../../Components/Triangle/Triangle';
import HeaderBar from '../../../Components/HeaderBar/HeaderBar';

const BrandFormStep4: React.FC<{onNext: (data: {brandLogo: File | null }) => void; onBack: () => void;}> = ({ onNext, onBack }) => {
  const [brandLogo, setBrandLogo] = useState<File | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setter(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ brandLogo });
  };

  return (
    <div className="brand-form-step4-wrapper">
      <Triangle>
        <HeaderBar>Create Brand</HeaderBar>

        <form className="brand-form-step4" onSubmit={handleSubmit}>
          <div className="form-step">
            <div className="step-badge">6</div>
            <div className="form-group">
              <h2 className="form-title">Upload Your Brand Logo</h2>
              <p className="form-description">
                This logo represents your brand across the platform.
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setBrandLogo)}
                className="file-input"
              />
            </div>
          </div>

          <div className="form-buttons">
            <Button label="Back" onClick={onBack} className="back-button" />
            <Button label="Submit" type="submit" className="next-button" />
          </div>
        </form>
      </Triangle>
    </div>
  );
};

export default BrandFormStep4;
