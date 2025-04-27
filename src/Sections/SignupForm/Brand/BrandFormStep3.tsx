import React, { useState } from 'react';
import './BrandFormStep3.css';
import Button from '../../../Components/Button/Button';
import Triangle from '../../../Components/Triangle/Triangle';
import HeaderBar from '../../../Components/HeaderBar/HeaderBar';

const BrandFormStep3: React.FC<{ onNext: (data: { managerEmail: string }) => void; onBack: () => void;}> = ({ onNext, onBack }) => {  const [managerEmail, setManagerEmail] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    onNext({ managerEmail});
  };

  return (
    <div className="branch-form-step3-wrapper">
      <Triangle>
        <HeaderBar>Create Brand</HeaderBar>

        <form className="branch-form-step3" onSubmit={handleSubmit}>
          <div className="form-step">
            <div className="step-badge">4</div>
            <div className="form-group">
              <h2 className="form-title">Create Manager Email to contact</h2>
              <p className="form-description">
                This email is not same as your brand login email this will be used to contact
              </p>

              <label htmlFor="managerEmail" className="form-label">Create Manager’s Email</label>
              <input
                type="email"
                id="managerEmail"
                placeholder="name@example.com"
                value={managerEmail}
                onChange={(e) => setManagerEmail(e.target.value)}
                className="form-input"
                required
              />

              {error && <p className="error-message">{error}</p>}
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

export default BrandFormStep3;