import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { 
  Upload, 
  Clock, 
  Utensils, 
  CroissantIcon as Bread, 
  Fish, 
  Beef, 
  Carrot, 
  Cake, 
  Gift, 
  Leaf, 
  LeafyGreen 
} from 'lucide-react';
import TimePicker from './TimePicker/TimePicker';
import './CreateBag.css';
import lineImage from '../assets/images/line.png';
import FooterLinks from './FooterLink/FooterLinks';

interface CreateBagFormProps {
  onCancel: (open: boolean) => void;
  initialData?: FormData; // Prop for editing mode
}

export interface FormData {
  id?: number; // Optional, available in editing mode
  name: string;
  category: string;
  allergens: string[];
  description: string;
  price: string;
  numberOfBags: string;
  image: File | null;
  imageUrl?: string; // Optional: existing image URL when editing
  selectedDays: { day: string; startTime: string; endTime: string }[];
}

const STEPS = ['Name', 'Category & Allergens', 'Description', 'Price & Quantity', 'Image & Schedule'];

const CreateBagForm: React.FC<CreateBagFormProps> = ({ onCancel, initialData }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(
    initialData || {
      name: '',
      category: '',
      allergens: [],
      description: '',
      price: '',
      numberOfBags: '1',
      image: null,
      selectedDays: [],
    }
  );

  // If initialData changes (i.e. in editing mode), update the form
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const storeId = useSelector((state: any) => state.storeAuth.Store_id);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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
    setFormData(prev => ({
      ...prev,
      selectedDays: prev.selectedDays.map(day => ({
        ...day,
        [type === "start" ? "startTime" : "endTime"]: value,
      })),
    }));
  };

  const handleImageDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  }, []);

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
  };

  // Function to upload image if provided
  const uploadImageToS3 = async (file: File) => {
    const data = new FormData();
    data.append("image", file);
    const apiurl = process.env.REACT_APP_API_URL;
    const response = await axios.post(
      `${apiurl}/api/v1/stores/ProductUpload`,
      data,
      { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
    );
    return response.data.data.imageUrl;
  };

  const handleSubmit = async () => {
    try {
      // Upload image if provided and obtain its URL
      let uploadedImageUrl = "";
      if (formData.image) {
        uploadedImageUrl = await uploadImageToS3(formData.image);
      } else {
        uploadedImageUrl = formData.imageUrl || "";
      }
  
      // Destructure the relevant fields from formData
      const {
        id,
        name,
        description,
        price,
        category,
        numberOfBags,
        allergens,
        selectedDays,
      } = formData;
  
      // Build a JSON payload without directly using formData inline
      const payload = {
        storeId: storeId,
        name,
        description,
        price: {
          amount: Number(price),
          currencyCode: "AED",
        },
        category,
        quantity: Number(numberOfBags),
        image: uploadedImageUrl,
        allergenInfo: allergens,
        collectionSchedule: {
          day: selectedDays && selectedDays.length > 0 ? selectedDays[0].day : "Mon",
          timeWindow: {
            start: selectedDays && selectedDays.length > 0 ? selectedDays[0].startTime : "10:00",
            end: selectedDays && selectedDays.length > 0 ? selectedDays[0].endTime : "18:00",
          },
        },
        isAvailable: true,
      };
  
      const apiurl = process.env.REACT_APP_API_URL;
      if (id) {
        // Editing an existing bag – update it via a PUT request
        await axios.put(
          `${apiurl}/api/v1/stores/${storeId}/product/${id}`,
          payload,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
      } else {
        // Creating a new bag via a POST request
        await axios.post(
          `${apiurl}/api/v1/stores/${storeId}/product`,
          payload,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
      }
      onCancel(false);
      console.log(payload);
    } catch (error) {
      console.error("Error submitting bag:", error);
    }
  };

  const decrementQuantity = () => {
    setFormData(prev => ({ ...prev, numberOfBags: String(Number(prev.numberOfBags) - 1) }));
  };

  const incrementQuantity = () => {
    setFormData(prev => ({ ...prev, numberOfBags: String(Number(prev.numberOfBags) + 1) }));
  };

  // State to manage the current selected day and times (for schedule saving)
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  const handleStartTimeChange = (time: string) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time: string) => {
    setEndTime(time);
  };

  const handleDaySelect = (day: string) => {
    setSelectedDay(day);
  };

  const handleSaveSchedule = () => {
    // Check if the day already exists in the schedule
    const existingSchedule = formData.selectedDays.find(
      (schedule) => schedule.day === selectedDay
    );

    if (existingSchedule) {
      // Update the existing schedule for the selected day
      const updatedSchedule = formData.selectedDays.map((schedule) =>
        schedule.day === selectedDay
          ? { ...schedule, startTime: startTime, endTime: endTime }
          : schedule
      );
      setFormData(prev => ({ ...prev, selectedDays: updatedSchedule }));
    } else {
      // Add a new schedule entry if the day doesn't exist
      setFormData(prev => ({
        ...prev,
        selectedDays: [...prev.selectedDays, { day: selectedDay, startTime, endTime }],
      }));
    }
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
                  value={formData.name}
                  onChange={e => handleInputChange('name', e.target.value)}
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
                  ].map(categoryObj => (
                    <button
                      key={categoryObj.name}
                      className={`category-button ${formData.category === categoryObj.name ? 'selected' : ''}`}
                      onClick={() => handleInputChange('category', categoryObj.name)}
                    >
                      {categoryObj.icon}
                      <span>{categoryObj.name}</span>
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
                  {['Milk', 'Fish', 'Peanuts', 'Soybeans', 'Eggs', 'Wheat'].map(allergen => (
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
                  onChange={e => handleInputChange('description', e.target.value)}
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
                    onChange={e => handleInputChange('price', e.target.value)}
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
                    onClick={decrementQuantity}
                    disabled={Number(formData.numberOfBags) <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={formData.numberOfBags}
                    onChange={e => handleInputChange('numberOfBags', e.target.value)}
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
                  onDragOver={e => e.preventDefault()}
                  onDrop={handleImageDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {(formData.image || formData.imageUrl) ? (
                    <div className="image-preview-container">
                      <img
                        src={formData.image ? URL.createObjectURL(formData.image) : formData.imageUrl || "/placeholder.svg"}
                        alt="Preview"
                        className="image-preview"
                      />
                      <button
                        type="button"
                        className="remove-image-button"
                        onClick={e => {
                          e.stopPropagation();
                          handleRemoveImage();
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
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleInputChange('image', file);
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
                      onChange={value => handleTimeChange("start", value)}
                    />
                    <span>-</span>
                    <TimePicker
                      value={formData.selectedDays[0]?.endTime || "16:00"}
                      onChange={value => handleTimeChange("end", value)}
                    />
                  </div>
                  <div className="days-selection">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                      <button
                        key={day}
                        className={`day-button ${formData.selectedDays.some(d => d.day === day) ? 'selected' : ''}`}
                        onClick={() => handleDaySelection(day)}
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
      {/* Back button at top left; onCancel will hide the CreateBagForm */}
      <button
        className="back-to-surprise-box"
        onClick={() => onCancel(false)}
      >
        ← Back to Surprise Boxes
      </button>
      <div className="create-bag-container-heading">
        <h1>{formData.id ? "Edit Bag" : "Create a New Bag"}</h1>
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
              className={`progress-line ${index + 1 === currentStep ? "active" : ""} ${index + 1 < currentStep ? "completed" : ""}`}
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
