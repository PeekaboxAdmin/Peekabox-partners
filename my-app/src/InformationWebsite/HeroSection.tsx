import React from "react";
import "./styles/HeroSection.css";

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Save Food. Save Money. Save the Planet.</h1>
        <p>Join the movement to reduce food waste and make a difference.</p>
        <button className="hero-button">Get the App</button>
        <button className="hero-button">Sign Up your store now !</button>
      </div>
    </section>
  );
};

export default HeroSection;
