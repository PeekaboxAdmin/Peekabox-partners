import React from "react";
import Navbar from "./NavBar";
import Testimonials from "./testimonial";
import Footer from "./Footer";
import FeaturesSection from "./FeatureSection";
import HeroSection from "./HeroSection";
import "./styles/HomePage.css"; 

const HomePage: React.FC = () => {
  return (
    <div className="homepage-container">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
