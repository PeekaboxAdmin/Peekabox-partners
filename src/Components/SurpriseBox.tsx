import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCircleCheck, faCircleXmark, faEdit, faTrash, faPlus, faCubes, faBox } from '@fortawesome/free-solid-svg-icons';
import './SurpriseBoxManagement.css';
import Logo1 from './Images/food.jpg';
import Picture1 from './Images/images.jpg'
import Logo from './Images/burger.jpg';
import CreateBagForm from './CreateBag'; // Import the CreateBagForm component
import Header from './Header';
import Sidebar from './Sidebar';

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
  const [bags, setBags] = useState<SurpriseBag[]>([
    {
      id: 1,
      title: 'Banana Pudding',
      price: 5,
      quantity: 5,
      quantityPerDay: 3,
      packing: 'Box',
      collectionTime: 'Monday 09:00 - 12:00',
      soldOut: false,
      available: true,
      imageUrl: Logo,
    },
    {
      id: 2,
      title: 'Choco Cookies',
      price: 10,
      discount: 2,
      quantity: 5,
      quantityPerDay: 2,
      packing: 'Pack',
      collectionTime: 'Monday 12:00 - 22:00',
      soldOut: true,
      available: false,
      imageUrl: Picture1,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBag, setModalBag] = useState<SurpriseBag | null>(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

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
    <div className='surprise-bags-management-conatiner'>
    <Header/>
    <Sidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} onNavClick={() => {}} />
    <div className="surprise-bags">
      <div className="Sbanner-image">
        <img src={Logo1} alt="Logo" className="banner-logo" />
      </div>

      <div className="StitleContainer">
        <h2>Your Surprise Bags</h2>
        <div className='sminput-container'>
          <button className="create-button" onClick={handleCreate}>
            <FontAwesomeIcon icon={faPlus} /> New Bag
          </button>
          <input type="text" placeholder="Filter bags..." className="filter-input" />
        </div>
      </div>

      <div className="surprise-bags-container">
        {bags.map((bag) => (
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
        ))}
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
