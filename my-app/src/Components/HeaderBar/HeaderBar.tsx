import React,  { PropsWithChildren } from "react";
import "./HeaderBar.css";

const HeaderBar: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div className="header-bar">
    {children}
  </div>
  );
};

export default HeaderBar;