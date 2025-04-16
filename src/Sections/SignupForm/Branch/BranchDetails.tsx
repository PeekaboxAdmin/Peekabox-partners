import React, { useState } from 'react';
import SurpriseBagForm, { SurpriseBagData } from '../SurpriseBag/SurpriseBagForm';
import Button from '../../../Components/Button/Button';
import Input from '../../../Components/Input/Input';
import './BranchDetails.css';
// import { Flag } from 'lucide-react'; // unused
import { useDispatch } from 'react-redux';
import { setStoreAuth } from '../../../GlobalStateManagement/storeAuthSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Triangle from '../../../Components/Triangle/Triangle';
import HeaderBar from '../../../Components/HeaderBar/HeaderBar';

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
  managerName : string ;
  brandId: string;
  address: Address;
  location: Location;
  contactDetails: ContactDetails;
  operatingHours: BusinessHour[];
  category: string;
  image: string;
  isDeleted: boolean;
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

interface BranchDetailsProps {
}



const hardcodedData: Store = {
  _id: "",
  name: "",
  description: "",
    managerName: "",
    brandId: "",
  address: {
    street: "",
    area: "",
    city: "",
    country: "",
  },
  location: {
    type: "Point",
    coordinates: [55.279, 25.1978],
  },
  contactDetails: {
    phone: {
      countryCode: "+971",
      number: "",
    },
    email: "",
  },
  operatingHours: [
    { day: "", open: "", close: "" },
    // { day: "", open: "", close: "" },
    // { day: "", open: "", close: "" },
    // { day: "", open: "", close: "" },
    // { day: "", open: "", close: "" },
    // { day: "", open: "", close: "" },
    // { day: "", open: "", close: "" },
  ],
  category: "",
  image: "",
  isDeleted: false,
};

