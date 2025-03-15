import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Upload, Clock, Utensils, CroissantIcon as Bread, Fish, Beef, Carrot, Cake, Gift, Leaf, LeafyGreen } from 'lucide-react';
import TimePicker from './TimePicker/TimePicker';
import './CreateBag.css';
import lineImage from '../assets/images/line.png';
import FooterLinks from './FooterLink/FooterLinks';
import e from 'express';

interface CreateBagFormProps {
  onCancel: (open: boolean) => void;
}

interface FormData {
  name: string;
  category: string;
  allergens: string[];
  description: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: string; 
  image: File | null;
  collectionSchedule: { 
    day: string; 
    timeWindow: { start: string; end: string } 
  }[];
  isAvailable: boolean;
}

// Updated STEPS array to match the 5 cases in renderStep
const STEPS = ['Name', 'Category & Allergens', 'Description', 'Price & Quantity', 'Image & Schedule'];

const CreateBagForm: React.FC<CreateBagFormProps> = ({ onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [allergens, setAllergens] = useState<string[]>([]);
  const [priceAmount, setPriceAmount] = useState('');
  const [currencyCode, setCurrencyCode] = useState('AED');
  const [quantity, setQuantity] = useState('1');
  const [image, setImage] = useState<File | null>(null);
  const [collectionSchedule, setCollectionSchedule] = useState<
  { day: string; timeWindow: { start: string; end: string } }[]
>([]);
  const [isAvailable, setIsAvailable] = useState(true);


  const storeId = useSelector((state: any) => state.storeAuth.Store_id);


  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleAllergenToggle = (allergen : string) => {
    setAllergens((prevAllergens) =>
      prevAllergens.includes(allergen)
        ? prevAllergens.filter((item) => item !== allergen)
        : [...prevAllergens, allergen]
    );
  };
  
  
   // Handle image drop
   const handleImageDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    }
  }, []);

  // Handle image removal
  const handleRemoveImage = () => {
    setImage(null); // Reset image to null
  };


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

const allergenInfo = allergens.length > 0 ? allergens.join(", ") : "No allergens"; 

  const handleSubmit = async () => {
    try {
      let imageUrl = "";
    if (image) {
      imageUrl = await uploadImageToS3(image);
      if(imageUrl !==""){
        console.log("image url : "+ imageUrl);
      
        const productData = {
          name,  // From state
          description,  // From state
          price: {
            amount: priceAmount,  // From state
            currencyCode,  // From state
          },
          category,  // From state
          type: "Food",  // Static value
          quantity,  // From state
          image: imageUrl,  // The uploaded image URL from S3
          allergenInfo,  // Allergens as a comma-separated string
          collectionSchedule,  // Collection schedule from state
          isAvailable,  // Availability status from state
        };


      const apiurl = process.env.REACT_APP_API_URL;
      await axios.post(
        `${apiurl}/api/v1/stores/${storeId}/product`,
        productData,
        {
          withCredentials: true,
        }
      );
      onCancel(false);
      console.log(productData);
    }
  }
    } catch (error) {
      console.error("Error creating bag:", error);
    }
  };





const decrementQuantity = () => {
  setQuantity((prev) => (Number(prev) > 1 ? String(Number(prev) - 1) : prev));
};

const incrementQuantity = () => {
  setQuantity((prev) => String(Number(prev) + 1));
};


// State to manage the current selected day and times
const [selectedDay, setSelectedDay] = useState<string>('');
const [startTime, setStartTime] = useState<string>('');
const [endTime, setEndTime] = useState<string>('');

// Handle start time change
const handleStartTimeChange = (time: string) => {
  setStartTime(time);
};

// Handle end time change
const handleEndTimeChange = (time: string) => {
  setEndTime(time);
};

// Handle selecting a day and saving the time range
const handleDaySelect = (day: string) => {
  setSelectedDay(day);
};

// Save or update collection schedule
const handleSaveSchedule = () => {
  // Check if the day already exists in the schedule
  const existingSchedule = collectionSchedule.find(
    (schedule) => schedule.day === selectedDay
  );

  if (existingSchedule) {
    // Update the existing schedule for the selected day
    const updatedSchedule = collectionSchedule.map((schedule) =>
      schedule.day === selectedDay
        ? {
            ...schedule,
            timeWindow: { start: startTime, end: endTime },
          }
        : schedule
    );
    setCollectionSchedule(updatedSchedule);
  } else {
    // Add a new schedule entry if the day doesn't exist
    setCollectionSchedule([
      ...collectionSchedule,
      { day: selectedDay, timeWindow: { start: startTime, end: endTime } },
    ]);
  }

  // Reset selected day and times
  setSelectedDay('');
  setStartTime('');
  setEndTime('');
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  ].map((categorys) => (
                    <button
                      key={categorys.name}
                      className={`category-button ${category === categorys.name ? 'selected' : ''}`}
                      onClick={() => setCategory(categorys.name)}
                    >
                      {categorys.icon}
                      <span>{categorys.name}</span>
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
                        checked={allergens.includes(allergen)}
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
    type="text"
    value={priceAmount} // Access `amount` inside `price`
    onChange={(e) => setPriceAmount(e.target.value)}
    placeholder="15.00"
    className="price-input"
  />
  <span className="currency">{currencyCode}</span>
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
                <button onClick={decrementQuantity} disabled={Number(quantity) <= 1}>-</button>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min="1"
        className="quantity-input"
      />

      <button onClick={incrementQuantity}>+</button>
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
                {image ? (
                  <div className="image-preview-container">
                    <img
                      src={URL.createObjectURL(image) || "/placeholder.svg"}
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
                          setImage(file);
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
            value={startTime}
            onChange={handleStartTimeChange}  // Handle start time change
          />
          <span>-</span>
          <TimePicker
            value={endTime}
            onChange={handleEndTimeChange}  // Handle end time change
          />
                  </div>

                  <div className="days-selection">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                       <button
                       key={day}
                       className={`day-button ${selectedDay === day ? 'selected' : ''}`}  // Highlight selected day
                       onClick={() => handleDaySelect(day)}  // Handle day button click
                     >
                       {day}
                     </button>
                    ))}
                  </div>
        <button onClick={handleSaveSchedule} disabled={!selectedDay || !startTime || !endTime}>
          Save Schedule
        </button>
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
      <footer className="dashboard-footer">
        <FooterLinks />
      </footer>
    </div>

  
  );
};

export default CreateBagForm;





