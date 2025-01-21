import React from 'react';

const PaymentSettings: React.FC = () => {
  const inputClassName =
    "w-full md:w-80 rounded-lg border border-gray-300 px-3 py-2 text-sm";

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-8 md:mb-12">
    {/* Heading */}
    <h2 className="text-lg md:text-xl font-semibold md:w-48 lg:w-64 shrink-0 text-black md:ml-16">
      Payment Settings
    </h2>
  
    {/* Fields */}
    <div className="flex-1 space-y-4">
      {/* Payment Method Field */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <label className="text-sm font-semibold w-32 sm:w-40 ">Payment Method</label>
        <select className="w-full sm:w-48 md:w-64 rounded-lg border border-gray-300 px-3 py-2 text-sm">
          <option>Credit Card</option>
          <option>PayPal</option>
          <option>Bank Transfer</option>
        </select>
      </div>
  
      {/* Card Number Field */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <label className="text-sm font-semibold w-32 sm:w-40">Card Number</label>
        <input
          type="text"
          className="w-full sm:w-48 md:w-64 rounded-lg border border-gray-300 px-3 py-2 text-sm"
          placeholder="Enter card number"
        />
      </div>
  
      {/* Expiry Date Field */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <label className="text-sm font-semibold w-32 sm:w-40">Expiry Date</label>
        <input
          type="text"
          className="w-full sm:w-48 md:w-64 rounded-lg border border-gray-300 px-3 py-2 text-sm"
          placeholder="MM/YY"
        />
      </div>
  
      {/* CVV Field */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <label className="text-sm font-semibold w-32 sm:w-40">CVV</label>
        <input
          type="text"
          className="w-full sm:w-48 md:w-64 rounded-lg border border-gray-300 px-3 py-2 text-sm"
          placeholder="Enter CVV"
        />
      </div>
    </div>
  </div>
  );
};

export default PaymentSettings;
