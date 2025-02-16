import React, { useState, useEffect } from 'react';
import './StoreInfo.css';
import Logo from './Images/food.jpg';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileSidebar from './SideBarMobile';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../GlobalStateManagement/store';

// Type Definitions
interface Address {
  street: string;
  area: string;
  city: string;
  country: string;
}

interface ContactDetails {
  phone: { countryCode: string; number: string };
  email: string;
}

interface BusinessHour {
  day: string;
  open: string;
  close: string;
}

interface Location {
  type: 'Point';
  coordinates: [number, number];
}

interface Store {
  _id: string;
  name: string;
  description: string;
  brandId: string;
  address: Address;
  location: Location;
  contactDetails: ContactDetails;
  operatingHours: BusinessHour[];
  category: string;
  image: string;
  isDeleted: boolean;
}

const StoreInfo: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [store, setStore] = useState<Store | null>(null);
  const storeId = useSelector((state: RootState) => state.storeAuth.Store_id);

  const apiUrl = process.env.REACT_APP_API_URL;

  // Fetch store data from API
  useEffect(() => {
    const fetchStoreData = async () => {
      if (!storeId) return;
      try {
        const response = await axios.get(`${apiUrl}/api/v1/stores/store/${storeId}`, {
          withCredentials: true,
        });

        if (response.data.success) {
          console.log(response);
          setStore(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching store data:', error);
      }
    };

    fetchStoreData();
  }, [storeId]);

  // Redirect to login if no storeId
  useEffect(() => {
    if (!storeId) {
      navigate('/signup/login');
    }
  }, [storeId, navigate]);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

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
    'Other',
  ];

  // Hardcoded data for test
  const hardcodedData = {
    brandId: '60d5ecb8b392f8001f1e1d89',
    storeId: storeId || '',
    name: 'Sample Store',
    description: 'This is a sample store.',
    category: 'Grocery',
    image: 'sample-image-url.jpg',
    isAvailable: true,
    managerName: 'John Doe',
    contactDetails: {
      phone: { countryCode: '+1', number: '1234567890' },
      email: 'manager@sample.com',
    },
    address: {
      street: '123 Main St',
      area: 'Central Park',
      city: 'New York',
      country: 'USA',
    },
    location: { type: 'Point', coordinates: [40.7128, -74.0060] },
    operatingHours: [
      { day: 'MONDAY', open: '09:00', close: '18:00' },
      { day: 'TUESDAY', open: '09:00', close: '18:00' },
      { day: 'WEDNESDAY', open: '09:00', close: '18:00' },
      { day: 'THURSDAY', open: '09:00', close: '18:00' },
      { day: 'FRIDAY', open: '09:00', close: '18:00' },
      { day: 'SATURDAY', open: '10:00', close: '16:00' },
      { day: 'SUNDAY', open: '10:00', close: '14:00' },
    ],
    offersDelivery: false,
  };

  const handleUpdateStore = async () => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/v1/stores/store/${storeId}`,
        hardcodedData,
        { withCredentials: true }
      );

      alert('Store updated successfully!');
      setIsEditing(false);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error updating store:', error);
      alert('Failed to update the store. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!store) return;
    const { name, value } = e.target;

    setStore((prevStore) => ({
      ...prevStore!,
      address: {
        ...prevStore!.address,
        [name]: value,
      },
    }));
  };

  return (
    <div className="store-Container-main">
      <Header />
      <MobileSidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} />
      <Sidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} onNavClick={() => {}} />

      <div className="store-container">
        <img src={store?.image ? `${apiUrl}/${store.image}` : Logo} alt="Store Logo" className="store-logo" />

        {!isEditing ? (
          <div className="store-details">
            <h2>Store Management</h2>

            <div className="store-detail-container">
              <h5>Store Name</h5>
              <p>{store?.name}</p>
            </div>

            <div className="store-detail-container">
              <h5>Description</h5>
              <p>{store?.description}</p>
            </div>

            <div className="store-detail-container">
              <h5>Address</h5>
              <p>
                {store?.address.street}, {store?.address.area}, {store?.address.city}, {store?.address.country}
              </p>
            </div>

            <div className="store-detail-container">
              <h5>Contact</h5>
              <p>
                {store?.contactDetails.phone.countryCode} {store?.contactDetails.phone.number}
              </p>
            </div>

            <button className="editbtnst" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          </div>
        ) : (
          <form className="edit-form">
            <label>Store Name:</label>
            <input type="text" name="name" value={store?.name || ''} onChange={handleChange} />

            <label>Description:</label>
            <textarea name="description" value={store?.description || ''} onChange={handleChange} />

            <label>Street:</label>
            <input type="text" name="street" value={store?.address.street || ''} onChange={handleChange} />

            <label>Category:</label>
            <select
              name="category"
              value={store?.category || ''}
              onChange={(e) => setStore({ ...store!, category: e.target.value })}
            >
              {categoryOptions.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <button type="button" onClick={handleUpdateStore}>
              Save
            </button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default StoreInfo;
