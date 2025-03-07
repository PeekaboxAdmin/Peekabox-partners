import React from 'react';
import './FooterLinks.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core'; // Import IconProp type

const FooterLinks: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="footer-links">
        {/* Platform Section */}
        <div className="footer-column">
          <h4>Platform</h4>
          <ul>
            <li><a href="/dashboard-overview">Dashboard Overview</a></li>
            <li><a href="/features">Features</a></li>
            <li><a href="/orderManagement">Order Management</a></li>
            <li><a href="/analytics">Analytics</a></li>
            <li><a href="/manager-guidelines">Manager Guidelines</a></li>
          </ul>
        </div>

        {/* About Us Section */}
        <div className="footer-column">
          <h4>About Us</h4>
          <ul>
            <li><a href="/mission">Our Mission</a></li>
            <li><a href="/sustainability">Sustainability Commitment</a></li>
            <li><a href="/press">Press</a></li>
            <li><a href="/partnerships">Partnerships</a></li>
            <li><a href="/careers">Careers</a></li>
          </ul>
        </div>

        {/* Community Section */}
        <div className="footer-column">
          <h4>Community</h4>
          <ul>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/community-forum">Community Forum</a></li>
            <li><a href="/training-materials">Training Materials</a></li>
            <li><a href="/documentation">Documentation</a></li>
          </ul>
        </div>

        {/* Legal Section */}
        <div className="footer-column">
          <h4>Legal</h4>
          <ul>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/cookie-policy">Cookie Policy</a></li>
          </ul>
        </div>

        {/* Help & Support Section */}
        <div className="footer-column">
          <h4>Help & Support</h4>
          <ul>
            <li><a href="/help-center">Help Center</a></li>
            <li><a href="/contact-support">Contact Support</a></li>
            <li><a href="/safety-information">Safety Information</a></li>
            <li><a href="/feedback">Feedback & Suggestions</a></li>
            <li><a href="/report-issue">Report an Issue</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <p className="copyright">© 2024</p>
        <div className="footer-bottom-links">
          <a href="/help">Help</a>
          <a href="/privacy-policy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
        <div className="social-icons">
          <a href="https://facebook.com">
            <FontAwesomeIcon icon={faFacebookF as IconProp} />
          </a>
          <a href="https://twitter.com">
            <FontAwesomeIcon icon={faTwitter as IconProp} />
          </a>
          <a href="https://instagram.com">
            <FontAwesomeIcon icon={faInstagram as IconProp} />
          </a>
        </div>
        <div className="language-selector">
          <span>English (United Kingdom)</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterLinks;
