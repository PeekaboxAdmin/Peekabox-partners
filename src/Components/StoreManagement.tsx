// src/StoreInfo.tsx

import React, { useState } from 'react';
import './StoreInfo.css';
import Logo from './Images/food.jpg'
import Header from './Header';
import Sidebar from './Sidebar';
import MobileSidebar from './SideBarMobile';

// Type Definitions
interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

interface ContactInfo {
  phone: { countryCode: string; number: string };
  email: string;
  website: string;
}

interface BusinessHour {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  open: string;
  close: string;
}

interface Location {
  type: 'Point';
  coordinates: [number, number];
}

interface Store {
  _id: string;
  brandName: string;
  branchName: string;
  brandId: string;
  description?: string;
  address: Address;
  location: Location;
  contactInfo: ContactInfo;
  businessHours: BusinessHour[];
  categories: string[];
  imagesURL: string;
  isActive: boolean;
}

// Main StoreInfo Component
const StoreInfo: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
   const [isMobile, setIsMobile] = useState(false); // State for mobile detection

  // Initial Hardcoded Data
  const [store, setStore] = useState<Store>({
    _id: '123456',
    brandName: 'Example Brand',
    branchName: 'Downtown',
    brandId: 'BR123',
    description: 'A popular downtown branch with a variety of products.',
    address: {
      street: '123 Main St',
      city: 'Example City',
      postalCode: '12345',
      country: 'CountryX',
    },
    location: {
      type: 'Point',
      coordinates: [40.7128, -74.0060],
    },
    contactInfo: {
      phone: { countryCode: '+1', number: '1234567890' },
      email: 'contact@brand.com',
      website: 'https://brand.com',
    },
    businessHours: [
      { day: 'Monday', open: '09:00', close: '18:00' },
      { day: 'Tuesday', open: '09:00', close: '18:00' },
      { day: 'Wednesday', open: '09:00', close: '18:00' },
      { day: 'Thursday', open: '09:00', close: '18:00' },
      { day: 'Friday', open: '09:00', close: '18:00' },
    ],
    categories: ['Restaurant'],
    imagesURL: '"https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fi0.wp.com%2Fthenutritionadventure.com%2Fwp-content%2Fuploads%2F2017%2F07%2FPourHouseAmericanBurger.jpg%3Fresize%3D5236%252C3490&sp=1731312179T0ed266f82ea2e98570d57b97292796e0f0dfdb596e20399449d7dddfd864905c"',
    isActive: true,
  });

  // Predefined categories
  const categoryOptions = [
    'Restaurant',
    'Cafe',
    'Buffet',
    'Takeaway restaurant',
    'Sushi Restaurant',
    'Hotel',
    'Pastry Shop',
    'Supermarket',
    'Fruit and Vegetable store',
    'Other'
  ];

  // Handle Change in Form Inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStore(prevStore => ({
      ...prevStore,
      [name]: value,
    }));
  };

  // Handle Change for Business Hours
  const handleBusinessHourChange = (index: number, field: 'open' | 'close', value: string) => {
    const updatedHours = [...store.businessHours];
    updatedHours[index] = { ...updatedHours[index], [field]: value };
    setStore(prevStore => ({
      ...prevStore,
      businessHours: updatedHours,
    }));
  };

  // Handle Category Selection
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStore(prevStore => ({
      ...prevStore,
      categories: [e.target.value],
    }));
  };

  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
};

  return (
    <div className='store-Container-main'>
      <Header/>
       {isMobile ? (
                <MobileSidebar isOpen={sidebarExpanded} onToggle={toggleSidebar}/>
            ) : (
                <Sidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} onNavClick={() => {}} />
            )}
    <div className="store-container">
      <img src={Logo} alt="Store Logo" className="store-logo" />

      {!isEditing ? (
        <div className="store-details">
          <h2>Store Management</h2>

          <div className="flex-grid">
            <div>
              <h3>Store</h3>
            </div>

            <div className="StoreDinside1">
              <h3>Store Info</h3>

              <div className="horizontal-flex-box">
                <div className="store-detail-container">
                  <h5>Store Name</h5>
                  <p>{store.brandName} - {store.branchName}</p>
                </div>

                <div className="store-detail-container">
                  <h5>Description</h5>
                  <p>{store.description}</p>
                </div>

                <div className="store-detail-container">
                  <h5>Address</h5>
                  <p>{store.address.street}, {store.address.city}, {store.address.country}</p>
                </div>

                <div className="store-detail-container">
                  <h5>Contact</h5>
                  <p>{store.contactInfo.phone.countryCode} {store.contactInfo.phone.number}</p>
                </div>

                <div className="store-detail-container">
                  <h5>Email</h5>
                  <p>{store.contactInfo.email}</p>
                </div>

                {/* Category Section Displayed as Other Store Details */}
                <div className="store-detail-container">
                  <h5>Category</h5>
                  <p>{store.categories[0]}</p>
                </div>
              </div>

              <h5>Business Hours:</h5>
              {store.businessHours.map((hour, index) => (
                <div key={index}>
                  <p>{hour.day}:</p> {hour.open} - {hour.close}
                </div>
              ))}

            </div>
          </div>

          <button className='editbtnst' onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      ) : (
        <form className="edit-form">
          <label>Brand Name:</label>
          <input type="text" name="brandName" value={store.brandName} onChange={handleChange} />

          <label>Branch Name:</label>
          <input type="text" name="branchName" value={store.branchName} onChange={handleChange} />

          <label>Description:</label>
          <textarea name="description" value={store.description} onChange={handleChange} />

          <label>Street:</label>
          <input type="text" name="street" value={store.address.street} onChange={handleChange} />

          <label>City:</label>
          <input type="text" name="city" value={store.address.city} onChange={handleChange} />

          <h3>Edit Business Hours</h3>
          {store.businessHours.map((hour, index) => (
            <div key={index}>
              <label>{hour.day} Open:</label>
              <input
                type="time"
                value={hour.open}
                onChange={(e) => handleBusinessHourChange(index, 'open', e.target.value)}
              />
              <label>{hour.day} Close:</label>
              <input
                type="time"
                value={hour.close}
                onChange={(e) => handleBusinessHourChange(index, 'close', e.target.value)}
              />
            </div>
          ))}

          <h3>Select Category</h3>
          <div className="category-row">
            <label>
              <select
                name="category"
                value={store.categories[0]} // Bind the first category in the array
                onChange={(e) => setStore(prevStore => ({
                  ...prevStore,
                  categories: [e.target.value], // Update the first category
                }))}
              >
                {categoryOptions.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button className='editbtnst' type="button" onClick={() => setIsEditing(false)}>Save</button>
          <button className='editbtnst' type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      )}
    </div>
    </div>
  );
};

export default StoreInfo;
