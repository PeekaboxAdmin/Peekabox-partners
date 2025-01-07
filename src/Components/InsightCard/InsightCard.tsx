import React from "react";
import "./InsightCard.css";

// Define the types for the props
interface InsightCardProps {
  title: string;
  value: string | number;
  icon?: string; // Optional icon
  text?: string; // Optional text
  percentage?: string; // Optional percentage text
}

const InsightCard: React.FC<InsightCardProps> = ({ title, value, icon, text, percentage }) => {
  return (
    <div className="earnings-card">
      {icon && (
        <div className="icon-container">
          <img src={icon} alt={`${title} Icon`} className="earnings-icon" />
        </div>
      )}
      <div className="earnings-content">
        <span className="earnings-title">{title}</span>
        <span className="earnings-value">{value}</span>
      </div>
      {(text || percentage) && (
        <div className="text-container">
         {percentage && <span className="percentage-text">{percentage}</span>}


          {text && <span className="card-text">{text}</span>}

        </div>
      )}
    </div>
  );
};

export default InsightCard;
