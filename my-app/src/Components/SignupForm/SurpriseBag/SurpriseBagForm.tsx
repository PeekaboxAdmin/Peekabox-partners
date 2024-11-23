import React, { useState } from 'react';

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
    <div style={{ padding: '10px 0' }}>
      <input
        type="text"
        placeholder="Surprise Bag Name"
        value={bag.name}
        onChange={(e) => onChange('name', e.target.value)}
        required
      />
      <label htmlFor="category">Category</label>
      <select
        id="category"
        value={bag.category}
        onChange={(e) => onChange('category', e.target.value)}
        required
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
      />
      <select
        value={bag.price}
        onChange={(e) => onChange('price', parseFloat(e.target.value))}
        required
      >
        <option value="">Select Price</option>
        {priceOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.display}
          </option>
        ))}
      </select>
      <label htmlFor="quantity">Quantity</label>
      <input
        id="quantity"
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={HandleQuantity}
        onKeyDown={(e) => e.key === '-' && e.preventDefault()}
        required
      />

      <div>
        <h3>Collection Days</h3>
        {DaysOFtheWeek.map((day, index) => (
          <div key={index}>
            <label>
              <input
                type="checkbox"
                checked={bag.CollectionDays.includes(day)}
                onChange={() => HandleDayChange(day)}
              />
              {day}
            </label>
            {/* Time Range Inputs */}
            {bag.CollectionDays.includes(day) && (
              <div style={{ display: 'flex', gap: '10px', marginLeft: '20px' }}>
                <input
                  type="time"
                  value={bag.CollectionTime[day]?.start || ''}
                  onChange={(e) => HandleTime(day, 'start', e.target.value)}
                  placeholder="Start Time"
                />
                <input
                  type="time"
                  value={bag.CollectionTime[day]?.end || ''}
                  onChange={(e) => HandleTime(day, 'end', e.target.value)}
                  placeholder="End Time"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <label htmlFor="bannerImage">Banner Image</label>
      <input
        type="file"
        onChange={(e) => onChange('bannerImage', e.target.files ? e.target.files[0] : null)}
      />
      <button type="button" className="delete-button" onClick={onDelete}>Delete Surprise Bag</button>
    </div>
  );
};

export default SurpriseBagForm;
