import React, { useState, useEffect } from 'react';
import './StoreInfo.css';
import Logo from './Images/food.jpg';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileSidebar from './SideBarMobile';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../GlobalStateManagement/store';
import FooterLinks from './FooterLink/FooterLinks';

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

const StoreInfo: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
    const [imagef, setImagef] = useState<File | null>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]); // Store selected days

  const hardcodedData: Store = {
    _id: "12345",
    name: "Leto Abu Dubai Mall Center",
    description:
      "Indulge in a variety of gourmet pastries, artisanal coffee, and delightful desserts at Leto, conveniently located in Dubai Mall.",
      managerName: "Sarah",
      brandId: "60d5ecb8b392f8001f1e1d25",
    address: {
      street: "Financial Center Road",
      area: "Downtown Dubai",
      city: "Dubai",
      country: "United Arab Emirates",
    },
    location: {
      type: "Point",
      coordinates: [55.279, 25.1978],
    },
    contactDetails: {
      phone: {
        countryCode: "+971",
        number: "43567890",
      },
      email: "contact@leto.ae",
    },
    operatingHours: [
      { day: "MONDAY", open: "09:00", close: "23:00" },
      { day: "TUESDAY", open: "09:00", close: "23:00" },
      { day: "WEDNESDAY", open: "09:00", close: "23:00" },
      { day: "THURSDAY", open: "09:00", close: "23:00" },
      { day: "FRIDAY", open: "09:00", close: "00:00" },
      { day: "SATURDAY", open: "09:00", close: "00:00" },
      { day: "SUNDAY", open: "09:00", close: "23:00" },
    ],
    category: "Bakery",
    image: "https://example.com/images/leto-dubai-mall.jpg",
    isDeleted: false,
  };
  
  // Initialize store state with hardcoded data
  const [store, setStore] = useState<Store>(hardcodedData);
  //const [store, setStore] = useState<Store | null>(null);
  const storeId = useSelector((state: any) => state.storeAuth.Store_id);

  // Fetch store data from API
  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const apiurl = process.env.REACT_APP_API_URL
        const response = await axios.get(`${apiurl}/api/v1/stores/store/${storeId}`,
          {
            withCredentials: true
          }
        );
        if (response.data.success) {
          console.log(response)
          console.log(response.data.data)
          setStore(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    };

    fetchStoreData();
  }, []);

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



  
  //---------------------------------------------------------------------------
  const apiUrl = process.env.REACT_APP_API_URL;

  // upload image function
  const uploadImageToS3 = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    const apiurl = process.env.REACT_APP_API_URL;
    const response = await axios.post(
      `${apiurl}/api/v1/stores/ProductUpload`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
    );
    
    return response.data.data.imageUrl; // Return the uploaded image URL
  };
