import React, { useState } from 'react';
import axios from 'axios';
import './StoreCreate.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './Header';
import Sidebar from './Sidebar';

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

  const handleSubmit = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      // Hardcoded data for testing
      // Hardcoded data with correct uppercase `day` values
      const hardcodedData = {
        brandId: "60d5ecb8b392f8001f1e1d88", // New brandId
        name: "Sunrise Café",
        description:
          "A cozy café offering freshly brewed coffee, organic teas, and delicious pastries in the heart of Dubai.",
        managerName: "Aisha Khan",
        category: "Cafe",
        image: "https://example.com/images/sunrise-cafe.jpg",
        contactDetails: {
          phone: {
            countryCode: "+971",
            number: "512345678",
          },
          email: "sunriscafy@dubai.ae", // New email to avoid duplicate key error
        },
        address: {
          street: "Sheikh Zayed Road",
          area: "Business Bay",
          city: "Dubai",
          country: "United Arab Emirates",
        },
        location: {
          type: "Point",
          coordinates: [55.2711, 25.2052], // Different coordinates
        },
        operatingHours: [
          {
            day: "MONDAY",
            open: "07:00",
            close: "22:00",
          },
          {
            day: "TUESDAY",
            open: "07:00",
            close: "22:00",
          },
          {
            day: "WEDNESDAY",
            open: "07:00",
            close: "22:00",
          },
          {
            day: "THURSDAY",
            open: "07:00",
            close: "23:00",
          },
          {
            day: "FRIDAY",
            open: "08:00",
            close: "00:00",
          },
          {
            day: "SATURDAY",
            open: "08:00",
            close: "00:00",
          },
          {
            day: "SUNDAY",
            open: "08:00",
            close: "22:00",
          },
        ],
      };
     
      const response = await axios.post(
        `${apiUrl}/api/v1/stores/store/${storeId}`,
        //brandId: '60d5ecb8b392f8001f1e1d89', // Replace with dynamic value if needed
          hardcodedData,  // Use the hardcoded data
        { withCredentials: true }
      );

      alert('Store updated successfully!'+storeId);
      console.log('Response:', response.data);
      console.log(hardcodedData)
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

            {/* Contact Details */}
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

            <div className="store-field">
              <label htmlFor="description">Phone Number</label>
              <input
                type="text"
                name="contactDetails.phone.number"
                value={storeData.contactDetails.phone.number}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="store-create-input"
              />
            </div>


            {/* Store Address Fields */}
            {['street', 'area', 'city', 'country'].map((field) => (
              <div className="store-field" key={field}>
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

            


            {/* Submit Button */}
            
          </div>
          <button type="submit" className="store-create-btn">
            Update Store
          </button>
        </form>
      </div>
    </div>
  );
};

export default IndividualStoreCreate;
