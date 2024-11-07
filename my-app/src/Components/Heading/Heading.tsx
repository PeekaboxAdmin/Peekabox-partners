
import React from 'react';
import './Heading.css';


const Heading: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
  return (
    <div className="heading-container">
      <h1 className="title">{title}</h1>
      <p className="subtitle">{subtitle}</p>
    </div>
  );
};
export default Heading;
