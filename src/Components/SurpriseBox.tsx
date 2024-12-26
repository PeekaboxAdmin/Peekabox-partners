import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCircleCheck, faCircleXmark, faEdit, faTrash, faPlus, faCubes, faBox } from '@fortawesome/free-solid-svg-icons';
import './SurpriseBoxManagement.css';
import Logo1 from './Images/food.jpg';
import Picture1 from './Images/images.jpg';
import Logo from './Images/burger.jpg';
import CreateBagForm from './CreateBag';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileSidebar from './SideBarMobile';

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
  available: boolean;
  imageUrl: string;
};

const SurpriseBoxManagement: React.FC = () => {
  const [bags, setBags] = useState<SurpriseBag[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBag, setModalBag] = useState<SurpriseBag | null>(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // State for mobile detection
  const [loading, setLoading] = useState(true); // State for loading indicator

  // Fetch data from API
  useEffect(() => {
    const fetchBags = async () => {
      setLoading(true); // Set loading to true before the API call
      try {
        const response = await axios.get(
          'http://localhost:8100/api/v1/stores/786b54321a9cd6789bcf1234/products?page=1&limit=30&sort=desc'
        );
  
        if (response.data.success) {
          const products = response.data.data.products; // Access products array
          const formattedBags = products.map((product: any) => ({
            id: product._id,
            title: product.name,
            price: product.price.amount,
            quantity: product.quantity,
            quantityPerDay: 0, // Default to 0 since no specific daily quantity is provided
            packing: 'Unknown', // Placeholder for "packing" if not in response
            collectionTime: `${product.collectionSchedule.day} ${product.collectionSchedule.timeWindow.start} - ${product.collectionSchedule.timeWindow.end}`,
            soldOut: product.quantity === 0,
            available: product.isAvailable,
            imageUrl: Logo, // Use default if no image
          }));
          setBags(formattedBags);
        } else {
          console.error('Error fetching data:', response.data.errorMessage);
        }
      } catch (error) {
        console.error('Error fetching surprise bags:', error);
      } finally {
        setLoading(false); // Set loading to false after the API call
      }
    };
  
    fetchBags();
  }, []);

  const handleCreate = () => {
    setModalBag(null);
    setIsModalOpen(true);
  };

  const handleEdit = (bag: SurpriseBag) => {
    setModalBag(bag);
    setIsModalOpen(true);
  };

  const handleDelete = (bagId: number) => {
    setBags(bags.filter((bag) => bag.id !== bagId));
  };

  const handleFormSubmit = (newBag: SurpriseBag) => {
    setBags((prevBags) => {
      const existingBag = prevBags.find((bag) => bag.id === newBag.id);
      if (existingBag) {
        return prevBags.map((bag) => (bag.id === newBag.id ? newBag : bag));
      }
      return [...prevBags, { ...newBag, id: Date.now() }];
    });
    setIsModalOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className="surprise-bags-management-conatiner">
      <Header />
      <MobileSidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} />
      <Sidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} onNavClick={() => {}} />
      <div className="surprise-bags">
        <div className="Sbanner-image">
          <img src={Logo1} alt="Logo" className="banner-logo" />
        </div>

        <div className="StitleContainer">
          <h2>Your Surprise Bags</h2>
          <div className="sminput-container">
            <button className="create-button" onClick={handleCreate}>
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
        <p>
          <FontAwesomeIcon icon={faBox} /> {bag.packing}
        </p>
        <p>
          <FontAwesomeIcon icon={faCubes} /> Quantity selling per day {bag.quantityPerDay}
        </p>

        <div className="price-available-section">
          <p>
            <FontAwesomeIcon icon={bag.soldOut ? faCircleXmark : faCircleCheck} />
            {bag.soldOut ? 'Sold Out' : `Available: ${bag.quantity} of 5 sold`}
          </p>
          <p className="price">
            {bag.discount ? (
              <>
                <span className="original-price">AED {bag.price}</span> AED {bag.price - bag.discount}
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


        {isModalOpen && (
          <div className="modal-overlay">
            <CreateBagForm setIsModalOpen={setIsModalOpen} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SurpriseBoxManagement;
