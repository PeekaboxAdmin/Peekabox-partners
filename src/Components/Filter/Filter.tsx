import React from "react";

type NotificationFilterProps = {
  filter: "All" | "New Order" | "Cancellation" | "Update";
  setFilter: React.Dispatch<React.SetStateAction<"All" | "New Order" | "Cancellation" | "Update">>;
  options: ("All" | "New Order" | "Cancellation" | "Update")[];
  label: string;
};

const Filter: React.FC<NotificationFilterProps> = ({ filter, setFilter, options, label }) => {
    return (
        <div className="flex flex-col gap-2 p-4 bg-red-50 border border-pink-500 rounded-md shadow-md">
          <label className="text-sm font-medium text-pink-500">{label}</label>
          <select
            className="w-full p-2 text-sm border border-pink-500 rounded-md focus:ring-2 focus:ring-pink-500 focus:outline-none bg-white text-pink-500 custom-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value as "All" | "New Order" | "Cancellation" | "Update")}
          >
            {options.map((option) => (
              <option
                key={option}
                value={option}
                className="bg-white text-pink-500"
              >
                {option}
              </option>
            ))}
          </select>
        </div>
      );
};

export default Filter;
