import React, { PropsWithChildren } from "react";

const Triangle: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="max-w-4xl mx-auto p-0 bg-white shadow-md rounded-lg">
      {children}
    </div>
  );
};

export default Triangle;
