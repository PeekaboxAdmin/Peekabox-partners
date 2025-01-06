import React, { PropsWithChildren } from "react";

const Triangle: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="max-w-full sm:max-w-xl lg:max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden p-0">
          {children}
        </div>
  );
};

export default Triangle;
