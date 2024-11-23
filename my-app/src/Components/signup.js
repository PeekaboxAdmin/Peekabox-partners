import React, { useState } from 'react';
import './SignUpForm.css';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    brandName: '',
    brandManagerEmail: '',
    brandManagerNumber: '',
    totalStores: '',
    hqLocation: '',
    stores: [], // For storing multiple store profiles
    logo: null,
    backgroundImage: null,
  });

  const [step, setStep] = useState(1);
  const [storeSections, setStoreSections] = useState([]); // To track which stores are expanded

  // Handle form input changes
  const handleInputChange = (e, storeIndex = null) => {
    const { name, value, files } = e.target;

    if (storeIndex !== null) {
      const updatedStores = formData.stores.map((store, index) => (
        index === storeIndex ? { ...store, [name]: files ? files[0] : value } : store
      ));

      setFormData({ ...formData, stores: updatedStores });
    } else {
      setFormData({
        ...formData,
        [name]: files ? files[0] : value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  // Go to the next step
  const nextStep = () => {
    if (step === 1) {
      const storeProfiles = Array.from({ length: formData.totalStores }, () => ({
        category: '',
        storeName: '',
        storeAddress: '',
        storeManagerName: '',
        storeManagerEmail: '',
        storeManagerNumber: '',
        storeType: '',
        surpriseBoxName: '',
        surpriseBoxDescription: '',
        priceOption: '',
      }));
      setFormData({ ...formData, stores: storeProfiles });
      setStoreSections(Array(storeProfiles.length).fill(false)); // Create collapsible state for each store
    }
    setStep(step + 1);
  };

  // Toggle collapsible sections for stores
  const toggleSection = (index) => {
    const updatedSections = [...storeSections];
    updatedSections[index] = !updatedSections[index];
    setStoreSections(updatedSections);
  };

  // Render the form
  return (
    <div className="container">
      <h1>Welcome to Peekabox partner sign up </h1>
      <form onSubmit={handleSubmit}>
        {/* Step 1: Brand Information */}
        {step === 1 && (
          <section className="form-section">
            <h2>Brand Information</h2>
            <div className="form-group">
              <label htmlFor="brandName">Brand Name:</label>
              <input type="text" name="brandName" value={formData.brandName} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="brandManagerEmail">Brand/Operations Manager Email:</label>
              <input type="email" name="brandManagerEmail" value={formData.brandManagerEmail} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="brandManagerNumber">Brand/Operations Manager Number:</label>
              <input type="tel" name="brandManagerNumber" value={formData.brandManagerNumber} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="totalStores">Total Number of Stores (Dubai only):</label>
              <input type="number" name="totalStores" min="1" value={formData.totalStores} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="hqLocation">HQ Location:</label>
              <input type="text" name="hqLocation" value={formData.hqLocation} onChange={handleInputChange} required />
            </div>
            <button type="button" className="next-button" onClick={nextStep}>
              Next
            </button>
          </section>
        )}

        {/* Step 2: Store Profiles */}
        {step === 2 && (
          <section className="form-section">
            <h2>Store Profiles</h2>
            {formData.stores.map((store, index) => (
              <div key={index} className="collapsible-section">
                <button type="button" className="collapsible" onClick={() => toggleSection(index)}>
                  Store {index + 1}: {store.storeName || 'Untitled Store'}
                </button>
                {storeSections[index] && (
                  <div className="collapsible-content">
                    <div className="form-group">
                      <label htmlFor="category">Category:</label>
                      <select name="category" value={store.category} onChange={(e) => handleInputChange(e, index)} required>
                        <option value="">Select Category</option>
                        <option value="Meals">Meals</option>
                        <option value="Bread & Pastries">Bread & Pastries</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="storeName">Store Name (e.g., Pink Cafe - Dubai Mall):</label>
                      <input type="text" name="storeName" value={store.storeName} onChange={(e) => handleInputChange(e, index)} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="storeAddress">Store Address:</label>
                      <textarea name="storeAddress" value={store.storeAddress} onChange={(e) => handleInputChange(e, index)} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="storeManagerName">Store Manager Name:</label>
                      <input type="text" name="storeManagerName" value={store.storeManagerName} onChange={(e) => handleInputChange(e, index)} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="storeManagerEmail">Store Manager Email:</label>
                      <input type="email" name="storeManagerEmail" value={store.storeManagerEmail} onChange={(e) => handleInputChange(e, index)} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="storeManagerNumber">Store Manager Number:</label>
                      <input type="tel" name="storeManagerNumber" value={store.storeManagerNumber} onChange={(e) => handleInputChange(e, index)} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="storeType">Store Type:</label>
                      <select name="storeType" value={store.storeType} onChange={(e) => handleInputChange(e, index)} required>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Cafe">Cafe</option>
                        <option value="Buffet">Buffet</option>
                        <option value="Takeaway">Takeaway restaurant</option>
                        <option value="Sushi Restaurant">Sushi Restaurant</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Bakery">Bakery</option>
                        <option value="Pastry Shop">Pastry Shop</option>
                        <option value="Supermarket">Supermarket</option>
                        <option value="Fruit and Vegetable Store">Fruit and Vegetable Store</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Surprise Box Section */}
                    <h3>Surprise Box Information</h3>
                    <div className="form-group">
                      <label htmlFor="surpriseBoxName">Surprise Box Name:</label>
                      <input type="text" name="surpriseBoxName" value={store.surpriseBoxName} onChange={(e) => handleInputChange(e, index)} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="surpriseBoxDescription">Description:</label>
                      <textarea name="surpriseBoxDescription" value={store.surpriseBoxDescription} onChange={(e) => handleInputChange(e, index)} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="priceOption">Set Your Price:</label>
                      <select name="priceOption" value={store.priceOption} onChange={(e) => handleInputChange(e, index)} required>
                        <option value="45">AED 45 (15 AED for customers)</option>
                        <option value="60">AED 60 (20 AED for customers)</option>
                        <option value="75">AED 75 (25 AED for customers)</option>
                        <option value="90">AED 90 (30 AED for customers)</option>
                        <option value="105">AED 105 (35 AED for customers)</option>
                        <option value="120">AED 120 (40 AED for customers)</option>
                      </select>
                    </div>

                    {/* Save and Do it Later Buttons */}
                    <button type="button" className="save-button">
                      Save
                    </button>
                    <button type="button" className="later-button">
                      Do it Later
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Submit Section */}
            <button type="submit" className="submit-button">
              Return back
            </button>
            <button type="submit" className="submit-button">
              Submit & Join Us!
            </button>
          </section>
        )}
      </form>
    </div>
  );
};

export default SignUpForm;
