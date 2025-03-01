import React, { useState } from 'react';
import axios from 'axios';
import './StoreCreate.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './Header';
import Sidebar from './Sidebar';

import ObjectId from 'bson-objectid';

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
  const storeId = useSelector((state: any) => state.storeAuth.Store_id); // Replace `any` with your Redux state type
  const navigate = useNavigate();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

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

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const getLatLonFromAddress = async (address: StoreData["address"]) => {
    try {
      const formattedAddress = `${address.street}, ${address.city}, ${address.country}`;
      const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(formattedAddress)}&key=${apiKey}`;
  
      const response = await axios.get(url);
      const data = response.data;
  
      if (data.status === "OK" && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lon: lng };
      } else {
        throw new Error("Could not find location.");
      }
    } catch (error) {
      console.error("Error fetching geolocation:", error);
      return { lat: 0, lon: 0 }; // Default coordinates in case of failure
    }
  };

  const handleSubmit = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;

      
      const { lat, lon } = await getLatLonFromAddress(storeData.address);

      const storePayload = { // fix this
        brandId: new ObjectId().toHexString(),
        storeName: storeData.storeName,
        description: storeData.description,
        category: storeData.category,
        image: storeData.image, // Image URL from upload
        managerName: storeData.managerName,
        contactDetails: {
          phone: {
            countryCode: storeData.contactDetails.phone.countryCode,
            number: storeData.contactDetails.phone.number,
          },
          email: storeData.contactDetails.email,
        },        
        address: {
          street: storeData.address.street,
          area: storeData.address.area,
          city: storeData.address.city,
          country: storeData.address.country,
        },
        location: { type: "Point", coordinates: [lon, lat] }, // Use real coordinates
        operatingHours: storeData.operatingHours, // Operating hours input by user
      };

      const response = await axios.post(`${apiUrl}/api/v1/stores/store${storeId}`, storePayload, {
        withCredentials: true,
      });

      // console.log("Store Payload Generated:", storePayload);

      alert('Store registered successfully!'+storeId);
      // navigate('/dashboard');
    } catch (error) {
      console.error('Error updating store:', error);
      alert('Failed to update the store. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    // Split nested fields like 'contactDetails.phone.countryCode' into an array
    const keys = name.split('.');
  
    setStoreData((prev) => {
      let updated: any = { ...prev };
  
      keys.reduce((obj, key, index) => {
        if (index === keys.length - 1) {
          obj[key] = value; // Set the final value
        } else {
          obj[key] = { ...obj[key] }; // Keep copying existing structure
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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the selected file
    if (!file) return; // If no file is selected, exit
  
    const formData = new FormData();
    formData.append("image", file); // Append the image file
  
    try {
      const apiUrl = process.env.REACT_APP_API_URL; // Your backend API URL
  
      // Send the image to the backend API
      const response = await axios.post(`${apiUrl}/upload-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      const imageUrl = response.data.imageUrl; // Get the image URL from the backend
  
      // Update store data with the uploaded image URL
      setStoreData((prev) => ({ ...prev, image: imageUrl }));
  
      // Update the image preview with the actual URL from the server
      setPreviewImage(imageUrl);
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  const toggleSidebar = () => setSidebarExpanded(!sidebarExpanded);
  

  return (
    <div className='storeCreate'>
      <Header />
      <Sidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} onNavClick={() => {}} />

      <div className="store-create-container">
        <h2 className="store-create-heading">Add Your Store Details</h2>
        <form
          className="store-create-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="store-create-content">
            {/* Store Image Upload */}
            <div className="store-field">
              <label>Store Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="store-image-upload"
              />
              {previewImage && (
                <img src={previewImage} alt="Preview" className="store-image-preview" />
              )}
            </div>

            {/* Store Name */}
            <div className="store-field">
              <label htmlFor="storeName">Store Name</label>
              <input
                type="text"
                id="storeName"
                name="storeName"
                value={storeData.storeName}
                onChange={handleChange}
                placeholder="Enter Store Name"
                required
                className="store-create-input"
              />
            </div>
          
            {/* Description */}
            <div className="store-field">
              <label htmlFor="description">Store Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={storeData.description}
                onChange={handleChange}
                placeholder="Brief description of the store"
                required
                className="store-create-input"
              />
            </div>

            {/* Category */}
            <div className="store-field">
              <label htmlFor="description">Store Category</label>
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
            </div>
            
            {/* Manager Name */}
            <div className="store-field">
              <label htmlFor="description">Manager Name</label>
              <input
                type="text"
                name="managerName"
                value={storeData.managerName}
                onChange={handleChange}
                placeholder="Manager Name"
                required
                className="store-create-input"
              />
            </div>

            {/* Manager Email */}
            <div className="store-field">
              <label htmlFor="description">Manager Email</label>
              <input
                type="email"
                name="contactDetails.email"
                value={storeData.contactDetails.email}
                onChange={handleChange}
                placeholder="Manager Email"
                required
                className="store-create-input"
              />
            </div>

            {/* Country Code Input */}
            <div className="store-field">
              <label htmlFor="countryCode">Country Code</label>
              <input
                type="text"
                name="contactDetails.phone.countryCode"
                value={storeData.contactDetails.phone.countryCode}
                onChange={handleChange}
                placeholder="e.g +971"
                required
                className="store-create-input"
              />
            </div>

            {/* Phone Number Input */}
            <div className="store-field">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                name="contactDetails.phone.number"
                value={storeData.contactDetails.phone.number}
                onChange={handleChange}
                placeholder="e.g 509642684"
                required
                className="store-create-input"
              />
            </div>

            {/* Store Address Fields */}
            {['street', 'area', 'city', 'country'].map((field) => (
              <div className="store-field">
                <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  key={field}
                  type="text"
                  name={`address.${field}`}
                  value={(storeData.address as any)[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field}`}
                  required
                  className="store-create-input"
                />
              </div>
            ))}

            {/* Operating Hours */}
            <div className='store-field'>
              <label htmlFor="description">Operating Hours</label>
              <div className="store-operating-hours">
                {storeData.operatingHours.map((hours, index) => (
                  <div className="op-content" key={index}>
                    <input
                      type="text"
                      value={hours.day}
                      onChange={(e) => handleOperatingHoursChange(index, 'day', e.target.value)}
                      placeholder="Day"
                      required
                    />
                    <input
                      type="time"
                      value={hours.open}
                      onChange={(e) => handleOperatingHoursChange(index, 'open', e.target.value)}
                      required
                      placeholder="Open"
                    />
                    <input
                      type="time"
                      value={hours.close}
                      onChange={(e) => handleOperatingHoursChange(index, 'close', e.target.value)}
                      required
                      placeholder="Close"
                    />
                  </div>
                ))}
                <button type="button" className="op-h-btn" onClick={addOperatingHours}>
                  Add Operating Hours
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="store-create-btn">
            Create Store
          </button>

        </form>
      </div>
    </div>
  );
};

export default IndividualStoreCreate;