//

  const handleupdatestore = async ()=> {
    // hardcoded data for test
    try{
    let imageUrl = "";
    if (imagef) {
      imageUrl = await uploadImageToS3(imagef);}
    

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
  operatingHours: store.operatingHours, // The operating hours from the updated state
};
    const response = await axios.post(
      `${apiUrl}/api/v1/stores/store/${storeId}`,
      //brandId: '60d5ecb8b392f8001f1e1d89', // Replace with dynamic value if needed
      updatedStoreData,  
      { withCredentials: true }
    );

    alert('Store updated successfully!');
    setIsEditing(false)
    console.log('Response:', response.data);
    
  } catch (error) {
    console.error('Error updating store:', error);
    alert('Failed to update the store. Please try again.');
  }
}

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (!store) return;
    const { name, value } = e.target;
    setStore({
      ...store,
      [name]: value,
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the selected file
    if (file && file.type.startsWith("image/")) {
      setImagef(file);
    }
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStore((prevStore) => ({
          ...prevStore,
          image: reader.result as string, // Set image as Base64 for preview
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setStore((prevStore) => ({
      ...prevStore,
      image: "", // Clears the image
    }));
  };


  const handleDaySelection = (day: string) => {
    setSelectedDays((prevSelectedDays) => {
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter((selectedDay) => selectedDay !== day);
      } else {
        return [...prevSelectedDays, day];
      }
    });
  };

  const handleOperatingHoursChange = (day: string, field: 'open' | 'close', value: string) => {
    const updatedHours = store.operatingHours.map((hour) => {
      if (hour.day === day) {
        return { ...hour, [field]: value };
      }
      return hour;
    });
    setStore({ ...store, operatingHours: updatedHours });
  };


//----
  if (!store) {
    return <div>Loading...</div>; // Wait for store data to load
  }

  return (
    <div className="store-Container-main">
      <Header />
      <MobileSidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} />
      <Sidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} onNavClick={() => {}} />

      <div className="store-container">
        <img src={store.image || Logo} alt="Store Logo" className="store-logo" />

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
                    <p>{store.name}</p>
                  </div>

                  <div className="store-detail-container">
                    <h5>Description</h5>
                    <p>{store.description}</p>
                  </div>

                  <div className="store-detail-container">
                    <h5>Address</h5>
                    <p>
                      {store.address.street}, {store.address.area}, {store.address.city},{' '}
                      {store.address.country}
                    </p>
                  </div>

                  <div className="store-detail-container">
                    <h5>Contact</h5>
                    <p>
                      {store.contactDetails.phone.countryCode} {store.contactDetails.phone.number}
                    </p>
                  </div>

                  <div className="store-detail-container">
                    <h5>Managers Name</h5>
                    <p>{store.managerName}</p>
                  </div>

                  <div className="store-detail-container">
                    <h5>Sign in Email</h5>
                    <p>{store.contactDetails.email}</p>
                  </div>

                  <div className="store-detail-container">
                    <h5>Category</h5>
                    <p>{store.category}</p>
                  </div>
                </div>

                <h5>Operating Hours:</h5>
                {store.operatingHours.map((hour, index) => (
                  <div key={index}>
                    <p>
                      {hour.day}: {hour.open} - {hour.close}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button className="editbtnst" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          </div>
        ) : (
          <form className="edit-form">
            <label>Store Name:</label>
            <input type="text" name="name" value={store.name} onChange={handleChange} />

            <label>Description:</label>
            <textarea name="description" value={store.description} onChange={handleChange} />

            <label>Manager Name:</label>
            <input type="text" name="managerName" value={store.managerName} onChange={handleChange} />

            <label>Contact</label>
<input 
  type="number" 
  name="phoneNumber"
  value={store.contactDetails.phone.number} // Fix: Access only the number field
  onChange={(e) => setStore({
    ...store,
    contactDetails: {
      ...store.contactDetails,
      phone: {
        ...store.contactDetails.phone,
        number: e.target.value // Update only the phone number
      }
    }
  })} 
/>


<label>Email</label>
<input 
  type="email" 
  name="email" 
  value={store.contactDetails.email} // Fix: Access the email field
  onChange={(e) => setStore({
    ...store,
    contactDetails: {
      ...store.contactDetails,
      email: e.target.value // Update the email field
    }
  })} 
/>

            <label>Street:</label>
            <input
              type="text"
              name="street"
              value={store.address.street}
              onChange={handleChange}
            />

            <label>Area:</label>
            <input type="text" name="area" value={store.address.area} onChange={handleChange} />

            <label>City:</label>
            <input type="text" name="city" value={store.address.city} onChange={handleChange} />

            <h3>Upload Store Image</h3>

<input type="file" accept="image/*" onChange={handleImageUpload} />
<button type="button" className="remove-image-btn" onClick={handleRemoveImage}>
      Remove Image
    </button>

    <h3>Edit Operating Hours</h3>
            <div>
              {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'].map(
                (day) => (
                  <div key={day}>
                    <input
                      type="checkbox"
                      checked={selectedDays.includes(day)}
                      onChange={() => handleDaySelection(day)}
                    />
                    <label>{day}</label>

                    {selectedDays.includes(day) && (
                      <>
                        <label> Open:</label>
                        <input
                          type="time"
                          value={store.operatingHours.find((hour) => hour.day === day)?.open}
                          onChange={(e) =>
                            handleOperatingHoursChange(day, 'open', e.target.value)
                          }
                        />

                        <label> Close:</label>
                        <input
                          type="time"
                          value={store.operatingHours.find((hour) => hour.day === day)?.close}
                          onChange={(e) =>
                            handleOperatingHoursChange(day, 'close', e.target.value)
                          }
                        />
                      </>
                    )}
                  </div>
                )
              )}
            </div>
            
            
            
            <select
             className='mt-10'
              name="category"
              value={store.category}
              onChange={(e) =>
                setStore({
                  ...store,
                  category: e.target.value,
                })
              }
            >
              {categoryOptions.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            

            <button className="editbtnst" type="button" onClick={handleupdatestore}>
              Save
            </button>
            <button className="editbtnst" type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        )}
      </div>
      <footer className="dashboard-footer">
        <FooterLinks />
      </footer>
    </div>
  );
};

export default StoreInfo;
