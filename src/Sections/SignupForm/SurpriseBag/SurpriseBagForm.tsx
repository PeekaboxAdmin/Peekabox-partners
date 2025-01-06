import React, { useState } from 'react';
import Button from '../../../Components/Button/Button';
import Input from '../../../Components/Input/Input';

export interface SurpriseBagData {
  name: string;
  category: string;
  description: string;
  price: number;
  bannerImage?: File | null;
  quantity: number;
  CollectionDays: string[];
  CollectionTime: { [day: string]: { start: string; end: string } };
}

interface SurpriseBagFormProps {
  bag: SurpriseBagData;
  onChange: (field: keyof SurpriseBagData, value: any) => void;
  onDelete: () => void;
}

const priceOptions = [
  { value: 45, display: "AED 45 Per Bag (15 AED price for customers)" },
  { value: 60, display: "AED 60 Per Bag (20 AED price for customers)" },
  { value: 75, display: "AED 75 Per Bag (25 AED price for customers)" },
  { value: 90, display: "AED 90 Per Bag (30 AED price for customers)" },
  { value: 105, display: "AED 105 Per Bag (35 AED price for customers)" },
  { value: 120, display: "AED 120 Per Bag (40 AED price for customers)" },
];

const DaysOFtheWeek = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const SurpriseBagForm: React.FC<SurpriseBagFormProps> = ({ bag, onChange, onDelete }) => {
  const HandleDayChange = (day: string) => {
    const UpdateDay = bag.CollectionDays.includes(day)
      ? bag.CollectionDays.filter((d) => d !== day)
      : [...bag.CollectionDays, day];
    onChange('CollectionDays', UpdateDay);
    if (!bag.CollectionTime[day]) {
      onChange('CollectionTime', { ...bag.CollectionTime, [day]: { start: '', end: '' } });
    }
  };

  const HandleTime = (day: string, TimeType: 'start' | 'end', value: string) => {
    const UpdateTimes = {
      ...bag.CollectionTime,
      [day]: {
        ...bag.CollectionTime[day],
        [TimeType]: value,
      },
    };
    onChange('CollectionTime', UpdateTimes);
  };

  const [quantity, setquantity] = useState(0);
  const HandleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(0, Number(e.target.value));
    setquantity(newValue);
  };

  return (
    <div className="space-y-4 px-4 sm:px-6 lg:px-8">
      <Input
        type="text"
        placeholder="Surprise Bag Name"
        value={bag.name}
        onChange={(e) => onChange('name', e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
      <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
      <select
        id="category"
        value={bag.category}
        onChange={(e) => onChange('category', e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        <option value="">Select a category</option>
        <option value="Meals">Meals</option>
        <option value="Bread & Pastries">Bread & Pastries</option>
        <option value="Groceries">Groceries</option>
        <option value="Other">Other</option>
      </select>
      <textarea
        placeholder="Description"
        value={bag.description}
        onChange={(e) => onChange('description', e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
      <select
        value={bag.price}
        onChange={(e) => onChange('price', parseFloat(e.target.value))}
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        <option value="">Select Price</option>
        {priceOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.display}
          </option>
        ))}
      </select>
      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
      <Input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={HandleQuantity}
        onKeyDown={(e) => e.key === '-' && e.preventDefault()}
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
      <div>
        <h3 className="text-lg font-medium">Collection Days</h3>
        {DaysOFtheWeek.map((day, index) => (
          <div key={index} className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={bag.CollectionDays.includes(day)}
                onChange={() => HandleDayChange(day)}
                className="h-4 w-4 bg-white border-2 border-gray-300 checked:bg-pink-500 checked:border-pink-500 focus:ring-0"
              />
              <span>{day}</span>
            </label>
            {bag.CollectionDays.includes(day) && (
              <div className="flex flex-wrap gap-4 ml-6 sm:ml-8">
                <input
                  type="time"
                  value={bag.CollectionTime[day]?.start || ''}
                  onChange={(e) => HandleTime(day, 'start', e.target.value)}
                  placeholder="Start Time"
                  className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <input
                  type="time"
                  value={bag.CollectionTime[day]?.end || ''}
                  onChange={(e) => HandleTime(day, 'end', e.target.value)}
                  placeholder="End Time"
                  className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <label htmlFor="bannerImage" className="block text-sm font-medium text-gray-700">Banner Image</label>
      <input
        type="file"
        onChange={(e) => onChange('bannerImage', e.target.files ? e.target.files[0] : null)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
      <Button
        label='Delete Surprise Bag'
        className="mt-4 bg-DarkGreen text-white py-2 px-4 ml-2 rounded-md hover:bg-DarkGreen focus:outline-none"
        onClick={onDelete}
        type="button"
      />
    </div>
  );
};

export default SurpriseBagForm;
