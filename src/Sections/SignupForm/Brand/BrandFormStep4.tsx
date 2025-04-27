import React, { useState } from 'react';
import './BrandFormStep4.css';
import Button from '../../../Components/Button/Button';
import Triangle from '../../../Components/Triangle/Triangle';
import HeaderBar from '../../../Components/HeaderBar/HeaderBar';
import { Upload } from 'lucide-react';

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

  const handleRemoveImage = () => {
    setBrandLogo(null);
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
            <div className="step-badge">5</div>
            <div className="form-group">
              <h2 className="form-title">Upload Your Brand Logo</h2>
              <p className="form-description">
                This logo represents your brand across the platform.
              </p>
              {/* <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setBrandLogo)}
                className="file-input"
              /> */}

              <div
                className="image-upload-area"
                onClick={() => document.getElementById('brand-logo-input')?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files[0]) {
                    setBrandLogo(e.dataTransfer.files[0]);
                  }
                }}
              >
                {brandLogo ? (
                  <div className="image-preview-container">
                    <img
                      src={URL.createObjectURL(brandLogo)}
                      alt="Preview"
                      className="image-preview-brandsingup"
                    />
                    <button
                      type="button"
                      className="remove-image-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage();
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload size={24} />
                    <p>Choose file or drag here</p>
                    <span className="file-size-limit">Size Limit: 40MB</span>
                  </>
                )}
                <input
                  id="brand-logo-input"
                  type="file"
                  accept="image/*"
                  className="hidden-file-input"
                  onChange={(e) => handleFileChange(e, setBrandLogo)}
                />
              </div>

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
