import React from 'react';
import './ConsentAgreement.css'; 

const ConsentAgreement: React.FC = () => (
  <div className="consent-container">
    <h2 className="consent-header">Consent and agreements</h2>

    <div className="consent-content">
      <div className="consent-item">
        <h3 className="consent-title">Terms of service</h3>
        <p className="consent-description">Review our terms and conditions for using this platform</p>
      </div>

      <div className="consent-item">
        <h3 className="consent-title">Data privacy agreement</h3>
        <p className="consent-description">Learn about how we collect, use, and protect your data.</p>
      </div>
    </div>
  </div>
);

export default ConsentAgreement;
