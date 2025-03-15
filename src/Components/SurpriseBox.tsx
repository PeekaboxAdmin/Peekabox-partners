import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCircleCheck,faTags,faInfoCircle,faExclamationTriangle, faCircleXmark, faEdit, faTrash, faPlus, faCubes } from '@fortawesome/free-solid-svg-icons';
import './SurpriseBoxManagement.css';
import Logo1 from './Images/food.jpg';
import Logo from './Images/burger.jpg';
import CreateBagForm from './CreateBag';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileSidebar from './SideBarMobile';
import { useSelector } from 'react-redux';
import FooterLinks from './FooterLink/FooterLinks';

type SurpriseBag = {
  id: number;
  title: string;
  price: number;
  discount?: number;
  quantity: number;
  quantityPerDay: number;
  packing: string;
  collectionTime: string;
  soldOut: boolean;
  allergen: string;
  catagory: string;
  description: string;
  available: boolean;
  imageUrl: string;
};

const SurpriseBoxManagement: React.FC = () => {
  const [bags, setBags] = useState<SurpriseBag[]>([]);
  const [isCreatingBag, setIsCreatingBag] = useState(false); // Track if we are in create mode
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [storedImageUrl, setImageURL] = useState('');

  const storeId = useSelector((state: any) => state.storeAuth.Store_id);

  useEffect(() => {
    const fetchBags = async () => {
      setLoading(true); // Set loading to true before the API call
      const simg = localStorage.getItem("storeImageUrl");
      setImageURL(simg || Logo1);
  
      try {
        const apiurl = process.env.REACT_APP_API_URL;
        const response = await axios.get(
          `${apiurl}/api/v1/stores/${storeId}/products?page=1&limit=30&sort=desc`,
          {
            withCredentials: true, // Include cookies in the request
          }
        );
  
        if (response.data.success) {
          const products = response.data.data.products;
  
          const formattedBags = products.map((product: any) => {
            // Check if collectionSchedule exists and has data
            const collectionTimes =
              product.collectionSchedule?.length > 0
                ? product.collectionSchedule
                    .map((schedule: any) =>
                      schedule.timeWindow
                        ? `${schedule.day} ${schedule.timeWindow.start || "N/A"} - ${
                            schedule.timeWindow.end || "N/A"
                          }`
                        : `${schedule.day} No Time Specified`
                    )
                    .join(", ") // Join multiple schedules with a comma
                : "No Schedule"; // Fallback if empty or undefined
  
            return {
              id: product._id,
              title: product.name,
              price: product.price?.amount || 0, // Ensure price exists
              quantity: product.quantity || 0,
              allergen: product.allergenInfo || [],
              description: product.description || "No description available",
              catagory: product.category || "Uncategorized",
              collectionTime: collectionTimes, // Updated collection schedule logic
              soldOut: product.quantity === 0,
              available: product.isAvailable ?? true, // Default to true if undefined
              imageUrl: product.image || "default_image_url_here", // Fallback for missing image
            };
          });
  
          setBags(formattedBags);
        } else {
          console.error("Error fetching data:", response.data.errorMessage);
        }
      } catch (error) {
        console.error("Error fetching surprise bags:", error);
      } finally {
        setLoading(false); // Set loading to false after the API call
      }
    };
  
    fetchBags();
  }, [storeId]);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleDelete = (bagId: number) => {
    const deleteBag = async () => {
      try {
        const apiurl = process.env.REACT_APP_API_URL;
        const response = await axios.delete(
          `${apiurl}/api/v1/stores/${storeId}/product/${bagId}`,
          {
            withCredentials:true,
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
    <div className="surprise-bags-management-conatiner">
      <Header />
      <MobileSidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} />
      <Sidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} onNavClick={() => {}} />

      {/* Conditional rendering based on isCreatingBag */}
      {!isCreatingBag ? (
        <div className="surprise-bags">
          <div className="Sbanner-image">
            <img src={storedImageUrl} alt="Logo" className="banner-logo" />
          </div>

          <div className="StitleContainer">
            <h2>Your Surprise Bags</h2>
            <div className="sminput-container">
              <button className="create-button" onClick={() => setIsCreatingBag(true)}>
                <FontAwesomeIcon icon={faPlus} /> New Bag
              </button>
            </div>
          </div>

          <div className="surprise-bags-container">
            {loading ? (
              <div className="loading-spinner">Loading...</div>
            ) : bags.length === 0 ? (
              <div className="empty-bags-message">
                <p>No surprise bags to display. Add a new bag to get started!</p>
              </div>
            ) : (
              bags.map((bag) => (
                <div key={bag.id} className="surprise-bag-card">
                  <div className={`badge1 ${bag.soldOut ? 'badge1-sold-out' : 'badge1-available'}`}>
                    {bag.soldOut ? 'Sold Out' : 'Available'}
                  </div>
                  <img src={bag.imageUrl} alt={bag.title} className="surprise-bag-image" />
                  <h3>{bag.title}</h3>
                  <p>
                  <FontAwesomeIcon icon={faClock} />{bag.collectionTime || "No collection time available"}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faCubes} /> Quantity selling per day {bag.quantity}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faInfoCircle} /> {bag.description}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faTags} /> {bag.catagory}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faExclamationTriangle} /> allergen: {bag.allergen}
                  </p>

                  <div className="price-available-section">
                    <p>
                      <FontAwesomeIcon icon={bag.soldOut ? faCircleXmark : faCircleCheck} />
                      {bag.soldOut ? 'Sold Out' : `Available: ${bag.quantity} of 5 sold`}
                    </p>
                    <p className="price">
                      {bag.discount ? (
                        <>
                          <span className="original-price">AED {bag.price}</span> AED
                        </>
                      ) : (
                        <>AED {bag.price}</>
                      )}
                    </p>
                  </div>
                  <div className="card-actions">
                    <button onClick={() => setIsCreatingBag(true)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={() => handleDelete(bag.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        // Show CreateBagForm when isCreatingBag is true
        <CreateBagForm onCancel={() => setIsCreatingBag(false)} />
      )}
       <footer className="dashboard-footer">
        <FooterLinks />
      </footer>
    </div>
  );
};

export default SurpriseBoxManagement;
