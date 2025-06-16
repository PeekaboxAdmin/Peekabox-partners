'use client';

import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  Upload,
  CroissantIcon as Bread,
  Fish,
  Beef,
  Cake,
  Gift,
  LeafyGreen,
} from 'lucide-react';
import TimePicker from './TimePicker/TimePicker';
import './CreateBag.css';
import lineImage from '../assets/images/line.png';

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
    discount: boolean;
    discountPrice: string;
    currencyCode: string;
  };
  quantity: string;
  image: File | null;
  collectionSchedule: {
    day: string;
    timeWindow: { start: string; end: string };
  }[];
  isAvailable: boolean;
}

// Updated STEPS array to match the 5 cases in renderStep
const STEPS = [
  'Name',
  'Category & Allergens',
  'Description',
  'Price & Quantity',
  'Image & Schedule',
];

const CreateBagForm: React.FC<CreateBagFormProps> = ({ onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [allergens, setAllergens] = useState<string[]>([]);
  const [afterDiscount, setafterDiscount] = useState('');
  const [Discount, setDiscount] = useState(true);
  const [priceAmount, setPriceAmount] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [discountAmount, setdiscountAmount] = useState('');
  const [currencyCode, setCurrencyCode] = useState('AED');
  const [quantity, setQuantity] = useState('1');
  const [image, setImage] = useState<File | null>(null);
  const [collectionSchedule, setCollectionSchedule] = useState<
    {
      day: string;
      timeWindow: { start: string; end: string };
      quantityAvailable: string;
    }[]
  >([]);
  const [isAvailable, setIsAvailable] = useState(true);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateFields = () => {
    // Name validation
    if (!name.trim()) return 'Name is required.';
    if (name.length < 3) return 'Name must be at least 3 characters.';
    if (name.length > 50) return 'Name must be less than 50 characters.';

    // Category validation
    if (!category.trim()) return 'Category is required.';

    // Allergens validation
    if (allergens.length === 0) return 'Please select at least one allergen.';

    // Description validation
    if (!description.trim()) return 'Description is required.';
    if (description.length < 10)
      return 'Description must be at least 10 characters.';
    if (description.length > 500)
      return 'Description must be less than 500 characters.';

    // Price validation
    if (!priceAmount.trim()) return 'Original price is required.';
    if (isNaN(Number(priceAmount)) || Number(priceAmount) <= 0)
      return 'Enter a valid original price greater than 0.';

    // Discount validation
    if (discountAmount.trim()) {
      if (isNaN(Number(discountAmount)))
        return 'Discount percentage must be a number.';
      if (Number(discountAmount) < 0 || Number(discountAmount) > 100)
        return 'Discount percentage must be between 0 and 100.';
    }

    // Final price validation
    if (!discountPrice.trim()) return 'Final price is required.';
    if (isNaN(Number(discountPrice)) || Number(discountPrice) < 0)
      return 'Enter a valid final price (0 or greater).';
    if (Number(discountPrice) > Number(priceAmount))
      return 'Final price cannot be greater than original price.';

    // Quantity validation
    if (!quantity.trim()) return 'Quantity is required.';
    if (
      isNaN(Number(quantity)) ||
      Number(quantity) < 1 ||
      !Number.isInteger(Number(quantity))
    )
      return 'Quantity must be at least 1 and a whole number.';

    // Image validation
    if (!image) return 'Please upload an image.';

    // Collection schedule validation
    if (collectionSchedule.length === 0)
      return 'Please add at least one collection schedule.';

    // Validate each collection schedule
    for (const schedule of collectionSchedule) {
      if (!schedule.day) return 'Day is required for all collection schedules.';
      if (!schedule.timeWindow.start)
        return 'Start time is required for all collection schedules.';
      if (!schedule.timeWindow.end)
        return 'End time is required for all collection schedules.';

      // Validate time format and logic
      if (schedule.timeWindow.start >= schedule.timeWindow.end)
        return 'End time must be after start time.';
    }

    return null;
  };

  const handleDoneClick = () => {
    const error = validateFields();
    if (error) {
      setErrorMessage(error);
      return;
    }
    setErrorMessage(null);
    handleSubmit();
  };

  const storeId = useSelector((state: any) => state.storeAuth.Store_id);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleAllergenToggle = (allergen: string) => {
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
    if (file && file.type.startsWith('image/')) {
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
    formData.append('image', file);
    const apiurl = process.env.REACT_APP_API_URL;
    const response = await axios.post(
      `${apiurl}/api/v1/stores/ProductUpload`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      }
    );

    return response.data.data.imageUrl; // Return the uploaded image URL
  };
  //

  const allergenInfo =
    allergens.length > 0 ? allergens.join(', ') : 'No allergens';

  const handleSubmit = async () => {
    try {
      let imageUrl = '';
      if (image) {
        imageUrl = await uploadImageToS3(image);
        if (imageUrl !== '') {
          console.log('image url : ' + imageUrl);

          const productData = {
            name, // From state
            description, // From state
            price: {
              discount: discountAmount && Number.parseFloat(discountAmount) > 0, // Derive discount dynamically
              amount: Number.parseFloat(priceAmount), // Original price
              discountPrice: Number.parseFloat(discountPrice), // Final discounted price
              currencyCode,
            },
            category, // From state
            quantity, // From state
            image: imageUrl, // The uploaded image URL from S3
            allergenInfo, // Allergens as a comma-separated string
            collectionSchedule, // Collection schedule from state
            isAvailable, // Availability status from state
          };

          console.log('Product Data being sent to backend:', productData);

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
      console.error('Error creating bag:', error);
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

  const handleSaveSchedule = () => {
    // Validate schedule inputs
    if (!selectedDay) {
      setErrorMessage('Please select a day');
      return;
    }

    if (!startTime) {
      setErrorMessage('Please select a start time');
      return;
    }

    if (!endTime) {
      setErrorMessage('Please select an end time');
      return;
    }

    if (startTime >= endTime) {
      setErrorMessage('End time must be after start time');
      return;
    }

    setErrorMessage(null);

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
              quantityAvailable: quantity,
            }
          : schedule
      );
      setCollectionSchedule(updatedSchedule);
    } else {
      // Add a new schedule entry if the day doesn't exist
      setCollectionSchedule([
        ...collectionSchedule,
        {
          day: selectedDay,
          timeWindow: { start: startTime, end: endTime },
          quantityAvailable: quantity,
        },
      ]);
    }

    // Reset selected day and times
    setSelectedDay('');
    setStartTime('');
    setEndTime('');
  };

  // Handle selecting a day and saving the time range
  const handleDaySelect = (day: string) => {
    setSelectedDay(day);
  };

  // Handler for when original price changes
  const handlePriceAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPriceAmount = e.target.value;
    setPriceAmount(newPriceAmount);

    // If we have both discount percentage and valid price, recalculate final price
    if (
      discountAmount &&
      !isNaN(Number(discountAmount)) &&
      !isNaN(Number(newPriceAmount))
    ) {
      const calculatedDiscountPrice = (
        Number(newPriceAmount) -
        (Number(discountAmount) / 100) * Number(newPriceAmount)
      ).toFixed(2);
      setDiscountPrice(calculatedDiscountPrice);
    }
  };

  // Handler for when discount percentage changes
  const handleDiscountAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newDiscountAmount = e.target.value;
    setdiscountAmount(newDiscountAmount);

    // If we have both original price and valid discount, recalculate final price
    if (
      priceAmount &&
      !isNaN(Number(priceAmount)) &&
      !isNaN(Number(newDiscountAmount))
    ) {
      const calculatedDiscountPrice = (
        Number(priceAmount) -
        (Number(newDiscountAmount) / 100) * Number(priceAmount)
      ).toFixed(2);
      setDiscountPrice(calculatedDiscountPrice);
    }
  };

  // Handler for when final price changes
  const handleDiscountPriceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newDiscountPrice = e.target.value;
    setDiscountPrice(newDiscountPrice);

    // If we have both original price and valid final price, recalculate discount percentage
    if (
      priceAmount &&
      !isNaN(Number(priceAmount)) &&
      !isNaN(Number(newDiscountPrice))
    ) {
      // Only calculate if original price is greater than final price
      if (Number(priceAmount) > Number(newDiscountPrice)) {
        const calculatedDiscountPercentage = (
          ((Number(priceAmount) - Number(newDiscountPrice)) /
            Number(priceAmount)) *
          100
        ).toFixed(2);
        setdiscountAmount(calculatedDiscountPercentage);
      } else {
        // If final price is greater than or equal to original, set discount to 0
        setdiscountAmount('0');
      }
    }
  };

  // TO USE EFFECT TO BE DELETED
  // useEffect(() => {
  //   if (!isNaN(parseFloat(priceAmount)) && !isNaN(parseFloat(discountAmount))) {
  //     const calculatedDiscountPrice = (
  //       parseFloat(priceAmount) -
  //       (parseFloat(discountAmount) / 100) * parseFloat(priceAmount)
  //     ).toFixed(2);

  //     setDiscountPrice(calculatedDiscountPrice); // Update discountPrice state
  //   } else {
  //     setDiscountPrice(''); // Reset if inputs are invalid
  //   }
  // }, [priceAmount, discountAmount]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className='step-container'>
            <div className='numbered-input-container'>
              <span className='input-number'>1</span>
              <div className='input-container'>
                <h2>What would you like to name your Surprise Bag?</h2>
                <p className='step-description'>
                  Choose a name that gives your bag a unique identity and grabs
                  attention!
                </p>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Type the Name of Surprise Bag'
                  className='name-input'
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className='step-container'>
            <div className='numbered-input-container'>
              <span className='input-number'>2</span>
              <div className='input-container'>
                <h2>Select the category that best fits your Surprise Bag!</h2>
                <p className='step-description'>
                  This helps customers understand what type of items to expect,
                  making their choice easier.
                </p>
                <div className='category-grid'>
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
                      className={`category-button ${
                        category === categorys.name ? 'selected' : ''
                      }`}
                      onClick={() => setCategory(categorys.name)}>
                      {categorys.icon}
                      <span>{categorys.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className='numbered-input-container'>
              <span className='input-number'>3</span>
              <div className='input-container'>
                <h2>Provide Allergy Information for Your Surprise Bag</h2>
                <p className='step-description'>
                  Ensure a safe and enjoyable experience for everyone!
                </p>
                <div className='allergens-grid'>
                  {[
                    'No Allergen',
                    'Milk',
                    'Fish',
                    'Peanuts',
                    'Soybeans',
                    'Eggs',
                    'Wheat',
                  ].map((allergen) => (
                    <label key={allergen} className='allergen-option'>
                      <input
                        type='checkbox'
                        className='circle-checkbox'
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
          <div className='step-container'>
            <div className='numbered-input-container'>
              <span className='input-number'>4</span>
              <div className='input-container'>
                <h2>Provide a brief description of your Surprise Bag!</h2>
                <p className='step-description'>
                  Let customers know what makes it special—whether it's freshly
                  baked goods, delicious leftovers.
                </p>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='Describe your surprise bag...'
                  className='description-input'
                />
                <p className='tip'>
                  Tip: Mention key highlights like freshness, variety, or
                  special items to attract customers!
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className='step-container'>
            <div className='numbered-input-container'>
              <span className='input-number'>5</span>
              <div className='input-container'>
                <h2>Set the price for your Surprise Bag!</h2>
                <p className='step-description'>
                  Make it affordable and attractive while reflecting the value
                  of the items inside.
                </p>
                <div className='price-input-container'>
                  <div className='price-field'>
                    <label htmlFor='original-price'>Full Price</label>
                    <input
                      id='original-price'
                      type='text'
                      value={priceAmount}
                      onChange={(e) => handlePriceAmountChange(e)}
                      placeholder='Full Price'
                      className='price-input'
                    />
                  </div>

                  <div className='price-field'>
                    <label htmlFor='discount-percentage'>Discount Rate</label>
                    <input
                      id='discount-percentage'
                      type='text'
                      value={discountAmount}
                      onChange={(e) => handleDiscountAmountChange(e)}
                      placeholder='Discount Rate'
                      className='price-input'
                    />
                  </div>

                  <div className='price-field'>
                    <label htmlFor='final-price'>Customer Price</label>
                    <input
                      id='final-price'
                      type='text'
                      value={discountPrice}
                      onChange={(e) => handleDiscountPriceChange(e)}
                      placeholder='Customer Price'
                      className='price-input'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='numbered-input-container'>
              <span className='input-number'>6</span>
              <div className='input-container'>
                <h2>Set the number of Surprise Bags available each day?</h2>
                <p className='step-description'>
                  This helps manage customer expectations and ensures you sell
                  just the right amount!
                </p>
                <div className='quantity-input-container'>
                  <button
                    onClick={decrementQuantity}
                    disabled={Number(quantity) <= 1}>
                    -
                  </button>
                  <input
                    type='number'
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min='1'
                    className='quantity-input'
                  />

                  <button onClick={incrementQuantity}>+</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className='step-container'>
            <div className='numbered-input-container'>
              <span className='input-number'>7</span>
              <div className='input-container'>
                <h2>
                  Upload a photo to showcase your Surprise Bag and grab
                  customers' attention!
                </h2>
                <div
                  className='image-upload-area'
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleImageDrop}
                  onClick={() => fileInputRef.current?.click()}>
                  {image ? (
                    <div className='image-preview-container'>
                      <img
                        src={URL.createObjectURL(image) || '/placeholder.svg'}
                        alt='Preview'
                        className='image-preview'
                      />
                      <button
                        type='button'
                        className='remove-image-button'
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage();
                        }}>
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className='upload-prompt'>
                      <Upload size={24} />
                      <p>Choose file or drag here</p>
                      <span className='file-size-limit'>Size Limit: 40MB</span>
                      <input
                        ref={fileInputRef}
                        type='file'
                        accept='image/*'
                        className='hidden-file-input'
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setImage(file);
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='numbered-input-container'>
              <span className='input-number'>8</span>
              <div className='input-container'>
                <h2>Set a Pickup Time</h2>
                <p className='step-description'>
                  Let customers know when they can collect their Surprise Bag to
                  ensure a smooth experience!
                </p>
                <div className='time-selection'>
                  <div className='time-range'>
                    <TimePicker
                      value={startTime}
                      onChange={handleStartTimeChange} // Handle start time change
                    />
                    <span>-</span>
                    <TimePicker
                      value={endTime}
                      onChange={handleEndTimeChange} // Handle end time change
                    />
                  </div>

                  <div className='days-selection'>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
                      (day) => (
                        <button
                          key={day}
                          className={`day-button ${
                            selectedDay === day ? 'selected' : ''
                          }`} // Highlight selected day
                          onClick={() => handleDaySelect(day)} // Handle day button click
                        >
                          {day}
                        </button>
                      )
                    )}
                  </div>
                  <button
                    className='saveschedule'
                    onClick={handleSaveSchedule}
                    disabled={!selectedDay || !startTime || !endTime}>
                    Save Schedule
                  </button>

                  {/* Display saved collection schedule */}
                  {collectionSchedule.length > 0 && (
                    <div className='collection-schedule-list'>
                      <h3>Saved Collection Schedule:</h3>
                      <ul>
                        {collectionSchedule.map((schedule, index) => (
                          <li key={index} className='schedule-item'>
                            <strong>{schedule.day}:</strong>{' '}
                            {schedule.timeWindow.start} -{' '}
                            {schedule.timeWindow.end}
                            <span> (Qty: {quantity})</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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
    <div className='create-bag-container'>
      <div className='create-bag-container-heading'>
        <h1>Create a New Bag</h1>
        <img src={lineImage || '/placeholder.svg'} alt='Line' />
      </div>
      <div className='form-content'>
        {renderStep()}

        <div className='navigation-buttons'>
          {currentStep > 1 && (
            <button onClick={handleBack} className='back-button'>
              Back
            </button>
          )}
          {currentStep < STEPS.length ? (
            <button onClick={handleNext} className='next-button'>
              Next
            </button>
          ) : (
            <button onClick={handleDoneClick} className='done-button'>
              Done
            </button>
          )}
        </div>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}

        <div className='progress-lines'>
          {STEPS.map((_, index) => (
            <div
              key={index}
              className={`progress-line ${
                index + 1 === currentStep ? 'active' : ''
              } ${index + 1 < currentStep ? 'completed' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateBagForm;
