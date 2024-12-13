
import React from 'react';
import './Heading.css';
/*heading-container*/ 

const Heading: React.FC<{ title: string; subtitle: string,className?:string; titleClassName?: string; }> = ({ title, subtitle,className ,titleClassName,}) => {
  return (
    <div className={className}>
      <h1 className={titleClassName}>{title}</h1>
      <p className="subtitle">{subtitle}</p>
    
    </div>
  );
};
export default Heading;
