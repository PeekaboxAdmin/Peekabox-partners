import React from 'react';

const PaymentSettings: React.FC = () => {
  const inputClassName =
    "w-full md:w-80 rounded-lg border border-gray-300 px-3 py-2 text-sm";

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-15 md:mb-12">
      <h2 className="text-xl font-semibold md:w-64 shrink-0 text-black">Payment Settings</h2>
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-semibold w-40">Payment Method</label>
          <select className={inputClassName}>
            <option>Credit Card</option>
            <option>PayPal</option>
            <option>Bank Transfer</option>
          </select>
        </div>
        <div className="flex items-center gap-4">
          <label className="text-sm font-semibold w-40">Card Number</label>
          <input
            type="text"
            className={inputClassName}
            placeholder="Enter card number"
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="text-sm font-semibold w-40">Expiry Date</label>
          <input
            type="text"
            className={inputClassName}
            placeholder="MM/YY"
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="text-sm font-semibold w-40">CVV</label>
          <input
            type="text"
            className={inputClassName}
            placeholder="Enter CVV"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentSettings;
