'use client';

import type React from 'react';
import { useState, useRef } from 'react';
import Button from '../../../Components/Button/Button';
import './BranchDetails.css';
import { useDispatch } from 'react-redux';
import { setStoreAuth } from '../../../GlobalStateManagement/storeAuthSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Triangle from '../../../Components/Triangle/Triangle';
import HeaderBar from '../../../Components/HeaderBar/HeaderBar';

// Import the type definitions
import '../../../types/google-maps.d.ts';

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
  day: string; // Day as a string (e.g., "MONDAY")
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
  managerName: string;
  brandId: string;
  address: Address;
  location: Location;
  contactDetails: ContactDetails;
  operatingHours: BusinessHour[];
  category: string;
  image: string;
  isDeleted: boolean;
}

// Define types for Google Maps events
interface MapClickEvent {
  latLng: { lat: () => number; lng: () => number };
}

const storeTypes = [
  'Restaurant',
  'Cafe',
  'Buffet restaurant',
  'Takeaway restaurant',
  'Sushi restaurant',
  'Hotel',
  'Bakery',
  'Pastry shop',
  'Supermarket',
  'Beverage shop',
  'Butcher shop',
  'Fruit & vegetable store',
  'Other',
];

type BranchDetailsProps = {};

const hardcodedData: Store = {
  _id: '',
  name: '',
  description: '',
  managerName: '',
  brandId: '',
  address: {
    street: '',
    area: '',
    city: '',
    country: '',
  },
  location: {
    type: 'Point',
    coordinates: [55.279, 25.1978],
  },
  contactDetails: {
    phone: {
      countryCode: '+971',
      number: '',
    },
    email: '',
  },
  operatingHours: [{ day: '', open: '', close: '' }],
  category: '',
  image: '',
  isDeleted: false,
};

