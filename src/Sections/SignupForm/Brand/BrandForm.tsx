import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Triangle from "../../../Components/Triangle/Triangle";
import HeaderBar from "../../../Components/HeaderBar/HeaderBar";
import Button from "../../../Components/Button/Button";
import Indicators from "../../../Components/indicators/indicators";


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
    return storedValue ? Number(storedValue) : 0;
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
       <div className="space-y-4">
    <Triangle>
      <HeaderBar>
       Create a Brand
      </HeaderBar>

      <div className="max-w-4xl mx-auto p-8">
  <form onSubmit={handleSubmit}>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* Brand Name */}
      <div>
        <label htmlFor="brandName" className="block text-sm font-medium text-pinkCustom">Brand Name</label>
        <input
          id="brandName"
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          placeholder="Enter brand name"
          className="mt-1 block w-full sm:w-3/4 h-8 px-3 py-1 text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-pinkCustom">Brand/Operations Manager Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter manager email"
          className="mt-1 block w-full sm:w-3/4 h-8 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      {/* Business Registration Number */}
      <div>
        <label htmlFor="businessRegNum" className="block text-sm font-medium text-pinkCustom">Business Registration Number</label>
        <input
          id="businessRegNum"
          type="text"
          value={businessRegNum}
          onChange={(e) => setBusinessRegNum(e.target.value)}
          placeholder="Enter registration number"
          className="mt-1 block w-full sm:w-3/4 h-8 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      {/* Banner */}
      <div>
        <label htmlFor="banner" className="block text-sm font-medium text-pinkCustom">Brand Banner</label>
        <input
          id="banner"
          type="file"
          onChange={handleFileChange(setBanner, "banner")}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-pinkCustom">Brand Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter brand description"
          className="mt-1 block w-full sm:w-3/4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      {/* Logo */}
      <div>
        <label htmlFor="logo" className="block text-sm font-medium text-pinkCustom">Brand Logo</label>
        <input
          id="logo"
          type="file"
          onChange={handleFileChange(setLogo, "logo")}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
      </div>

      {/* HQ Location */}
      <div>
        <label htmlFor="hqLocation" className="block text-sm font-medium text-pinkCustom">HQ Location</label>
        <input
          id="hqLocation"
          type="text"
          value={hqLocation}
          onChange={(e) => setHqLocation(e.target.value)}
          placeholder="Enter HQ location"
          className="mt-1 block w-full sm:w-3/4 h-8 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      {/* Total Stores */}
      <div>
        <label htmlFor="totalStores" className="block text-sm font-medium text-pinkCustom">Total Number of Stores (Dubai only)</label>
        <input
          id="totalStores"
          type="number"
          value={totalStores}
          onChange={handleTotalStore}
          placeholder="e.g., 10"
          className="mt-1 block w-full sm:w-3/4 h-8 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>
    </div>

    {/* Buttons */}
    <div className="flex justify-end space-x-4 mt-4 px-4 pb-4">



     {/** */}

     <Button  label="Discard"

        onClick={handleDiscard}
            className="px-4 py-2 bg-white text-pinkCustom border-2 border-pinkCustom rounded-md  transition duration-200"



          />

          <Button  label="Next"

            type='submit'
          className="px-6 py-3 bg-pinkCustom text-white border-2 border-pinkCustom rounded-md  transition duration-200"

        />

    </div>


  </form>
</div>

    </Triangle>
    </div>
  );
};

export default BrandForm1;
