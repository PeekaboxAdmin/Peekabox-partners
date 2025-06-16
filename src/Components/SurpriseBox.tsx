// I have commented out backend version and am running hardcoded version.
// Many changes need to be made to backend version

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faClock, faCircleCheck,faTags,faInfoCircle,faExclamationTriangle, faCircleXmark, faEdit, faTrash, faPlus, faCubes } from '@fortawesome/free-solid-svg-icons';
// import './SurpriseBoxManagement.css';
// import Logo1 from './Images/food.jpg';
// import Logo from './Images/burger.jpg';
// import CreateBagForm from './CreateBag';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Header from './Header';
// import Sidebar from './Sidebar';
// import MobileSidebar from './SideBarMobile';
// import { useSelector } from 'react-redux';
// import FooterLinks from './FooterLink/FooterLinks';

// type SurpriseBag = {
//   id: number;
//   title: string;
//   price: number;
//   discount?: boolean;
//   Dicountprice ?: number;
//   quantity: number;
//   quantityPerDay: number;
//   packing: string;
//   collectionTime: string;
//   soldOut: boolean;
//   allergen: string[];
//   catagory: string;
//   description: string;
//   available: boolean;
//   imageUrl: string;
// };

// const SurpriseBoxManagement: React.FC = () => {
//   const [bags, setBags] = useState<SurpriseBag[]>([]);
//   const [isCreatingBag, setIsCreatingBag] = useState(false); // Track if we are in create mode
//   const [loading, setLoading] = useState(true); // State for loading indicator
//   const [sidebarExpanded, setSidebarExpanded] = useState(false);
//   const [storedImageUrl, setImageURL] = useState('');
//   const navigate = useNavigate();
//   const storeId = useSelector((state: any) => state.storeAuth.Store_id);

//   useEffect(() => {
//     const fetchBags = async () => {
//       setLoading(true); // Set loading to true before the API call
//       const simg = localStorage.getItem("storeImageUrl");
//       setImageURL(simg || Logo1);

//       try {
//         const apiurl = process.env.REACT_APP_API_URL;
//         const response = await axios.get(
//           `${apiurl}/api/v1/stores/${storeId}/products?page=1&limit=30&sort=desc`,
//           {
//             withCredentials: true, // Include cookies in the request
//           }
//         );

//         if (response.data.success) {
//           const products = response.data.data.products;

//           const formattedBags = products.map((product: any) => {
//             // Check if collectionSchedule exists and has data
//             const collectionTimes =
//               product.collectionSchedule?.length > 0
//                 ? product.collectionSchedule
//                     .map((schedule: any) =>
//                       schedule.timeWindow
//                         ? `${schedule.day} ${schedule.timeWindow.start || "N/A"} - ${
//                             schedule.timeWindow.end || "N/A"
//                           } Selling Quantity : ${schedule.quantityAvailable}`
//                         : `${schedule.day} No Time Specified`
//                     )
//                     .join(", ") // Join multiple schedules with a comma
//                 : "No Schedule"; // Fallback if empty or undefined

//             return {
//               id: product._id,
//               title: product.name,
//               discount : product.price?.discount || false,
//               Dicountprice: product.price?.discountPrice || 0, // Ensure price exists
//               price: product.price?.amount || 0, // Ensure price exists
//               quantity: product.quantity || 0,
//               allergen: product.allergenInfo || [],
//               description: product.description || "No description available",
//               catagory: product.category || "Uncategorized",
//               collectionTime: collectionTimes, // Updated collection schedule logic
//               available: product.isAvailable ?? true, // Default to true if undefined
//               imageUrl: product.image || "default_image_url_here", // Fallback for missing image
//             };
//           });

//           setBags(formattedBags);
//         } else {
//           console.error("Error fetching data:", response.data.errorMessage);
//         }
//       } catch (error) {
//         console.error("Error fetching surprise bags:", error);
//       } finally {
//         setLoading(false); // Set loading to false after the API call
//       }
//     };

//     fetchBags();
//   }, [storeId]);

//   const toggleSidebar = () => {
//     setSidebarExpanded(!sidebarExpanded);
//   };