const BranchDetails: React.FC<BranchDetailsProps> = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [verified, setVerified] = useState(true);
  const [verifiedEmail, setVerifiedEmail] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [store, setStore] = useState<Store>(hardcodedData);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Google Maps related state
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [searchBox, setSearchBox] = useState<any>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeMessage, setActiveMessage] = useState('');
  const apiurl = process.env.REACT_APP_API_URL;
  const [imagef, setImagef] = useState<File | null>(null);

  const addOperatingHour = () => {
    const updatedHours = [...store.operatingHours];
    updatedHours.push({ day: '', open: '', close: '' });
    setStore({ ...store, operatingHours: updatedHours });
  };

  // Google Maps functions
  // Load Google Maps script
  const loadGoogleMapsScript = () => {
    if (typeof window.google === 'undefined') {
      // Load the Google Maps API script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      // Google Maps API is already loaded
      initializeMap();
    }
  };

  // Initialize Google Maps
  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    const mapOptions = {
      center: {
        lat: store.location.coordinates[1],
        lng: store.location.coordinates[0],
      },
      zoom: 15,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
    };

    const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);

    const newMarker = new window.google.maps.Marker({
      position: {
        lat: store.location.coordinates[1],
        lng: store.location.coordinates[0],
      },
      map: newMap,
      draggable: true,
      animation: window.google.maps.Animation.DROP,
    });
    setMarker(newMarker);

    // Initialize search box if reference exists
    if (searchBoxRef.current) {
      const newSearchBox = new window.google.maps.places.SearchBox(
        searchBoxRef.current
      );
      setSearchBox(newSearchBox);

      // Listen for places selection
      window.google.maps.event.addListener(
        newSearchBox,
        'places_changed',
        () => {
          const places = newSearchBox.getPlaces();
          if (places && places.length > 0) {
            const place = places[0];
            if (place.geometry && place.geometry.location) {
              newMap.setCenter(place.geometry.location);
              newMarker.setPosition(place.geometry.location);
              updateLocationFromMap(
                place.geometry.location.lat(),
                place.geometry.location.lng()
              );
            }
          }
        }
      );
    }

    // Handle marker drag end
    window.google.maps.event.addListener(newMarker, 'dragend', () => {
      if (newMarker.getPosition()) {
        const position = newMarker.getPosition();
        updateLocationFromMap(position.lat(), position.lng());
      }
    });

    // Handle map click
    window.google.maps.event.addListener(
      newMap,
      'click',
      (event: MapClickEvent) => {
        newMarker.setPosition(event.latLng);
        updateLocationFromMap(event.latLng.lat(), event.latLng.lng());
      }
    );
  };

  // Update location from map
  const updateLocationFromMap = async (lat: number, lng: number) => {
    try {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        { location: { lat, lng } },
        (results: any[], status: string) => {
          if (status === 'OK' && results && results[0]) {
            const addressComponents = results[0].address_components;

            let street = '';
            let area = '';
            let city = '';
            let country = '';

            for (const component of addressComponents) {
              const types = component.types;

              if (types.includes('street_number')) {
                street = component.long_name + ' ';
              } else if (types.includes('route')) {
                street += component.long_name;
              } else if (
                types.includes('sublocality') ||
                types.includes('neighborhood')
              ) {
                area = component.long_name;
              } else if (types.includes('locality')) {
                city = component.long_name;
              } else if (types.includes('country')) {
                country = component.long_name;
              }
            }

            setStore({
              ...store,
              location: {
                type: 'Point',
                coordinates: [lng, lat],
              },
              address: {
                street: street.trim(),
                area,
                city,
                country,
              },
            });
          }
        }
      );
    } catch (error) {
      console.error('Error updating location from map:', error);
    }
  };

  // Toggle map visibility
  const toggleMap = () => {
    const newShowMap = !showMap;
    setShowMap(newShowMap);

    if (newShowMap) {
      // Load map on next tick to ensure the container is rendered
      setTimeout(() => {
        loadGoogleMapsScript();
      }, 0);
    }
  };

  // TEMPORARY REMOVE FOR TESTING
  // const verifiedHandle = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${apiurl}/api/v1/stores/auth/verifyOTP`,
  //       {
  //         purpose: 'SIGNUP',
  //         email,
  //         password,
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     );

  //     if (response.status === 200) {
  //       const storeId = response.data.data.storeAuth._id;
  //       dispatch(setStoreAuth({ Store_id: storeId }));
  //       setVerified(false);
  //       setActiveMessage(
  //         'Email and password are added you may proceed with adding other store details'
  //       );
  //       setErrorMessage('');
  //       setVerifiedEmail(true);
  //       setStore({
  //         ...store,
  //         contactDetails: { ...store.contactDetails, email },
  //       }); // Set branch email to login email
  //       setCurrentStep(2); // Move to the next step
  //     }
  //   } catch (error: any) {
  //     if (axios.isAxiosError(error) && error.response) {
  //       setErrorMessage(
  //         error.response.data?.errorMessage ||
  //           'Failed to verify OTP. Please try again.'
  //       );
  //     } else {
  //       setErrorMessage('An unexpected error occurred. Please try again.');
  //     }
  //   }
  // };

  // TEMPORARY VERIFIED
  const verifiedHandle = async () => {
    try {
      // Skip the actual API call and simulate a successful response
      const mockStoreId = 'mock-store-id-' + Date.now();

      // Update Redux state
      dispatch(setStoreAuth({ Store_id: mockStoreId }));

      // Also save to localStorage
      localStorage.setItem('Store_id', mockStoreId);

      // Update UI state to allow proceeding
      setVerified(false);
      setActiveMessage(
        'Email and password are added you may proceed with adding other store details'
      );
      setErrorMessage('');
      setVerifiedEmail(true);

      setCurrentStep(2);

      console.log(
        'Successfully bypassed verification with mock store ID:',
        mockStoreId
      );
    } catch (error: any) {
      console.error('Error in verification bypass:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  const uploadImageToS3 = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await axios.post(
      `${apiurl}/api/v1/stores/ProductUpload`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      }
    );
    return response.data.data.imageUrl;
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    // Step 1 validation
    if (currentStep === 1) {
      if (!email.trim()) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Please enter a valid email address';
      }

      if (!password.trim()) {
        errors.password = 'Password is required';
      } else if (password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      }
    }

    // Step 2 validation
    if (currentStep === 2) {
      if (!store.name.trim()) {
        errors.name = 'Branch name is required';
      }

      if (!store.description.trim()) {
        errors.description = 'Description is required';
      }
    }

    // Step 3 validation
    if (currentStep === 3) {
      if (!store.category.trim()) {
        errors.category = 'Store type is required';
      }

      if (!store.contactDetails.phone.number.trim()) {
        errors.phoneNumber = 'Phone number is required';
      } else if (!/^\d+$/.test(store.contactDetails.phone.number)) {
        errors.phoneNumber = 'Phone number must contain only digits';
      }
    }

    // Step 4 validation
    if (currentStep === 4) {
      if (!store.address.street.trim()) {
        errors.street = 'Street is required';
      }

      if (!store.address.city.trim()) {
        errors.city = 'City is required';
      }

      if (!store.address.country.trim()) {
        errors.country = 'Country is required';
      }

      if (!store.managerName.trim()) {
        errors.managerName = "Manager's name is required";
      }
    }

    // Step 5 validation
    if (currentStep === 5) {
      if (store.operatingHours.length === 0) {
        errors.operatingHours = 'Please add at least one operating hour';
      } else {
        let hasValidHours = false;
        for (const hour of store.operatingHours) {
          if (hour.day && hour.open && hour.close) {
            hasValidHours = true;
            break;
          }
        }
        if (!hasValidHours) {
          errors.operatingHours =
            'Please complete at least one operating hour entry';
        }
      }
    }

    return errors;
  };

  const handleNext = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setCurrentStep((prev) => prev + 1);
  };

  const handleupdatestore = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Get the store ID from your Redux store or from the response of verifyOTP
    const storeId = localStorage.getItem('Store_id');

    if (!storeId) {
      alert('Store ID not found. Please verify your email and password first.');
      return;
    }

    try {
      let imageUrl = '';
      if (imagef) {
        imageUrl = await uploadImageToS3(imagef);
      }

      const formattedOperatingHours = store.operatingHours
        .map((hour) => {
          if (!hour.day) {
            // Skip empty entries
            return null;
          }

          return {
            day: hour.day.trim().toUpperCase(), // Convert to uppercase
            open: hour.open,
            close: hour.close,
          };
        })
        .filter((hour) => hour !== null); // Remove any null entries

      const updatedStoreData = {
        name: store.name,
        description: store.description,
        managerName: store.managerName,
        category: store.category, // Use dynamic value
        image: imageUrl, // Image URL or Base64 string
        contactDetails: {
          phone: {
            countryCode: store.contactDetails.phone.countryCode,
            number: store.contactDetails.phone.number,
          },
          email: store.contactDetails.email,
        },
        address: {
          street: store.address.street,
          area: store.address.area,
          city: store.address.city,
          country: store.address.country,
        },
        location: store.location, // Assuming the location doesn't change, if it does, update accordingly
        operatingHours: formattedOperatingHours, // The operating hours from the updated state
      };

      const response = await axios.post(
        `${apiurl}/api/v1/stores/store/${storeId}`,
        updatedStoreData,
        {
          withCredentials: true,
        }
      );

      alert('Store updated successfully!');
      console.log('Response:', response.data);
      navigate('/signup/brand-created');
    } catch (error) {
      console.error('Error updating store:', error);
      alert('Failed to update the store. Please try again.');
    }
  };

  const HandleBack = () => {
    navigate('/signup/brand-created');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className='mt-4 space-y-6'>
            <div className='form-step-branch'>
              <div className='step-badge-branch'>1</div>
              <div className='form-group-branch'>
                <h2 className='form-title-branch'>Manager Email</h2>
                <input
                  type='email'
                  placeholder='Branch Email'
                  disabled={verifiedEmail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='form-input-branch'
                />
                {formErrors.email && (
                  <p className='text-red-500 text-sm mt-1'>
                    {formErrors.email}
                  </p>
                )}
              </div>
            </div>

            <div className='form-separator-branch'></div>

            <div className='form-step-branch'>
              <div className='step-badge-branch'>2</div>
              <div className='form-group-branch'>
                <h2 className='form-title-branch'>Manager Password</h2>
                <input
                  type='password'
                  placeholder='Password'
                  disabled={verifiedEmail}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className='form-input-branch'
                />
                {formErrors.password && (
                  <p className='text-red-500 text-sm mt-1'>
                    {formErrors.password}
                  </p>
                )}
              </div>
            </div>

            <div className='flex flex-col gap-4'>
              <Button
                label='Next'
                type='button'
                className='form-button-branch'
                onClick={verifiedHandle}
              />
              <label className='ml-2 mb-2 text-red-900'>{errorMessage}</label>
              <label className='ml-2 text-green-500'>{activeMessage}</label>
            </div>
          </div>
        );

      case 2:
        return (
          <div className='mt-4 space-y-6'>
            <div className='form-step-branch'>
              <div className='step-badge-branch'>3</div>
              <div className='form-group-branch'>
                <h2 className='form-title-branch'>Branch Name</h2>
                <input
                  type='text'
                  placeholder='Branch Name'
                  disabled={verified}
                  value={store.name}
                  onChange={(e) => setStore({ ...store, name: e.target.value })}
                  required
                  className='form-input-branch'
                />
                {formErrors.name && (
                  <p className='text-red-500 text-sm mt-1'>{formErrors.name}</p>
                )}
              </div>
            </div>
            <div className='form-separator-branch'></div>
            <div className='form-step-branch'>
              <div className='step-badge-branch'>4</div>
              <div className='form-group-branch'>
                <h2 className='form-title-branch'>Branch Description</h2>
                <textarea
                  placeholder='Description'
                  disabled={verified}
                  value={store.description}
                  onChange={(e) =>
                    setStore({ ...store, description: e.target.value })
                  }
                  className='description-field w-full p-2 border border-gray-300 rounded-md'
                />
                {formErrors.description && (
                  <p className='text-red-500 text-sm mt-1'>
                    {formErrors.description}
                  </p>
                )}
              </div>
            </div>
            <div className='button-container'>
              <Button
                label='Back'
                type='button'
                className='form-button-branch-case2'
                onClick={() => setCurrentStep(1)}
              />
              <Button
                label='Next'
                type='button'
                className='form-button-branch-case2'
                onClick={handleNext}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className='mt-4 space-y-6'>
            <div className='form-step-branch'>
              <div className='step-badge-branch'>5</div>
              <div className='form-group-branch'>
                <h2 className='form-title-branch'>Select Store Type</h2>
                <select
                  disabled={verified}
                  value={store.category}
                  onChange={(e) =>
                    setStore({ ...store, category: e.target.value })
                  }
                  required
                  className='input-field-branchDetails w-full p-2 border border-gray-300 rounded-md'>
                  <option value=''>Select Store Type</option>
                  {storeTypes.map((type, i) => (
                    <option key={i} value={type.toLowerCase()}>
                      {type}
                    </option>
                  ))}
                </select>
                {formErrors.category && (
                  <p className='text-red-500 text-sm mt-1'>
                    {formErrors.category}
                  </p>
                )}
              </div>
            </div>
            <div className='form-separator-branch'></div>
            <div className='form-step-branch'>
              <div className='step-badge-branch'>6</div>
              <div className='form-group-branch'>
                <h2 className='form-title-branch'>Branch Phone Number</h2>
                <input
                  type='text'
                  placeholder='Branch Phone Number'
                  disabled={verified}
                  value={store.contactDetails.phone.number}
                  onChange={(e) =>
                    setStore({
                      ...store,
                      contactDetails: {
                        ...store.contactDetails,
                        phone: {
                          ...store.contactDetails.phone,
                          number: e.target.value,
                        },
                      },
                    })
                  }
                  required
                  className='form-input-branch'
                />
                {formErrors.phoneNumber && (
                  <p className='text-red-500 text-sm mt-1'>
                    {formErrors.phoneNumber}
                  </p>
                )}
              </div>
            </div>

            <div className='button-container'>
              <Button
                label='Back'
                type='button'
                className='form-button-branch-case2'
                onClick={() => setCurrentStep(2)}
              />
              <Button
                label='Next'
                type='button'
                className='form-button-branch-case2'
                onClick={handleNext}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className='mt-4 space-y-6'>
            <div className='form-step-branch'>
              <div className='step-badge-branch'>7</div>
              <div className='form-group-branch'>
                <h2 className='form-title-branch'>Branch Address</h2>

                <button
                  type='button'
                  onClick={toggleMap}
                  className='map-button'
                  disabled={verified}>
                  {showMap ? 'Hide Map' : 'Find on Map'}
                </button>

                {showMap && (
                  <div>
                    <input
                      ref={searchBoxRef}
                      type='text'
                      placeholder='Search for a location'
                      className='map-search-box'
                      disabled={verified}
                    />
                    <div className='map-container'>
                      <div
                        ref={mapRef}
                        style={{ height: '100%', width: '100%' }}></div>
                    </div>
                  </div>
                )}

                <div className='flex flex-wrap gap-4'>
                  <input
                    type='text'
                    placeholder='Street'
                    disabled={verified}
                    value={store.address.street}
                    onChange={(e) =>
                      setStore({
                        ...store,
                        address: { ...store.address, street: e.target.value },
                      })
                    }
                    className='flex-1 p-2 border border-gray-300 rounded-md'
                  />
                  {formErrors.street && (
                    <p className='text-red-500 text-sm mt-1'>
                      {formErrors.street}
                    </p>
                  )}
                  <input
                    type='text'
                    placeholder='Area'
                    disabled={verified}
                    value={store.address.area}
                    onChange={(e) =>
                      setStore({
                        ...store,
                        address: { ...store.address, area: e.target.value },
                      })
                    }
                    className='flex-1 p-2 border border-gray-300 rounded-md'
                  />
                </div>

                <div className='flex flex-wrap gap-4 mt-4'>
                  <input
                    type='text'
                    placeholder='City'
                    disabled={verified}
                    value={store.address.city}
                    onChange={(e) =>
                      setStore({
                        ...store,
                        address: { ...store.address, city: e.target.value },
                      })
                    }
                    className='flex-1 p-2 border border-gray-300 rounded-md'
                  />
                  {formErrors.city && (
                    <p className='text-red-500 text-sm mt-1'>
                      {formErrors.city}
                    </p>
                  )}
                  <input
                    type='text'
                    placeholder='Country'
                    disabled={verified}
                    value={store.address.country}
                    onChange={(e) =>
                      setStore({
                        ...store,
                        address: { ...store.address, country: e.target.value },
                      })
                    }
                    className='flex-1 p-2 border border-gray-300 rounded-md'
                  />
                  {formErrors.country && (
                    <p className='text-red-500 text-sm mt-1'>
                      {formErrors.country}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className='form-separator-branch'></div>
            <div className='form-step-branch'>
              <div className='step-badge-branch'>8</div>
              <div className='form-group-branch'>
                <h2 className='form-title-branch'>Manager's Name</h2>
                <input
                  type='text'
                  placeholder="Manager's Name"
                  disabled={verified}
                  value={store.managerName}
                  onChange={(e) =>
                    setStore({ ...store, managerName: e.target.value })
                  }
                  required
                  className='form-input-branch'
                />
                {formErrors.managerName && (
                  <p className='text-red-500 text-sm mt-1'>
                    {formErrors.managerName}
                  </p>
                )}
              </div>
            </div>
            <div className='button-container'>
              <Button
                label='Back'
                type='button'
                className='form-button-branch-case2'
                onClick={() => setCurrentStep(3)}
              />
              <Button
                label='Next'
                type='button'
                className='form-button-branch-case2'
                onClick={handleNext}
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className='mt-4 space-y-6 paddingChangeBody'>
            <div className='form-step-branch'>
              <div className='step-badge-branch'>9</div>
              <div className='form-group-branch'>
                <h2 className='form-title-branch'>Operating Hours</h2>

                {store.operatingHours.map((hours, idx) => (
                  <div key={idx} className='flex flex-wrap gap-4 mb-4'>
                    <select
                      disabled={verified}
                      value={hours.day}
                      onChange={(e) => {
                        const updatedHours = [...store.operatingHours];
                        updatedHours[idx].day = e.target.value;
                        setStore({ ...store, operatingHours: updatedHours });
                      }}
                      className='form-input-branch operating-hours-width'>
                      <option value=''>Select Day</option>
                      <option value='Sunday'>SUNDAY</option>
                      <option value='Monday'>MONDAY</option>
                      <option value='Tuesday'>TUESDAY</option>
                      <option value='Thursday'>THURSDAY</option>
                      <option value='Friday'>FRIDAY</option>
                      <option value='Saturday'>SATURDAY</option>
                    </select>

                    <input
                      type='time'
                      placeholder='Open'
                      disabled={verified}
                      value={hours.open}
                      onChange={(e) => {
                        const updatedHours = [...store.operatingHours];
                        updatedHours[idx].open = e.target.value;
                        setStore({ ...store, operatingHours: updatedHours });
                      }}
                      className='form-input-branch operating-hours-width'
                    />
                    <input
                      type='time'
                      placeholder='Close'
                      disabled={verified}
                      value={hours.close}
                      onChange={(e) => {
                        const updatedHours = [...store.operatingHours];
                        updatedHours[idx].close = e.target.value;
                        setStore({ ...store, operatingHours: updatedHours });
                      }}
                      className='form-input-branch operating-hours-width'
                    />
                  </div>
                ))}
                {formErrors.operatingHours && (
                  <p className='text-red-500 text-sm mt-1'>
                    {formErrors.operatingHours}
                  </p>
                )}

                <Button
                  label='Add Operating Hour'
                  className='mt-4 changeBorderColor text-white py-2 px-4 rounded-md button-pink-color'
                  type='button'
                  onClick={addOperatingHour}
                />
              </div>
            </div>

            <div className='button-container'>
              <Button
                label='Back'
                type='button'
                className='form-button-branch-case3'
                onClick={() => setCurrentStep(4)} // Go back to Case 4
              />
              <Button
                label='Submit & Join'
                onClick={handleupdatestore}
                className='form-button-branch-case3'
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='space-y-6 px-4 sm:px-6 lg:px-8 mt-10 marginTopChange'>
      <Triangle>
        <div className='w-full max-w-4xl'>
          <HeaderBar>Add Branch</HeaderBar>
        </div>
        {renderStep()}
      </Triangle>
    </div>
  );
};

export default BranchDetails;
