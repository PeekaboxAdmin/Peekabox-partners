'use client';

import type React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './StoreCreate.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ObjectId from 'bson-objectid';

interface StoreData {
  collectionSchedule: {
    timeWindow: { start: string; end: string };
    day: string;
  };
  storeId: string;
  storeName: string;
  description: string;
  category: string;
  image: string;
  isAvailable: boolean;
  managerName: string;
  contactDetails: {
    phone: { countryCode: string; number: string };
    email: string;
  };
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // const getLatLonFromAddress = async (address: StoreData["address"]) => {
  //   try {
  //     const formattedAddress = `${address.street}, ${address.city}, ${address.country}`;
  //     const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  //     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(formattedAddress)}&key=${apiKey}`;

  //     const response = await axios.get(url);
  //     const data = response.data;

  //     if (data.status === "OK" && data.results.length > 0) {
  //       const { lat, lng } = data.results[0].geometry.location;
  //       return { lat, lon: lng };
  //     } else {
  //       throw new Error("Could not find location.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching geolocation:", error);
  //     return { lat: 0, lon: 0 }; // Default coordinates in case of failure
  //   }
  // };

  const handleSubmit = async () => {
    // Reset errors
    setErrors({});

    // Validate form fields
    const newErrors: { [key: string]: string } = {};

    // Store name validation
    if (!storeData.storeName.trim()) {
      newErrors.storeName = 'Store name is required';
    }

    // Description validation
    if (!storeData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    // Category validation
    if (!storeData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    // Manager name validation
    if (!storeData.managerName.trim()) {
      newErrors.managerName = 'Manager name is required';
    }

    // Email validation
    if (!storeData.contactDetails.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(storeData.contactDetails.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!storeData.contactDetails.phone.countryCode.trim()) {
      newErrors.countryCode = 'Country code is required';
    }

    if (!storeData.contactDetails.phone.number.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d+$/.test(storeData.contactDetails.phone.number)) {
      newErrors.phoneNumber = 'Phone number must contain only digits';
    }

    // Address validation
    if (!storeData.address.street.trim()) {
      newErrors.street = 'Street is required';
    }

    if (!storeData.address.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!storeData.address.country.trim()) {
      newErrors.country = 'Country is required';
    }

    // Operating hours validation
    if (storeData.operatingHours.length === 0) {
      newErrors.operatingHours = 'Please add at least one operating hour';
    } else {
      for (let i = 0; i < storeData.operatingHours.length; i++) {
        const hour = storeData.operatingHours[i];
        if (!hour.day.trim()) {
          newErrors[`operatingHours_${i}_day`] = 'Day is required';
        }
        if (!hour.open.trim()) {
          newErrors[`operatingHours_${i}_open`] = 'Opening time is required';
        }
        if (!hour.close.trim()) {
          newErrors[`operatingHours_${i}_close`] = 'Closing time is required';
        }
        if (hour.open && hour.close && hour.open >= hour.close) {
          newErrors[`operatingHours_${i}_time`] =
            'Closing time must be after opening time';
        }
      }
    }

    // If there are errors, set them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL;

      // const { lat, lon } = await getLatLonFromAddress(storeData.address);

      const storePayload = {
        // fix this
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
        // location: { type: "Point", coordinates: [lon, lat] }, // Use real coordinates
        operatingHours: storeData.operatingHours, // Operating hours input by user
      };

      const response = await axios.post(
        `${apiUrl}/api/v1/stores/store${storeId}`,
        storePayload,
        {
          withCredentials: true,
        }
      );

      // console.log("Store Payload Generated:", storePayload);

      alert('Store registered successfully!' + storeId);
      // navigate('/dashboard');
    } catch (error) {
      console.error('Error updating store:', error);
      alert('Failed to update the store. Please try again.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    // Split nested fields like 'contactDetails.phone.countryCode' into an array
    const keys = name.split('.');

    setStoreData((prev) => {
      const updated: any = { ...prev };

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

  const handleOperatingHoursChange = (
    index: number,
    field: keyof StoreData['operatingHours'][0],
    value: string
  ) => {
    setStoreData((prev) => {
      const updatedHours = [...prev.operatingHours];
      updatedHours[index][field] = value;
      return { ...prev, operatingHours: updatedHours };
    });
  };

  const addOperatingHours = () => {
    setStoreData((prev) => ({
      ...prev,
      operatingHours: [
        ...prev.operatingHours,
        { day: '', open: '', close: '' },
      ],
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the selected file
    if (!file) return; // If no file is selected, exit

    const formData = new FormData();
    formData.append('image', file); // Append the image file

    try {
      const apiUrl = process.env.REACT_APP_API_URL; // Your backend API URL

      // Send the image to the backend API
      const response = await axios.post(
        `${apiUrl}/api/v1/store/ProductUpload`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      const imageUrl = response.data.imageUrl; // Get the image URL from the backend

      // Update store data with the uploaded image URL
      setStoreData((prev) => ({ ...prev, image: imageUrl }));

      // Update the image preview with the actual URL from the server
      setPreviewImage(imageUrl);
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image. Please try again.');
    }
  };

  const toggleSidebar = () => setSidebarExpanded(!sidebarExpanded);

  return (
    <div className='storeCreate'>
      <div className='store-create-container'>
        <h2 className='store-create-heading'>Add Your Store Details</h2>
        <form
          className='store-create-form'
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}>
          <div className='store-create-content'>
            {/* Store Image Upload */}
            <div className='store-field'>
              <label>Store Logo</label>
              <input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                className='store-image-upload'
              />
              {previewImage && (
                <img
                  src={previewImage || '/placeholder.svg'}
                  alt='Preview'
                  className='store-image-preview'
                />
              )}
            </div>

            {/* Store Name */}
            <div className='store-field'>
              <label htmlFor='storeName'>Store Name</label>
              <input
                type='text'
                id='storeName'
                name='storeName'
                value={storeData.storeName}
                onChange={handleChange}
                placeholder='Enter Store Name'
                required
                className='store-create-input'
              />
              {errors.storeName && (
                <p className='text-red-500 text-sm mt-1'>{errors.storeName}</p>
              )}
            </div>

            {/* Description */}
            <div className='store-field'>
              <label htmlFor='description'>Store Description</label>
              <input
                type='text'
                id='description'
                name='description'
                value={storeData.description}
                onChange={handleChange}
                placeholder='Brief description of the store'
                required
                className='store-create-input'
              />
              {errors.description && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.description}
                </p>
              )}
            </div>

            {/* Category */}
            <div className='store-field'>
              <label htmlFor='description'>Store Category</label>
              <select
                name='category'
                value={storeData.category}
                onChange={handleChange}
                required
                className='store-create-input'>
                <option value=''>Select Category</option>
                <option value='Bakery'>Bakery</option>
                <option value='Cafe'>Cafe</option>
                <option value='Grocery'>Grocery</option>
              </select>
              {errors.category && (
                <p className='text-red-500 text-sm mt-1'>{errors.category}</p>
              )}
            </div>

            {/* Manager Name */}
            <div className='store-field'>
              <label htmlFor='description'>Manager Name</label>
              <input
                type='text'
                name='managerName'
                value={storeData.managerName}
                onChange={handleChange}
                placeholder='Manager Name'
                required
                className='store-create-input'
              />
              {errors.managerName && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.managerName}
                </p>
              )}
            </div>

            {/* Manager Email */}
            <div className='store-field'>
              <label htmlFor='description'>Manager Email</label>
              <input
                type='email'
                name='contactDetails.email'
                value={storeData.contactDetails.email}
                onChange={handleChange}
                placeholder='Manager Email'
                required
                className='store-create-input'
              />
              {errors.email && (
                <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
              )}
            </div>

            {/* Country Code Input */}
            <div className='store-field'>
              <label htmlFor='countryCode'>Country Code</label>
              <input
                type='text'
                name='contactDetails.phone.countryCode'
                value={storeData.contactDetails.phone.countryCode}
                onChange={handleChange}
                placeholder='e.g +971'
                required
                className='store-create-input'
              />
              {errors.countryCode && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.countryCode}
                </p>
              )}
            </div>

            {/* Phone Number Input */}
            <div className='store-field'>
              <label htmlFor='phoneNumber'>Phone Number</label>
              <input
                type='text'
                name='contactDetails.phone.number'
                value={storeData.contactDetails.phone.number}
                onChange={handleChange}
                placeholder='e.g 509642684'
                required
                className='store-create-input'
              />
              {errors.phoneNumber && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* Store Address Fields */}
            {['street', 'area', 'city', 'country'].map((field, index) => (
              <div className='store-field' key={index}>
                <label htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type='text'
                  name={`address.${field}`}
                  value={(storeData.address as any)[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field}`}
                  required
                  className='store-create-input'
                />
                {errors[field] && (
                  <p className='text-red-500 text-sm mt-1'>{errors[field]}</p>
                )}
                {field === 'street' && errors.street && (
                  <p className='text-red-500 text-sm mt-1'>{errors.street}</p>
                )}
                {field === 'area' && errors.area && (
                  <p className='text-red-500 text-sm mt-1'>{errors.area}</p>
                )}
                {field === 'city' && errors.city && (
                  <p className='text-red-500 text-sm mt-1'>{errors.city}</p>
                )}
                {field === 'country' && errors.country && (
                  <p className='text-red-500 text-sm mt-1'>{errors.country}</p>
                )}
              </div>
            ))}

            {/* Operating Hours */}
            <div className='store-field'>
              <label htmlFor='description'>Operating Hours</label>
              <div className='store-operating-hours'>
                {storeData.operatingHours.map((hours, index) => (
                  <div className='op-content' key={index}>
                    <input
                      type='text'
                      value={hours.day}
                      onChange={(e) =>
                        handleOperatingHoursChange(index, 'day', e.target.value)
                      }
                      placeholder='Day'
                      required
                    />
                    {errors[`operatingHours_${index}_day`] && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors[`operatingHours_${index}_day`]}
                      </p>
                    )}
                    <input
                      type='time'
                      value={hours.open}
                      onChange={(e) =>
                        handleOperatingHoursChange(
                          index,
                          'open',
                          e.target.value
                        )
                      }
                      required
                      placeholder='Open'
                    />
                    {errors[`operatingHours_${index}_open`] && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors[`operatingHours_${index}_open`]}
                      </p>
                    )}
                    <input
                      type='time'
                      value={hours.close}
                      onChange={(e) =>
                        handleOperatingHoursChange(
                          index,
                          'close',
                          e.target.value
                        )
                      }
                      required
                      placeholder='Close'
                    />
                    {errors[`operatingHours_${index}_close`] && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors[`operatingHours_${index}_close`]}
                      </p>
                    )}
                    {errors[`operatingHours_${index}_time`] && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors[`operatingHours_${index}_time`]}
                      </p>
                    )}
                  </div>
                ))}
                <button
                  type='button'
                  className='op-h-btn'
                  onClick={addOperatingHours}>
                  Add Operating Hours
                </button>
                {errors.operatingHours && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.operatingHours}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button type='submit' className='store-create-btn'>
            Create Store
          </button>
        </form>
      </div>
    </div>
  );
};

export default IndividualStoreCreate;
