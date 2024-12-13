import React,  { PropsWithChildren } from "react";
import "./Triangle.css";

const Triangle: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div className="triangle-container">
    
      
    {children}
      
    </div>
  );
};

export default Triangle;
