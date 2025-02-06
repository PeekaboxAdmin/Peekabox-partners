import React, { useState } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import './CreateBag.css';
import Logo from './Images/burger.jpg';
import { useSelector } from 'react-redux';
import TimePicker from './TimePicker/TimePicker';

interface CreateBagFormProps {
  onCancel: (open: boolean) => void;
}

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const CreateBagForm: React.FC<CreateBagFormProps> = ({ onCancel }) => {
  const [bagName, setBagName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('MEALS');
  const [numberOfBags, setNumberOfBags] = useState('');
  const [allergens, setAllergens] = useState('');
  const [selectedDays, setSelectedDays] = useState<{ day: string; startTime: string; endTime: string }[]>([]);

  const storeId = useSelector((state: any) => state.storeAuth.Store_id);

  const handleDaySelection = (day: string) => {
    const existingDay = selectedDays.find(d => d.day === day);
    if (existingDay) {
      setSelectedDays(selectedDays.filter(d => d.day !== day));
    } else {
      setSelectedDays([ 
        ...selectedDays, 
        { day, startTime: '10:00', endTime: '18:00' } 
      ]);
    }
  };

  const handleTimeChange = (day: string, field: 'startTime' | 'endTime', value: string) => {
    setSelectedDays(
      selectedDays.map((d) =>
        d.day === day ? { ...d, [field]: value } : d
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const allergenArray = allergens.split(',').map((a) => a.trim().toUpperCase());
  
    const data = {
      storeId,
      storeName: "Leto Abu Mall",
      name: bagName,
      description: "A delicious chicken-filled bag, perfect for a quick meal.",
      price: {
        amount: price,
        currencyCode: "AED",
      },
      category,
      quantity: numberOfBags,
      image: "https://example.com/images/chicken_bag.jpg",
      allergenInfo: allergenArray,
      collectionSchedule: {
        day: selectedDays[0].day.toUpperCase(),
        timeWindow: {
          start: selectedDays[0].startTime,
          end: selectedDays[0].endTime,
        }
      },
      isAvailable: true,
    };
  
    try {
      const apiurl = process.env.REACT_APP_API_URL;
      const response = await axios.post(
        `${apiurl}/api/v1/stores/${storeId}/product`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Success:", response.data);
      alert("Bag created successfully!");
      window.location.reload();
    } catch (error) {
      console.log(data);
      console.error("Error creating bag:", error);
      alert("Failed to create the bag. Please try again.");
    }
  };

  return (
    <div className="create-bag-form-container">
      <div className="header">
        <div className="card">
          <img className="card-image" src={Logo} alt="Bag" />
        </div>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-content">
          <div className="form-left">
            <label className="label-s">Bag Name</label>
            <input
              className="input"
              value={bagName}
              onChange={(e) => setBagName(e.target.value)}
            />

            <div className="nd-Grid">
              <div>
                <label className="label-s">Price in AED</label>
                <input
                  className="input"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <label className="label-s">Category</label>
                <select
                  className="select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="MEALS">MEALS</option>
                  <option value="BAKERY">BAKERY</option>
                  <option value="GROCERY">GROCERY</option>
                </select>
              </div>

              <div>
                <label className="label-s">Quantity Selling per Day</label>
                <input
                  className="select"
                  value={numberOfBags}
                  type="number"
                  onChange={(e) => setNumberOfBags(e.target.value)}
                />

                <label className="label-s">Allergens</label>
                <input
                  className="select"
                  value={allergens}
                  type="text"
                  placeholder="Eg. NUT, DAIRY"
                  onChange={(e) => setAllergens(e.target.value.toUpperCase())}
                />
              </div>
            </div>

            <label className="label-s">Image</label>
            <div className="image-upload">
              <label className="label-s">Upload</label>
              <input id="file-upload" type="file" />
            </div>
          </div>

          <div className="form-right">
            <label className="label-s">Select Pickup Days</label>
            <div className="days-grid">
              {daysOfWeek.map((day, index) => (
                <div key={index} className="day-option">
                  <div onClick={() => handleDaySelection(day)}>{day}</div>
                  {selectedDays.some(d => d.day === day) && (
                    <div>
                      <div>
                        <p>Start Time</p>
                        <TimePicker
                          value={selectedDays.find(d => d.day === day)?.startTime || '10:00'}
                          onChange={(value) => handleTimeChange(day, 'startTime', value)}
                        />
                      </div>
                      <div>
                        <p>End Time</p>
                        <TimePicker
                          value={selectedDays.find(d => d.day === day)?.endTime || '18:00'}
                          onChange={(value) => handleTimeChange(day, 'endTime', value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div>
              <button className="button-create" type="submit">
                Create
              </button>
              <button
                className="button cancel-button"
                type="button"
                onClick={() => {onCancel(false)}} // Close the form on cancel
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBagForm;
