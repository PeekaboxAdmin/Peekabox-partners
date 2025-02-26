import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Upload, Clock, Utensils, CroissantIcon as Bread, Fish, Beef, Carrot, Cake, Gift, Leaf, LeafyGreen } from 'lucide-react';
import TimePicker from './TimePicker/TimePicker';
import './CreateBag.css';
import lineImage from '../assets/images/line.png';

interface CreateBagFormProps {
  onCancel: (open: boolean) => void;
}

interface FormData {
  bagName: string;
  category: string;
  allergens: string[];
  description: string;
  price: string;
  numberOfBags: string;
  image: File | null;
  selectedDays: { day: string; startTime: string; endTime: string }[];
}

// Updated STEPS array to match the 5 cases in renderStep
const STEPS = ['Name', 'Category & Allergens', 'Description', 'Price & Quantity', 'Image & Schedule'];

const CreateBagForm: React.FC<CreateBagFormProps> = ({ onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    bagName: '',
    category: '',
    allergens: [],
    description: '',
    price: '',
    numberOfBags: '1',
    image: null,
    selectedDays: [],
  });

  const storeId = useSelector((state: any) => state.storeAuth.Store_id);


  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAllergenToggle = (allergen: string) => {
    setFormData(prev => ({
      ...prev,
      allergens: prev.allergens.includes(allergen)
        ? prev.allergens.filter(a => a !== allergen)
        : [...prev.allergens, allergen]
    }));
  };

  const handleDaySelection = (day: string) => {
    setFormData(prev => {
      const existingDay = prev.selectedDays.find(d => d.day === day);
      if (existingDay) {
        return {
          ...prev,
          selectedDays: prev.selectedDays.filter(d => d.day !== day)
        };
      }
      return {
        ...prev,
        selectedDays: [...prev.selectedDays, { day, startTime: '12:00', endTime: '16:00' }]
      };
    });
  };


  const handleTimeChange = (type: "start" | "end", value: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedDays: prev.selectedDays.map((day) => ({
        ...day,
        [type === "start" ? "startTime" : "endTime"]: value,
      })),
    }))
  }
  
  const handleImageDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, image: file }))
    }
  }, [])

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }))
  }

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append('storeId', storeId);
      data.append('storeName', 'BI');
      data.append('name', formData.bagName);
      data.append('description', formData.description);
      data.append('price', JSON.stringify({ amount: formData.price, currencyCode: "AED" }));
      data.append('category', formData.category);
      data.append('quantity', formData.numberOfBags);
      data.append('allergenInfo', JSON.stringify(formData.allergens));
      data.append('collectionSchedule', JSON.stringify(formData.selectedDays[0]));
      data.append('isAvailable', 'true');
      if (formData.image) {
        data.append('image', formData.image);
      }
      const apiurl = process.env.REACT_APP_API_URL;
      await axios.post(
        `${apiurl}/api/v1/stores/${storeId}/product`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      onCancel(false);
    } catch (error) {
      console.error("Error creating bag:", error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-container">
            <div className="numbered-input-container">
              <span className="input-number">1</span>
              <div className="input-container">
                <h2>What would you like to name your Surprise Bag?</h2>
                <p className="step-description">
                  Choose a name that gives your bag a unique identity and grabs attention!
                </p>
                <input
                  type="text"
                  value={formData.bagName}
                  onChange={(e) => handleInputChange('bagName', e.target.value)}
                  placeholder="Type the Name of Surprise Bag"
                  className="name-input"
                />
              </div>
            </div>
          </div>
        );
  
      case 2:
        return (
          <div className="step-container">
            <div className="numbered-input-container">
              <span className="input-number">2</span>
              <div className="input-container">
                <h2>Select the category that best fits your Surprise Bag!</h2>
                <p className="step-description">
                  This helps customers understand what type of items to expect, making their choice easier.
                </p>
                <div className="category-grid">
                  {[
                    { icon: <Gift />, name: 'Surprise Bag' },
                    { icon: <Bread />, name: 'Bread Bag' },
                    { icon: <Fish />, name: 'Fish Bag' },
                    { icon: <Beef />, name: 'Meat Bag' },
                    { icon: <LeafyGreen />, name: 'Vegan Bag' },
                    { icon: <Cake />, name: 'Pastry Bag' },
                  ].map((category) => (
                    <button
                      key={category.name}
                      className={`category-button ${formData.category === category.name ? 'selected' : ''}`}
                      onClick={() => handleInputChange('category', category.name)}
                    >
                      {category.icon}
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="numbered-input-container">
              <span className="input-number">3</span>
              <div className="input-container">
                <h2>Provide Allergy Information for Your Surprise Bag</h2>
                <p className="step-description">
                  Ensure a safe and enjoyable experience for everyone!
                </p>
                <div className="allergens-grid">
                  {['Milk', 'Fish', 'Peanuts', 'Soybeans', 'Eggs', 'Wheat'].map((allergen) => (
                    <label key={allergen} className="allergen-option">
                      <input
                        type="checkbox"
                        className="circle-checkbox"
                        checked={formData.allergens.includes(allergen)}
                        onChange={() => handleAllergenToggle(allergen)}
                      />
                      <span>{allergen}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
  
      case 3:
        return (
          <div className="step-container">
            <div className="numbered-input-container">
              <span className="input-number">4</span>
              <div className="input-container">
                <h2>Provide a brief description of your Surprise Bag!</h2>
                <p className="step-description">
                  Let customers know what makes it special—whether it's freshly baked goods, delicious leftovers.
                </p>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your surprise bag..."
                  className="description-input"
                />
                <p className="tip">
              Tip: Mention key highlights like freshness, variety, or special items to attract customers!
              </p>
              </div>
              
            </div>
            
          </div>
        );
  
      case 4:
        return (
          <div className="step-container">
            <div className="numbered-input-container">
              <span className="input-number">5</span>
              <div className="input-container">
                <h2>Set the price for your Surprise Bag!</h2>
                <p className="step-description">
                  Make it affordable and attractive while reflecting the value of the items inside.
                </p>
                <div className="price-input-container">
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="15.00"
                    className="price-input"
                  />
                  <span className="currency">AED</span>
                </div>
              </div>
            </div>
            <div className="numbered-input-container">
              <span className="input-number">6</span>
              <div className="input-container">
                <h2>Set the number of Surprise Bags available each day?</h2>
                <p className="step-description">
                  This helps manage customer expectations and ensures you sell just the right amount!
                </p>
                <div className="quantity-input-container">
                  <button
                    onClick={() =>
                      handleInputChange('numberOfBags', String(Number(formData.numberOfBags) - 1))
                    }
                    disabled={Number(formData.numberOfBags) <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={formData.numberOfBags}
                    onChange={(e) => handleInputChange('numberOfBags', e.target.value)}
                    min="1"
                    className="quantity-input"
                  />
                  <button
                    onClick={() =>
                      handleInputChange('numberOfBags', String(Number(formData.numberOfBags) + 1))
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
  
      case 5:
        return (
          <div className="step-container">
            <div className="numbered-input-container">
              <span className="input-number">7</span>
              <div className="input-container">
                <h2>Upload a photo to showcase your Surprise Bag and grab customers' attention!</h2>
                <div
                className="image-upload-area"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleImageDrop}
                onClick={() => fileInputRef.current?.click()}
                >
                {formData.image ? (
                  <div className="image-preview-container">
                    <img
                      src={URL.createObjectURL(formData.image) || "/placeholder.svg"}
                      alt="Preview"
                      className="image-preview"
                    />
                    <button
                      type="button"
                      className="remove-image-button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveImage()
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload size={24} />
                    <p>Choose file or drag here</p>
                    <span className="file-size-limit">Size Limit: 40MB</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden-file-input"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setFormData((prev) => ({ ...prev, image: file }))
                        }
                      }}
                    />
                  </>
                )}
              </div>
              </div>
            </div>
            <div className="numbered-input-container">
              <span className="input-number">8</span>
              <div className="input-container">
                <h2>Set a Pickup Time</h2>
                <p className="step-description">
                  Let customers know when they can collect their Surprise Bag to ensure a smooth experience!
                </p>
                <div className="time-selection">
                  <div className="time-range">
                  <TimePicker
                    value={formData.selectedDays[0]?.startTime || "12:00"}
                    onChange={(value) => handleTimeChange("start", value)}
                  />
                  <span>-</span>
                  <TimePicker
                    value={formData.selectedDays[0]?.endTime || "16:00"}
                    onChange={(value) => handleTimeChange("end", value)}
                  />
                  </div>
                  <div className="days-selection">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <button
                        key={day}
                        className={`day-button ${
                          formData.selectedDays.some(d => d.day === day) ? 'selected' : ''
                        }`}
                        onClick={() => handleDaySelection(day)}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
  
      default:
        return null;
    }
  };
  
  

  return (
    <div className="create-bag-container">
      <div className="create-bag-container-heading">
        <h1>Create a New Bag</h1>
        <img src={lineImage} alt="Line" />
      </div>
      <div className="form-content">
        {renderStep()}
  
        <div className="navigation-buttons">
          {currentStep > 1 && (
            <button onClick={handleBack} className="back-button">
              Back
            </button>
          )}
          {currentStep < STEPS.length ? (
            <button onClick={handleNext} className="next-button">
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} className="done-button">
              Done
            </button>
          )}
        </div>
        <div className="progress-lines">
          {STEPS.map((_, index) => (
            <div
              key={index}
              className={`progress-line ${index + 1 === currentStep ? "active" : ""} ${
                index + 1 < currentStep ? "completed" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateBagForm;





