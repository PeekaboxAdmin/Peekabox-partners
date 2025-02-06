import React, { useState } from 'react';
import axios from 'axios';
import './StoreCreate.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface StoreData {
  collectionSchedule: { timeWindow: { start: string; end: string }; day: string };
  storeId: string;
  storeName: string;
  description: string;
  category: string;
  image: string;
  isAvailable: boolean;
  managerName: string;
  contactDetails: { phone: { countryCode: string; number: string }; email: string };
  address: { street: string; area: string; city: string; country: string };
  location: { type: string; coordinates: [number, number] };
  operatingHours: { day: string; open: string; close: string }[];
}

const IndividualStoreCreate: React.FC = () => {
  const storeId = useSelector((state: any) => state.storeAuth?.Store_id); // Replace `any` with your Redux state type
  const navigate = useNavigate();

  const [storeData, setStoreData] = useState<StoreData>({
    collectionSchedule: { timeWindow: { start: '', end: '' }, day: '' },
    storeId: storeId || '',
    storeName: '',
    description: '',
    category: '',
    image: '',
    isAvailable: true,
    managerName: '',
    contactDetails: { phone: { countryCode: '', number: '' }, email: '' },
    address: { street: '', area: '', city: '', country: '' },
    location: { type: 'Point', coordinates: [40.7128, -74.006] }, // Default coordinates
    operatingHours: [],
  });

  const handleSubmit = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(
        `${apiUrl}/api/v1/stores/store/${storeId}`,
        {
          brandId: '60d5ecb8b392f8001f1e1d25', // Replace with dynamic value
          ...storeData,
        },
        { withCredentials: true }
      );
      alert('Store updated successfully!');
      console.log('Response:', response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating store:', error);
      alert('Failed to update the store. Please try again.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Split nested fields like 'contactDetails.email'
    const keys = name.split('.');
    setStoreData((prev) => {
      let updated: any = { ...prev };
      keys.reduce((obj, key, index) => {
        if (index === keys.length - 1) {
          obj[key] = value;
        } else {
          obj[key] = { ...obj[key] };
        }
        return obj[key];
      }, updated);
      return updated;
    });
  };

  const handleOperatingHoursChange = (index: number, field: keyof StoreData['operatingHours'][0], value: string) => {
    setStoreData((prev) => {
      const updatedHours = [...prev.operatingHours];
      updatedHours[index][field] = value;
      return { ...prev, operatingHours: updatedHours };
    });
  };

  const addOperatingHours = () => {
    setStoreData((prev) => ({
      ...prev,
      operatingHours: [...prev.operatingHours, { day: '', open: '', close: '' }],
    }));
  };

  return (
    <div className="store-create-container">
      <h2 className="store-create-heading">Add Your Store Details</h2>
      <form
        className="store-create-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* Store Name */}
        <label>
          Store Name:
          <input
            type="text"
            name="storeName"
            value={storeData.storeName}
            onChange={handleChange}
            required
            className="store-create-input"
          />
        </label>

        {/* Description */}
        <label>
          Description:
          <textarea
            name="description"
            value={storeData.description}
            onChange={handleChange}
            required
            className="store-create-input"
          />
        </label>

        {/* Category */}
        <label>
          Category:
          <select
            name="category"
            value={storeData.category}
            onChange={handleChange}
            required
            className="store-create-input"
          >
            <option value="">Select Category</option>
            <option value="Bakery">Bakery</option>
            <option value="Cafe">Cafe</option>
            <option value="Grocery">Grocery</option>
          </select>
        </label>

        {/* Manager Name */}
        <label>
          Manager Name:
          <input
            type="text"
            name="managerName"
            value={storeData.managerName}
            onChange={handleChange}
            required
            className="store-create-input"
          />
        </label>

        {/* Contact Details */}
        <label>
          Email:
          <input
            type="email"
            name="contactDetails.email"
            value={storeData.contactDetails.email}
            onChange={handleChange}
            required
            className="store-create-input"
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="contactDetails.phone.number"
            value={storeData.contactDetails.phone.number}
            onChange={handleChange}
            required
            className="store-create-input"
          />
        </label>

        {/* Address */}
        {['street', 'area', 'city', 'country'].map((field) => (
          <label key={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}:
            <input
              type="text"
              name={`address.${field}`}
              value={(storeData.address as any)[field]}
              onChange={handleChange}
              required
              className="store-create-input"
            />
          </label>
        ))}

        {/* Operating Hours */}
        <div className="store-operating-hours">
          <h3>Operating Hours</h3>
          {storeData.operatingHours.map((hours, index) => (
            <div key={index}>
              <label>
                Day:
                <input
                  type="text"
                  value={hours.day}
                  onChange={(e) => handleOperatingHoursChange(index, 'day', e.target.value)}
                  required
                />
              </label>
              <label>
                Open:
                <input
                  type="time"
                  value={hours.open}
                  onChange={(e) => handleOperatingHoursChange(index, 'open', e.target.value)}
                  required
                />
              </label>
              <label>
                Close:
                <input
                  type="time"
                  value={hours.close}
                  onChange={(e) => handleOperatingHoursChange(index, 'close', e.target.value)}
                  required
                />
              </label>
            </div>
          ))}
          <button type="button" onClick={addOperatingHours}>
            Add Operating Hours
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="store-create-btn">
          Update Store
        </button>
      </form>
    </div>
  );
};

export default IndividualStoreCreate;
