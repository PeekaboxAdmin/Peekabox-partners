import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Triangle from "../../../Components/Triangle/Triangle";
import HeaderBar from "../../../Components/HeaderBar/HeaderBar";
import Button from "../../../Components/Button/Button";
import Indicators from "../../../Components/indicators/indicators";
import './BrandForm.css';

export interface BrandData {
  brandName: string;
  email: string;
  businessRegNum?: string;
  logo: File | null;
  banner: File | null;
  description: string;
  hqLocation: string;
  totalStores: number;
}

const BrandForm1: React.FC<{ onNext: (brand: BrandData) => void }> = ({ onNext }) => {
  const Navigate = useNavigate();

  const [brandName, setBrandName] = useState(() => localStorage.getItem('brandName') || '');
  const [email, setEmail] = useState(() => localStorage.getItem('email') || '');
  const [businessRegNum, setBusinessRegNum] = useState(() => localStorage.getItem('businessRegNum') || '');
  const [logo, setLogo] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [description, setDescription] = useState(() => localStorage.getItem('description') || '');
  const [hqLocation, setHqLocation] = useState(() => localStorage.getItem('hqLocation') || '');
  const [totalStores, setTotalStores] = useState(() => {
    const storedValue = localStorage.getItem('totalStores');
    return storedValue ? Number(storedValue) : 1;
  });

  useEffect(() => {
    const logoUrl = localStorage.getItem('logo');
    const bannerUrl = localStorage.getItem('banner');
    if (logoUrl) setLogo(new File([logoUrl], 'logo'));
    if (bannerUrl) setBanner(new File([bannerUrl], 'banner'));
  }, []);

  useEffect(() => {
    localStorage.setItem('brandName', brandName);
    localStorage.setItem('email', email);
    localStorage.setItem('businessRegNum', businessRegNum || '');
    localStorage.setItem('description', description);
    localStorage.setItem('hqLocation', hqLocation);
    localStorage.setItem('totalStores', totalStores.toString());
  }, [brandName, email, businessRegNum, description, hqLocation, totalStores]);



  const handleFileChange = (setFile: React.Dispatch<React.SetStateAction<File | null>>, storageKey: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files ? e.target.files[0] : null;
      if (file) {
        setFile(file);
        localStorage.setItem(storageKey, URL.createObjectURL(file));
      }
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const brandData: BrandData = { brandName, email, businessRegNum, logo, banner, description, hqLocation, totalStores };
    console.log('Brand Data:', brandData);
    onNext(brandData);
    Navigate('/signup/brand-created');
  };

  const handleDiscard = () => {

    setBrandName('');
    setEmail('');
    setBusinessRegNum('');
    setLogo(null);
    setBanner(null);
    setDescription('');
    setHqLocation('');
    setTotalStores(0);


    localStorage.removeItem('brandName');
    localStorage.removeItem('email');
    localStorage.removeItem('businessRegNum');
    localStorage.removeItem('description');
    localStorage.removeItem('hqLocation');
    localStorage.removeItem('totalStores');


    Navigate('/signup/Created-Account');
  };


  const handleTotalStore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(0, Number(e.target.value));
    setTotalStores(newValue);
  };

  return (
    <div className="brand-form-container">
      <Triangle>
        <HeaderBar>Create a Brand</HeaderBar>

        <form onSubmit={handleSubmit}>
          <div className="brand-form-body">
            <div>
              <label htmlFor="brandName" className="brand-form-label">Brand Name</label>
              <input
                id="brandName"
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Enter brand name"
                className="brand-form-input"
              />
            </div>

            <div>
              <label htmlFor="email" className="brand-form-label">Brand/Operations Manager Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter manager email"
                className="brand-form-input"
              />
            </div>

            <div>
              <label htmlFor="businessRegNum" className="brand-form-label">Business Registration Number</label>
              <input
                id="businessRegNum"
                type="text"
                value={businessRegNum}
                onChange={(e) => setBusinessRegNum(e.target.value)}
                placeholder="Enter registration number"
                className="brand-form-input"
              />
            </div>

            <div>
              <label htmlFor="banner" className="brand-form-label">Brand Banner</label>
              <input
                id="banner"
                type="file"
                onChange={handleFileChange(setBanner, "banner")}
                className="brand-form-file"
              />
            </div>

            <div>
              <label htmlFor="description" className="brand-form-label">Brand Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter brand description"
                className="brand-form-textarea"
              />
            </div>

            <div>
              <label htmlFor="logo" className="brand-form-label">Brand Logo</label>
              <input
                id="logo"
                type="file"
                onChange={handleFileChange(setLogo, "logo")}
                className="brand-form-file"
              />
            </div>

            <div>
              <label htmlFor="hqLocation" className="brand-form-label">HQ Location</label>
              <input
                id="hqLocation"
                type="text"
                value={hqLocation}
                onChange={(e) => setHqLocation(e.target.value)}
                placeholder="Enter HQ location"
                className="brand-form-input"
              />
            </div>

            <div>
              <label htmlFor="totalStores" className="brand-form-label">Total Number of Stores (Dubai only)</label>
              <input
                id="totalStores"
                type="number"
                value={totalStores}
                onChange={handleTotalStore}
                placeholder="e.g., 10"
                className="brand-form-input"
              />
            </div>
          </div>

          <div className="brand-form-buttons">
            <Button
              label="Discard"
              onClick={handleDiscard}
              className="px-4 py-2 bg-white text-pinkCustom border-2 border-pinkCustom rounded-md transition duration-200"
            />
            <Button
              label="Next"
              type="submit"
              className="px-6 py-3 bg-pinkCustom text-white border-2 border-pinkCustom rounded-md transition duration-200"
            />
          </div>
        </form>
      </Triangle>
    </div>
  );  
};

export default BrandForm1;
