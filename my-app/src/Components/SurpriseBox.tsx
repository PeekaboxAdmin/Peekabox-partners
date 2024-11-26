import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCircleCheck, faCircleXmark, faEdit, faTrash, faPlus, faCubes, faBox } from '@fortawesome/free-solid-svg-icons';
import './SurpriseBoxManagement.css';
import Logo from './Images/food.jpg'

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
    { id: 1, title: "Banana Pudding", price: 5, quantity: 5, quantityPerDay: 3, packing: "Box", collectionTime: "Monday 09:00 - 12:00", soldOut: false, available: true, imageUrl: Logo },
    { id: 2, title: "Choco Cookies", price: 10, discount: 2, quantity: 5, quantityPerDay: 2, packing: "Pack", collectionTime: "Monday 12:00 - 22:00", soldOut: true, available: false, imageUrl: Logo },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBag, setModalBag] = useState<SurpriseBag | null>(null);

  const handleCreate = () => {
    setModalBag({ id: Date.now(), title: "", price: 0, quantity: 0, quantityPerDay: 0, packing: "", collectionTime: "", soldOut: false, available: true, imageUrl: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (bag: SurpriseBag) => {
    setModalBag(bag);
    setIsModalOpen(true);
  };

  const handleDelete = (bagId: number) => {
    setBags(bags.filter((bag) => bag.id !== bagId));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalBag) {
      setBags((prevBags) => {
        const existingBag = prevBags.find((bag) => bag.id === modalBag.id);
        if (existingBag) {
          return prevBags.map((bag) => (bag.id === modalBag.id ? modalBag : bag));
        }
        return [...prevBags, modalBag];
      });
      setIsModalOpen(false);
      setModalBag(null);
    }
  };

  return (
    <div className="surprise-bags">
      <h2>Your Surprise Bags</h2>
      <button className="create-button" onClick={handleCreate}>
        <FontAwesomeIcon icon={faPlus} /> Create Bag
      </button>
      <div className="surprise-bags-container">
        {bags.map((bag) => (
          <div key={bag.id} className="surprise-bag-card">
            <div className={`badge1 ${bag.soldOut ? "badge1-sold-out" : "badge1-available"}`}>
              {bag.soldOut ? "Sold Out" : "Available"}
            </div>
            <img src={bag.imageUrl} alt={bag.title} className="surprise-bag-image" />
            <h3>{bag.title}</h3>
            <p><FontAwesomeIcon icon={faClock} /> Collection: {bag.collectionTime}</p>
            <p><FontAwesomeIcon icon={faBox} /> Packing: {bag.packing}</p>
            <p><FontAwesomeIcon icon={faCubes} /> Quantity per Day: {bag.quantityPerDay}</p>
            <p>
              <FontAwesomeIcon icon={bag.soldOut ? faCircleXmark : faCircleCheck} />
              {bag.soldOut ? "Sold Out" : `Available: ${bag.quantity} of 5 sold`}
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
            <div className="card-actions">
              <button onClick={() => handleEdit(bag)}><FontAwesomeIcon icon={faEdit} /></button>
              <button onClick={() => handleDelete(bag.id)}><FontAwesomeIcon icon={faTrash} /></button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{modalBag?.id ? "Edit Bag" : "Create Bag"}</h3>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={modalBag?.title || ""}
                onChange={(e) => setModalBag((prev) => prev ? { ...prev, title: e.target.value } : null)}
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={modalBag?.price || 0}
                onChange={(e) => setModalBag((prev) => prev ? { ...prev, price: Number(e.target.value) } : null)}
                required
              />
              <input
                type="number"
                placeholder="Discount"
                value={modalBag?.discount || 0}
                onChange={(e) => setModalBag((prev) => prev ? { ...prev, discount: Number(e.target.value) } : null)}
              />
              <input
                type="number"
                placeholder="Quantity"
                value={modalBag?.quantity || 0}
                onChange={(e) => setModalBag((prev) => prev ? { ...prev, quantity: Number(e.target.value) } : null)}
                required
              />
              <input
                type="number"
                placeholder="Quantity Per Day"
                value={modalBag?.quantityPerDay || 0}
                onChange={(e) => setModalBag((prev) => prev ? { ...prev, quantityPerDay: Number(e.target.value) } : null)}
                required
              />
              <input
                type="text"
                placeholder="Packing"
                value={modalBag?.packing || ""}
                onChange={(e) => setModalBag((prev) => prev ? { ...prev, packing: e.target.value } : null)}
                required
              />
              <input
                type="text"
                placeholder="Collection Time"
                value={modalBag?.collectionTime || ""}
                onChange={(e) => setModalBag((prev) => prev ? { ...prev, collectionTime: e.target.value } : null)}
                required
              />
              <button type="submit">{modalBag?.id ? "Save" : "Create"}</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurpriseBoxManagement;
