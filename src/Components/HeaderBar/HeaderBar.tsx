import React, { PropsWithChildren } from "react";

const HeaderBar: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <h1 className="text-base sm:text-lg lg:text-2xl font-semibold text-white bg-DarkGreen py-2 px-3 sm:px-6 rounded-t-lg -mt-[1px]">
          {children}
        </h1>
  );
};

export default HeaderBar;
