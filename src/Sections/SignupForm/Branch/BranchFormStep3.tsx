import React, { useState } from 'react';
import './BranchFormStep3.css';
import Button from '../../../Components/Button/Button';
import Triangle from '../../../Components/Triangle/Triangle';
import HeaderBar from '../../../Components/HeaderBar/HeaderBar';

const BranchFormStep3: React.FC<{onNext: (data: any) => void;onBack: () => void;branchNumber: number;totalStores: number;}> = ({ onNext, onBack, branchNumber, totalStores }) => {
  const [managerEmail, setManagerEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Show success alert
    alert('Branches created successfully. Redirecting to login.');

    setError('');
    onNext({ managerEmail, password });
  };

  return (
    <div className="branch-form-step3-wrapper">
      <Triangle>
        <HeaderBar>Create Branch ({branchNumber} of {totalStores})</HeaderBar>

        <form className="branch-form-step3" onSubmit={handleSubmit}>
          <div className="form-step">
            <div className="step-badge">5</div>
            <div className="form-group">
              <h2 className="form-title">Create Manager Credentials for Account Access</h2>
              <p className="form-description">
                Enter the manager’s email and a secure password to access and manage your branch details effectively.
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

              <label htmlFor="password" className="form-label">Create Manager’s Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />

              <label htmlFor="confirmPassword" className="form-label">Confirm Manager’s Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

export default BranchFormStep3;