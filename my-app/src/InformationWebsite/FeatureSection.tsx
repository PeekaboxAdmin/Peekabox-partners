import React from "react";
import "./styles/FeatureSection.css";

const FeaturesSection: React.FC = () => {
  return (
    <section className="features-section">
      <h2>Features</h2>
      <div className="features-grid">
        <div className="feature-item">
          <h3>Discover Local</h3>
          <p>Find great food deals from local shops and restaurants.</p>
        </div>
        <div className="feature-item">
          <h3>Save Money</h3>
          <p>Save money while preventing food from going to waste.</p>
        </div>
        <div className="feature-item">
          <h3>Join the Movement</h3>
          <p>Be part of a community that's making a difference.</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
