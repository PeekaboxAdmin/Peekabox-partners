import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CreateBag.css';
import Logo from './Images/food.jpg';

interface CreateBagFormProps {
  setIsModalOpen: (open: boolean) => void;
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

const CreateBagForm: React.FC<CreateBagFormProps> = ({ setIsModalOpen }) => {
  const [bagName, setBagName] = useState('Deluxe');
  const [price, setPrice] = useState('45');
  const [category, setCategory] = useState('Surprise Bag');
  const [numberOfBags, setNumberOfBags] = useState('3');
  const [allergens, setAllergens] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(new Date(new Date().getTime() + 60 * 60 * 1000)); // 1 hour later by default

  const handleDaySelection = (day: string) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here (e.g., sending data to a server)
    console.log({ bagName, price, category, numberOfBags, allergens, selectedDays, startTime, endTime });
  };

  return (
    <div className="create-bag-form-container">
      <div className="header">
        <div className="card">
          <img className="card-image" src={Logo} alt="Deluxe Bag" />
          <div className="card-content">
            <h2 className="card-title">Deluxe</h2>
            <p className="card-details">0 out of 5 sold</p>
            <p className="card-details">mon-tuesday 10am - 20pm</p>
            <div className="price-container">
              <span className="original-price">AED 45</span> AED 15
            </div>
          </div>
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
            
            <div className='nd-Grid'>
                <div>
            <label className="label-s">Price</label>
            <select
              className="select"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            >
              <option value="45">AED 45</option>
              <option value="30">AED 30</option>
              <option value="15">AED 15</option>
            </select>

            <label className="label-s">Category</label>
            <select
              className="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Surprise Bag">Surprise Bag</option>
            </select>

            </div>

            <div>

            <label className="label-s">Quantity Selling per Day</label>
            <select
              className="select"
              value={numberOfBags}
              onChange={(e) => setNumberOfBags(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>

            <label className="label-s">Allergens</label>
            <input
              className="input"
              value={allergens}
              onChange={(e) => setAllergens(e.target.value)}
              placeholder="..."
            />

              </div>

            </div>
            
            <label className="label-s" >Image</label>  
            <div className="image-upload">
            <label className="label-s" >Upload</label>
            <input id="file-upload" type="file" />
             </div>
          </div>

          <div className="form-right">
            <label className="label-s">Select Pickup Days</label>
            <div className="days-list">
              {daysOfWeek.map((day) => (
                <label key={day} className="day-option">
                  <input
                    type="checkbox"
                    checked={selectedDays.includes(day)}
                    onChange={() => handleDaySelection(day)}
                  />
                  {day}
                </label>
              ))}
            </div>

            <label className="label-s">Select Pickup Time</label>
            <div className="time-range">
              <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Start Time"
                dateFormat="h:mm aa"
                placeholderText="Start Time"
              />
              <span className="time-separator">to</span>
              <DatePicker
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="End Time"
                dateFormat="h:mm aa"
                placeholderText="End Time"
              />
            </div>
            <div>
            <button className="button" type="submit">Create</button>
            <button className="button cancel-button" type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBagForm;