const BranchDetails: React.FC<BranchDetailsProps> = () => {
  const [verified, setVerified] = useState(true);
  const [verifiedEmail, setVerifiedEmail] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [store, setStore] = useState<Store>(hardcodedData);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeMessage, setActiveMessage] = useState('');
  const [expanded, setExpanded] = useState(false);
  const apiurl = process.env.REACT_APP_API_URL;
  const [imagef, setImagef] = useState<File | null>(null);

  const addOperatingHour = () => {
    const updatedHours = [...store.operatingHours];
    updatedHours.push({ day: "", open: "", close: "" });
    setStore({...store, operatingHours: updatedHours});
  };
   
  const verifiedHandle = async () => {
    try {
      
      const response = await axios.post(`${apiurl}/api/v1/stores/auth/verifyOTP`, {
        purpose: 'SIGNUP',
        email,
        password,
      }, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const storeId = response.data.data.storeAuth._id;
        dispatch(setStoreAuth({ Store_id: storeId }));
        setVerified(false)
        setActiveMessage('Email and password are added you may proceed with adding other store details');
        setErrorMessage('')
        setVerifiedEmail(true)
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data?.errorMessage || 'Failed to verify OTP. Please try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
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


  const handleupdatestore = async ()=> {
        // hardcoded data for test

        // Get the store ID from your Redux store or from the response of verifyOTP
        const storeId = localStorage.getItem('Store_id');
        
        if (!storeId) {
          alert('Store ID not found. Please verify your email and password first.');
          return;
        }

        try{
          let imageUrl = "";
          if (imagef) {
            imageUrl = await uploadImageToS3(imagef);}
        
    const formattedOperatingHours = store.operatingHours.map(hour => {
      if (!hour.day) { // Skip empty entries
        return null;
      }
      
      return {
        day: hour.day.trim().toUpperCase(), // Convert to uppercase
        open: hour.open,
        close: hour.close
      };
    }).filter(hour => hour !== null); // Remove any null entries
    
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
        { withCredentials: true }
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
    navigate('/signup/brand-created')
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 mt-10 marginTopChange">
      <Triangle>

        <div className="w-full max-w-4xl">
          <HeaderBar>
            Add Branch
          </HeaderBar>
        </div>

        <h3
          onClick={()=>setExpanded(true)}
          className="paddingChangeTitle text-xl font-semibold text-black-600 cursor-pointer"
        >
          Branch {expanded ? '▲' : '▼'}
        </h3>

        {expanded && (
          <div className="mt-4 space-y-6 paddingChangeBody">
            <input
              type="email"
              placeholder="Login Email"     
              disabled={verifiedEmail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 p-2 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              disabled={verifiedEmail}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="flex-1 p-2 border border-gray-300 rounded-md"
            />

            <div className='flex flex-col gap-4'>
              <Button
                label="Add email and password"
                type="button"
                className="mt-2 w-1/4 ml-2 bg-pinkCustom border-none text-white py-2 px-4 rounded-md"
                onClick={verifiedHandle}
              />
              <label className='ml-2 mb-2 text-red-900'>{errorMessage}</label>
              <label className='ml-2 mb-2 text-gray-600'>Add email and password first to input other details</label>
              <label className='ml-2 text-green-500'>{activeMessage}</label>
            </div>

            <div className="flex flex-wrap gap-4">
              <input
                type="text"
                placeholder="Branch Name"
                disabled={verified}
                value={store.name}
                onChange={(e) => setStore({...store, name: e.target.value})}
                required
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />
              <div className="input-container flex-1">
                <select
                  disabled={verified}
                  value={store.category}
                  onChange={(e) => setStore({...store, category: e.target.value})}
                  required
                  className="input-field-branchDetails w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Store Type</option>
                  {storeTypes.map((type, i) => (
                    <option key={i} value={type.toLowerCase()}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <input
                type="text"
                placeholder="Branch Phone Number"
                disabled={verified}
                value={store.contactDetails.phone.number}
                onChange={(e) => setStore({
                  ...store, 
                  contactDetails: {
                    ...store.contactDetails,
                    phone: {
                      ...store.contactDetails.phone,
                      number: e.target.value
                    }
                  }
                })}
                required
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Manager's Name"
                disabled={verified}
                value={store.managerName}
                onChange={(e) => setStore({...store, managerName: e.target.value})}
                required
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />

              <input
                type="text"
                placeholder="Branch Email"
                disabled={verified}
                value={store.contactDetails.email}
                onChange={(e) => setStore({
                  ...store, 
                  contactDetails: {
                    ...store.contactDetails,
                    email: e.target.value
                  }
                })}
                required
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <input
                type="text"
                placeholder="Street"
                disabled={verified}
                value={store.address.street}
                onChange={(e) => setStore({
                  ...store, 
                  address: {
                    ...store.address,
                    street: e.target.value
                  }
                })}
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Area"
                disabled={verified}
                value={store.address.area}
                onChange={(e) => setStore({
                  ...store, 
                  address: {
                    ...store.address,
                    area: e.target.value
                  }
                })}
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <input
                type="text"
                placeholder="City"
                disabled={verified}
                value={store.address.city}
                onChange={(e) => setStore({
                  ...store, 
                  address: {
                    ...store.address,
                    city: e.target.value
                  }
                })}
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Country"
                disabled={verified}
                value={store.address.country}
                onChange={(e) => setStore({
                  ...store, 
                  address: {
                    ...store.address,
                    country: e.target.value
                  }
                })}
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />
            </div>

            <textarea
              placeholder="Description"
              disabled={verified}
              value={store.description}
              onChange={(e) => setStore({...store, description: e.target.value})}
              className="description-field w-full p-2 border border-gray-300 rounded-md"
            />

            <h4 className="mt-4 text-lg fontWeightChange">Store Logo</h4>
            <input
              type="file"
              disabled={verified}
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setImagef(file);
              }}
              className="w-full p-2 border border-gray-300 rounded-md"
            />

            <h4 className="mt-4 text-lg fontWeightChange">Operating Hours</h4>
            {store.operatingHours.map((hours, idx) => (
              <div key={idx} className="flex gap-4 items-center mb-2">
                <input
                  type="text"
                  placeholder="Day"
                  disabled={verified}
                  value={hours.day}
                  onChange={(e) => {
                    const updatedHours = [...store.operatingHours];
                    updatedHours[idx].day = e.target.value.trim().toUpperCase(); 
                    setStore({...store, operatingHours: updatedHours});
                  }}
                
                />
                <input
                  type="time"
                  placeholder="Open"
                  disabled={verified}
                  value={hours.open}
                  onChange={(e) => {
                    const updatedHours = [...store.operatingHours];
                    updatedHours[idx].open = e.target.value;
                    setStore({...store, operatingHours: updatedHours});
                  }}
                  
                />
                <input
                  type="time"
                  placeholder="Close"
                  disabled={verified}
                  value={hours.close}
                  onChange={(e) => {
                    const updatedHours = [...store.operatingHours];
                    updatedHours[idx].close = e.target.value;
                    setStore({...store, operatingHours: updatedHours});
                  }}
                />
              </div>
            ))}
            <Button
              label="Add Operating Hour"
              className="mt-4 bg-pinkCustom changeBorderColor text-white py-2 px-4 rounded-md"
              type="button"
              onClick={addOperatingHour}
            />
          </div>
        )}

        <div className="flex justify-end space-x-4 mt-4 px-4 pb-4">
          <Button label="Back"
            className="px-4 py-2 bg-white text-pinkCustom border-2 border-pinkCustom rounded-md transition duration-200"
            onClick={HandleBack}/>

          <Button label="Submit & Join"
            onClick={handleupdatestore}
            className="px-6 py-3 bg-pinkCustom text-white border-2 border-pinkCustom rounded-md transition duration-200"/>
            
        </div>
      </Triangle>
    </div>
  );
};

export default BranchDetails;