//   const handleDelete = (bagId: number) => {
//     const deleteBag = async () => {
//       try {
//         const apiurl = process.env.REACT_APP_API_URL;
//         const response = await axios.delete(
//           `${apiurl}/api/v1/stores/${storeId}/product/${bagId}`,
//           {
//             withCredentials:true,
//           }
//         );

//         if (response.data.success) {
//           setBags((prevBags) => prevBags.filter((bag) => bag.id !== bagId));
//           alert(`Bag with ID ${bagId} deleted successfully.`);
//         } else {
//           console.error(`Error deleting bag: ${response.data.message}`);
//         }
//       } catch (error) {
//         console.error('Error deleting bag:', error);
//       }
//     };

//     if (window.confirm('Are you sure you want to delete this bag?')) {
//       deleteBag();
//     }
//   };

//   return (
//     <div className="surprise-bags-management-conatiner">
//       <Header />
//       <MobileSidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} />
//       <Sidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} onNavClick={() => {}} />

//       {/* Conditional rendering based on isCreatingBag */}
//       {!isCreatingBag ? (
//         <div className="surprise-bags">
//           <div className="Sbanner-image">
//             <img src={storedImageUrl} alt="Logo" className="banner-logo" />
//           </div>

//           <div className="StitleContainer">
//             <h2>Your Surprise Bags</h2>
//             <div className="sminput-container">
//               <button className="create-button" onClick={() => setIsCreatingBag(true)}>
//                 <FontAwesomeIcon icon={faPlus} /> New Bag
//               </button>
//             </div>
//           </div>

//           <div className="surprise-bags-container">
//             {loading ? (
//               <div className="loading-spinner">Loading...</div>
//             ) : bags.length === 0 ? (
//               <div className="empty-bags-message">
//                 <p>No surprise bags to display. Add a new bag to get started!</p>
//               </div>
//             ) : (
//               bags.map((bag) => (
//                 <div key={bag.id} className="surprise-bag-card">
//                   <div className={`badge1 ${bag.soldOut ? 'badge1-sold-out' : 'badge1-available'}`}>
//                     {bag.soldOut ? 'Sold Out' : 'Available'}
//                   </div>
//                   <img src={bag.imageUrl} alt={bag.title} className="surprise-bag-image" />
//                   <h3>{bag.title}</h3>
//                   <p>
//   <br />
//   {bag.collectionTime !== "No Schedule"
//     ? bag.collectionTime.split(/,\s*/).map((time, index) => (
//         <React.Fragment key={index}>
//           {time}
//           <br/>
//           <br/>
//         </React.Fragment>
//       ))
//     : "No collection time available"}
// </p>
//                   <p>
//                     <FontAwesomeIcon icon={faInfoCircle} /> {bag.description}
//                   </p>
//                   <p>
//                     <FontAwesomeIcon icon={faTags} /> {bag.catagory}
//                   </p>
//                   <p>
//                     <FontAwesomeIcon icon={faExclamationTriangle} /> allergen: {bag.allergen.join(', ')}
//                   </p>

