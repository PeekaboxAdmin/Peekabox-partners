import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCircleCheck, faCircleXmark, faEdit, faTrash, faPlus, faCubes } from '@fortawesome/free-solid-svg-icons';
import './SurpriseBoxManagement.css';
import Logo1 from './Images/food.jpg';
import CreateBagForm from './CreateBag';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileSidebar from './SideBarMobile';
import { useSelector } from 'react-redux';

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
  const [isCreatingBag, setIsCreatingBag] = useState(false); // Track if we are in create or edit mode
  const [editingBag, setEditingBag] = useState<SurpriseBag | null>(null);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const storeId = useSelector((state: any) => state.storeAuth.Store_id);

  // Fetch data from API
  useEffect(() => {
    const fetchBags = async () => {
      setLoading(true);
      try {
        const apiurl = process.env.REACT_APP_API_URL;
        const response = await axios.get(
          `${apiurl}/api/v1/stores/${storeId}/products?page=1&limit=30&sort=desc`,
          { withCredentials: true }
        );
        if (response.data.success) {
          const products = response.data.data.products;
          const formattedBags = products.map((product: any) => ({
            id: product._id,
            title: product.name,
            price: product.price.amount,
            quantity: product.quantity,
            allergen: product.allergenInfo,
            description: product.description,
            catagory: product.category,
            collectionTime: `${product.collectionSchedule.day} ${product.collectionSchedule.timeWindow.start} - ${product.collectionSchedule.timeWindow.end}`,
            soldOut: product.quantity === 0,
            available: product.isAvailable,
            imageUrl: product.image,
          }));
          setBags(formattedBags);
        } else {
          console.error('Error fetching data:', response.data.errorMessage);
        }
      } catch (error) {
        console.error('Error fetching surprise bags:', error);
      } finally {
        setLoading(false);
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
          { withCredentials: true }
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

  // Helper function to convert SurpriseBag to CreateBagForm's FormData format
  const convertBagToFormData = (bag: SurpriseBag) => {
    const parts = bag.collectionTime.split(" ");
    // Assuming format "Monday 10:00 AM - 12:00 PM"
    const day = parts[0].substring(0, 3); // e.g. "Mon"
    const startTime = parts[1]; // "10:00"
    const endTime = parts[4]; // "12:00"
    return {
      id: bag.id,
      name: bag.title,
      category: bag.catagory,
      allergens: bag.allergen && bag.allergen !== "None" ? [bag.allergen] : [],
      description: bag.description,
      price: bag.price.toString(),
      numberOfBags: bag.quantity.toString(),
      image: null,
      imageUrl: bag.imageUrl,
      selectedDays: [{ day, startTime, endTime }],
    };
  };

  // New handleEdit to set editing bag and pass its data to the form
  const handleEdit = (bag: SurpriseBag) => {
    setEditingBag(bag);
    setIsCreatingBag(true);
  };

  return (
    <div className="surprise-bags-management-conatiner">
      <Header />
      <MobileSidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} />
      <Sidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} onNavClick={() => {}} />

      {/* Show CreateBagForm if creating or editing */}
      {isCreatingBag ? (
        <CreateBagForm
          onCancel={(open: boolean) => {
            setIsCreatingBag(open);
            setEditingBag(null);
          }}
          initialData={editingBag ? convertBagToFormData(editingBag) : undefined}
        />
      ) : (
        <div className="surprise-bags">
          <div className="Sbanner-image">
            <img src={Logo1} alt="Logo" className="banner-logo" />
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
                    <FontAwesomeIcon icon={faClock} /> {bag.collectionTime}
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
                    <button onClick={() => handleEdit(bag)}>
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
      )}
    </div>
  );
};

export default SurpriseBoxManagement;
