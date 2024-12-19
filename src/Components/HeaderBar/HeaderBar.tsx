import React, { PropsWithChildren } from "react";

const HeaderBar: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <h1 className="text-2xl font-semibold text-white bg-DarkGreen py-4 pl-4 rounded-t-md text-left">
      {children}
    </h1>
  );
};

export default HeaderBar;