//                   <div className="price-available-section">
//                   {/*  <p>
//                       <FontAwesomeIcon icon={bag.soldOut ? faCircleXmark : faCircleCheck} />
//                       {bag.soldOut ? 'Sold Out' : `Available: ${bag.quantity} of 5 sold`}
//                     </p> */}
//                     <span className="price">
//                         {bag.discount ? (
//                           <>
//                             <span className="discounted-price">AED {bag.Dicountprice}</span>
//                             <span className="original-price">AED {bag.price}</span>
//                           </>
//                         ) : (
//                           <span className="regular-price">AED {bag.price}</span>
//                         )}
//                       </span>
//                   </div>
//                   <div className="card-actions">
//                   <button onClick={() => navigate('/ProductEdit', { state: { bagId: bag.id } })}>
//                    <FontAwesomeIcon icon={faEdit} />
//                   </button>
//                     <button onClick={() => handleDelete(bag.id)}>
//                       <FontAwesomeIcon icon={faTrash} />
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       ) : (
//         // Show CreateBagForm when isCreatingBag is true
//         <CreateBagForm onCancel={() => setIsCreatingBag(false)} />
//       )}
//        <footer className="dashboard-footer">
//         <FooterLinks />
//       </footer>
//     </div>
//   );
// };

// export default SurpriseBoxManagement;

'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilter,
  faCalendarAlt,
  faBoxOpen,
  faEdit,
  faTrash,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import './SurpriseBoxManagement.css';
import Logo1 from './Images/food.jpg';
import BurgerImage from './Images/burger.jpg';
import BananaImage from './Images/banana.png';
import CookieImage from './Images/cookies.jpg';
import Deluxeimage from './Images/deluxe.jpg';
import Frapimage from './Images/frappucino.jpg';
import Comboimage from './Images/combo.png';
import editImage from './Images/edit.png';
import deleteImage from './Images/delete.png';
import CreateBagForm from './CreateBag';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileSidebar from './SideBarMobile';
import { useSelector } from 'react-redux';
import FooterLinks from './FooterLink/FooterLinks';

type SurpriseBag = {
  id: number;
  title: string;
  price: number;
  discount?: boolean;
  Dicountprice?: number;
  quantity: number;
  quantityPerDay: number;
  packing: string;
  collectionTime: string;
  soldOut: boolean;
  allergen: string[];
  catagory: string;
  description: string;
  available: boolean;
  imageUrl: string;
  soldCount?: number;
  totalCount?: number;
};

// Filter types
type BagType =
  | 'Surprise Bag'
  | 'Bread Bag'
  | 'Vegan Bag'
  | 'Lunch Bag'
  | 'Dessert Bag'
  | 'Dinner Bag';
type AllergenType =
  | 'Milk'
  | 'Eggs'
  | 'Fish'
  | 'Shellfish'
  | 'Tree Nuts'
  | 'Peanuts'
  | 'Wheat'
  | 'Soybeans';

const SurpriseBoxManagement: React.FC = () => {
  const [bags, setBags] = useState<SurpriseBag[]>([]);
  const [isCreatingBag, setIsCreatingBag] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [storedImageUrl, setImageURL] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBagTypes, setSelectedBagTypes] = useState<BagType[]>([]);
  const [selectedAllergens, setSelectedAllergens] = useState<AllergenType[]>(
    []
  );

  const navigate = useNavigate();
  const storeId = useSelector((state: any) => state.storeAuth.Store_id);

  useEffect(() => {
    setLoading(true);
    const simg = localStorage.getItem('storeImageUrl');
    setImageURL(simg || BurgerImage);

    setTimeout(() => {
      const dummyBags: SurpriseBag[] = [
        {
          id: 1,
          title: 'Banana Pudding',
          price: 8,
          discount: true,
          Dicountprice: 5,
          quantity: 5,
          quantityPerDay: 5,
          packing: 'Eco-friendly box',
          allergen: ['Eggs', 'Milk'],
          description: 'Delicious banana pudding with fresh ingredients',
          catagory: 'Surprise Bag',
          collectionTime: 'Monday 09:00 - 12:00',
          available: true,
          soldOut: false,
          imageUrl: BananaImage,
          soldCount: 3,
          totalCount: 5,
        },
        {
          id: 2,
          title: 'Choco Cookies',
          price: 15,
          discount: true,
          Dicountprice: 10,
          quantity: 5,
          quantityPerDay: 5,
          packing: 'Paper bag',
          allergen: ['Wheat', 'Milk'],
          description: 'Freshly baked chocolate cookies',
          catagory: 'Bread Bag',
          collectionTime: 'Monday 12:00 - 22:00',
          available: true,
          soldOut: false,
          imageUrl: CookieImage,
          soldCount: 3,
          totalCount: 5,
        },
        {
          id: 3,
          title: 'Deluxe',
          price: 20,
          discount: true,
          Dicountprice: 15,
          quantity: 5,
          quantityPerDay: 5,
          packing: 'Premium box',
          allergen: ['Nuts', 'Wheat'],
          description: 'Premium selection of our best items',
          catagory: 'Surprise Bag',
          collectionTime: 'Monday 12:00 - 15:30',
          available: false,
          soldOut: true,
          imageUrl: Deluxeimage,
          soldCount: 5,
          totalCount: 5,
        },
        {
          id: 4,
          title: 'Frappuccino',
          price: 30,
          discount: true,
          Dicountprice: 20,
          quantity: 5,
          quantityPerDay: 5,
          packing: 'Eco cup',
          allergen: ['Milk'],
          description: 'Cold coffee drink with whipped cream',
          catagory: 'Dessert Bag',
          collectionTime: 'Monday 15:00 - 20:00',
          available: true,
          soldOut: false,
          imageUrl: Frapimage,
          soldCount: 3,
          totalCount: 5,
        },
        {
          id: 5,
          title: 'Combo',
          price: 35,
          discount: true,
          Dicountprice: 25,
          quantity: 5,
          quantityPerDay: 5,
          packing: 'Combo box',
          allergen: ['Wheat', 'Eggs'],
          description: 'Combination of our most popular items',
          catagory: 'Lunch Bag',
          collectionTime: 'Monday 10:00 - 11:00',
          available: true,
          soldOut: false,
          imageUrl: Comboimage,
          soldCount: 3,
          totalCount: 5,
        },
        {
          id: 6,
          title: 'Choco Cookies',
          price: 15,
          discount: true,
          Dicountprice: 10,
          quantity: 5,
          quantityPerDay: 5,
          packing: 'Paper bag',
          allergen: ['Wheat', 'Milk'],
          description: 'Freshly baked chocolate cookies',
          catagory: 'Bread Bag',
          collectionTime: 'Monday 12:00 - 22:00',
          available: true,
          soldOut: false,
          imageUrl: CookieImage,
          soldCount: 3,
          totalCount: 5,
        },
      ];

      setBags(dummyBags);
      setLoading(false);
    }, 1000);
  }, []);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const toggleBagTypeFilter = (bagType: BagType) => {
    if (selectedBagTypes.includes(bagType)) {
      setSelectedBagTypes(selectedBagTypes.filter((type) => type !== bagType));
    } else {
      setSelectedBagTypes([...selectedBagTypes, bagType]);
    }
  };

  const toggleAllergenFilter = (allergen: AllergenType) => {
    if (selectedAllergens.includes(allergen)) {
      setSelectedAllergens(selectedAllergens.filter((a) => a !== allergen));
    } else {
      setSelectedAllergens([...selectedAllergens, allergen]);
    }
  };

  const filteredBags = bags
    .filter((bag) => {
      // If no bag types are selected, show all bags
      if (selectedBagTypes.length === 0) return true;

      // Otherwise, only show bags of selected types
      return selectedBagTypes.includes(bag.catagory as BagType);
    })
    .filter((bag) => {
      // If no allergens are selected, show all bags
      if (selectedAllergens.length === 0) return true;

      // Otherwise, only show bags that don't contain any of the selected allergens
      return !selectedAllergens.some((allergen) =>
        bag.allergen.includes(allergen)
      );
    });

  const handleDelete = (bagId: number) => {
    const deleteBag = async () => {
      try {
        const apiurl = process.env.REACT_APP_API_URL;
        const response = await axios.delete(
          `${apiurl}/api/v1/stores/${storeId}/product/${bagId}`,
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          setBags((prevBags) => prevBags.filter((bag) => bag.id !== bagId));
          alert(`Bag with ID ${bagId} deleted successfully.`);
        } else {
          console.error(`Error deleting bag: ${response.data.message}`);
        }
      } catch (error) {
        console.error('Error deleting bag:', error);
      }
    };

    if (window.confirm('Are you sure you want to delete this bag?')) {
      deleteBag();
    }
  };

  return (
    <div className='surprise-bags-management-conatiner'>
      <Header />
      <MobileSidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} />
      <Sidebar
        isOpen={sidebarExpanded}
        onToggle={toggleSidebar}
        onNavClick={() => {}}
      />

      {!isCreatingBag ? (
        <div className='surprise-bags'>
          <div className='Sbanner-image'>
            <img src={storedImageUrl || '/placeholder.svg'} alt='Banner' />
            <div className='banner-logo'>
              <img src={Logo1 || '/placeholder.svg'} alt='Logo' />
            </div>
          </div>

          <div className='StitleContainer'>
            <h2>Your Surprise Bags</h2>
            <div className='sminput-container'>
              <button
                className='create-button'
                onClick={() => setIsCreatingBag(true)}>
                <FontAwesomeIcon icon={faPlus} /> New Bag
              </button>

              <div className='filter-dropdown'>
                <button className='filter-button' onClick={toggleFilters}>
                  <FontAwesomeIcon icon={faFilter} /> Filters
                </button>

                {showFilters && (
                  <div className='filter-menu'>
                    <div className='filter-section'>
                      <h4>Bag Type</h4>
                      <div className='filter-options'>
                        {[
                          'Surprise Bag',
                          'Bread Bag',
                          'Vegan Bag',
                          'Lunch Bag',
                          'Dessert Bag',
                          'Dinner Bag',
                        ].map((type) => (
                          <label key={type} className='filter-option'>
                            <input
                              type='checkbox'
                              checked={selectedBagTypes.includes(
                                type as BagType
                              )}
                              onChange={() =>
                                toggleBagTypeFilter(type as BagType)
                              }
                            />
                            {type}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className='filter-section'>
                      <h4>Allergens (exclude)</h4>
                      <div className='filter-options'>
                        {[
                          'Milk',
                          'Eggs',
                          'Fish',
                          'Shellfish',
                          'Tree Nuts',
                          'Peanuts',
                          'Wheat',
                          'Soybeans',
                        ].map((allergen) => (
                          <label key={allergen} className='filter-option'>
                            <input
                              type='checkbox'
                              checked={selectedAllergens.includes(
                                allergen as AllergenType
                              )}
                              onChange={() =>
                                toggleAllergenFilter(allergen as AllergenType)
                              }
                            />
                            {allergen}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='surprise-bags-container'>
            {loading ? (
              <div className='loading-spinner'>Loading...</div>
            ) : filteredBags.length === 0 ? (
              <div className='empty-bags-message'>
                <p>
                  No surprise bags match your filters. Try adjusting your filter
                  criteria or add a new bag.
                </p>
              </div>
            ) : (
              filteredBags.map((bag) => (
                <div key={bag.id} className='surprise-bag-card'>
                  <div
                    className={`badge ${
                      bag.soldOut ? 'badge-sold-out' : 'badge-available'
                    }`}>
                    {bag.soldOut ? 'Sold out' : 'Available'}
                  </div>

                  <div className='card-image-container'>
                    <img
                      src={bag.imageUrl || '/placeholder.svg'}
                      alt={bag.title}
                      className='surprise-bag-image'
                    />
                  </div>

                  <div className='card-content'>
                    <h3>{bag.title}</h3>

                    <div className='card-details-row'>
                      <div className='card-info'>
                        <div className='card-info-item'>
                          <FontAwesomeIcon icon={faBoxOpen} />
                          {bag.soldCount} out of {bag.totalCount} sold
                        </div>
                        <div className='card-info-item'>
                          <FontAwesomeIcon icon={faCalendarAlt} />
                          {bag.collectionTime}
                        </div>
                      </div>

                      <div className='card-price'>
                        {bag.discount && (
                          <div className='original-price'>AED {bag.price}</div>
                        )}
                        <div className='discounted-price'>
                          AED {bag.Dicountprice || bag.price}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='card-actions'>
                    <button
                      onClick={() =>
                        navigate('/ProductEdit', { state: { bagId: bag.id } })
                      }
                      className='edit-image-button'>
                      <img
                        src={editImage || '/placeholder.svg'}
                        alt='Edit'
                        className='edit-button-image'
                      />
                    </button>
                    <button
                      onClick={() =>
                        navigate('/ProductEdit', { state: { bagId: bag.id } })
                      }
                      className='edit-image-button'>
                      <img
                        src={deleteImage || '/placeholder.svg'}
                        alt='Edit'
                        className='edit-button-image'
                      />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <CreateBagForm onCancel={() => setIsCreatingBag(false)} />
      )}

      <footer className='dashboard-footer'>
        <FooterLinks />
      </footer>
    </div>
  );
};

export default SurpriseBoxManagement;
