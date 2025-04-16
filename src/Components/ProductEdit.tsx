import React, { useState, useEffect } from 'react';
import './ProductEditor.css';
import Header from './Header';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { resolve } from 'path';

interface TimeWindow {
  start: string;
  end: string;
}

interface CollectionSchedule {
  day: string;
  timeWindow: TimeWindow;
  quantityAvailable: number;
}

interface ProductFormData {
  storeId: string;
  name: string;
  description: string;
  price: {
    discount: boolean;
    amount: number;
    discountPrice: number;
    currencyCode: string;
  };
  category: string;
  image: string;
  allergenInfo: string[];
  collectionSchedule: CollectionSchedule[];
}

const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const defaultProduct: ProductFormData = {
  storeId: '',
  name: '',
  description: '',
  price: {
    discount: false,
    amount: 0,
    discountPrice: 0,
    currencyCode: 'AED',
  },
  category: '',
  image: '',
  allergenInfo: [],
  collectionSchedule: [],
};

// Convert "Mon" → "Monday"
const convertDayToFull = (shortDay: string): string => {
  const dayMap: { [key: string]: string } = {
    Mon: 'Monday',
    Tue: 'Tuesday',
    Wed: 'Wednesday',
    Thu: 'Thursday',
    Fri: 'Friday',
    Sat: 'Saturday',
    Sun: 'Sunday',
  };
  return dayMap[shortDay] || shortDay;
};

export default function ProductEditor() {
  const [product, setProduct] = useState<ProductFormData>(defaultProduct);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const storeId = useSelector((state: any) => state.storeAuth.Store_id);
  const location = useLocation();
  const { bagId } = location.state || {};

  const toggleSidebar = () => setSidebarExpanded(!sidebarExpanded);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      price: {
        ...prev.price,
        [name]: type === 'checkbox' ? checked : parseFloat(value),
      },
    }));
  };

  const toggleCollectionDay = (day: string) => {
    setProduct((prev) => {
      const exists = prev.collectionSchedule.find((d) => d.day === day);
      if (exists) {
        return {
          ...prev,
          collectionSchedule: prev.collectionSchedule.filter((d) => d.day !== day),
        };
      } else {
        return {
          ...prev,
          collectionSchedule: [
            ...prev.collectionSchedule,
            { day, timeWindow: { start: '', end: '' }, quantityAvailable: 0 },
          ],
        };
      }
    });
  };

  const handleTimeWindowChange = (day: string, field: 'start' | 'end', value: string) => {
    setProduct((prev) => ({
      ...prev,
      collectionSchedule: prev.collectionSchedule.map((schedule) =>
        schedule.day === day ? {
          ...schedule,
          timeWindow: { ...schedule.timeWindow, [field]: value },
        } : schedule
      ),
    }));
  };

  const handleQuantityChange = (day: string, value: number) => {
    setProduct((prev) => ({
      ...prev,
      collectionSchedule: prev.collectionSchedule.map((schedule) =>
        schedule.day === day ? { ...schedule, quantityAvailable: value } : schedule
      ),
    }));
  };

  useEffect(() => {
    const fetchProduct = async () => {
        
      try {
        const apiurl = process.env.REACT_APP_API_URL;
        const response = await axios.get(
          `${apiurl}/api/v1/stores/${storeId}/product/${bagId}`,
          {
            withCredentials: true,
          }
        );

        console.log(response)

        if (response.data.success) {
          const product = response.data.data; // single product
          console.log(response)

          if (product) {
            const formattedProduct: ProductFormData = {
              storeId: product.storeId,
              name: product.name || '',
              description: product.description || '',
              price: {
                discount: product.price?.discount || false,
                amount: product.price?.amount || 0,
                discountPrice: product.price?.discountPrice || 0,
                currencyCode: product.price?.currencyCode || 'AED',
              },
              category: product.category || '',
              image: product.image || '',
              allergenInfo: product.allergenInfo || [],
              collectionSchedule: (product.collectionSchedule || []).map((schedule: any) => ({
                day: convertDayToFull(schedule.day),
                timeWindow: {
                  start: schedule.timeWindow?.start || '',
                  end: schedule.timeWindow?.end || '',
                },
                quantityAvailable: schedule.quantityAvailable || 0,
              })),
            };

            setProduct(formattedProduct);
            
          }
        } else {
          console.error("Error fetching product:", response.data.errorMessage);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };


    fetchProduct();
  }, [storeId, bagId]);

  return (
    <div className='product-editor-container-main'>
      <div className='header-product-edit'>
        <Header />
      </div>
      <div className="product-editor-container">
        <Sidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} onNavClick={() => {}} />

        <div className="product-form">
          <h2>Edit Surprise Bag (ID: {bagId})</h2>

          <div className="image-preview">
            <img
              src={product.image || 'https://via.placeholder.com/600x300?text=Product+Image'}
              alt="Product Preview"
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Name</label>
              <input name="name" value={product.name} onChange={handleChange} placeholder="Product Name" />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input name="category" value={product.category} onChange={handleChange} placeholder="Category" />
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" />
            </div>

            <div className="form-group">
              <label>Currency</label>
              <input name="currencyCode" value={product.price.currencyCode} onChange={handlePriceChange} />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input name="amount" type="number" value={product.price.amount} onChange={handlePriceChange} />
            </div>

            <div className="form-group">
              <label>Discount Price</label>
              <input name="discountPrice" type="number" value={product.price.discountPrice} onChange={handlePriceChange} />
            </div>

            <div className="form-group full-width checkbox-inline">
              <input type="checkbox" id="discount" name="discount" checked={product.price.discount}
                onChange={(e) =>
                  setProduct((prev) => ({
                    ...prev,
                    price: { ...prev.price, discount: e.target.checked },
                  }))
                } />
              <label htmlFor="discount">Discount Available</label>
            </div>

            <div className="form-group full-width">
              <h3>Collection Schedule</h3>
              <div className="days-grid">
                {daysOfWeek.map((day) => (
                  <label key={day}>
                    <input
                      type="checkbox"
                      checked={product.collectionSchedule.some((d) => d.day === day)}
                      onChange={() => toggleCollectionDay(day)}
                    />
                    {day}
                  </label>
                ))}
              </div>

              {product.collectionSchedule.map(({ day, timeWindow, quantityAvailable }) => (
                <div key={day} className="day-schedule">
                  <h4>{day}</h4>
                  <div className="day-inputs">
                    <input
                      type="time"
                      value={timeWindow.start}
                      onChange={(e) => handleTimeWindowChange(day, 'start', e.target.value)}
                    />
                    <input
                      type="time"
                      value={timeWindow.end}
                      onChange={(e) => handleTimeWindowChange(day, 'end', e.target.value)}
                    />
                    <input
                      type="number"
                      value={quantityAvailable}
                      onChange={(e) => handleQuantityChange(day, parseInt(e.target.value))}
                      placeholder="Qty"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="save-button">Save Product</button>
        </div>
      </div>
    </div>
  );
}
