import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

const BrandForm: React.FC<{ onNext: (brand: BrandData) => void }> = ({ onNext }) => {
  const navigate = useNavigate();


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
    navigate('/brand-created');
    
    
    
  };


  const handleTotalStore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(0, Number(e.target.value));
    setTotalStores(newValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Brand</h2>
      <label>Brand Name</label>
      <input
        type="text"
        placeholder="Brand Name"
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
        required
      />
      <label>Brand/Operations Manager Email</label>
      <input
        type="email"
        placeholder="Brand/Operations Manager Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>Brand/Operations Manager Number</label>
      <input
        type="text"
        placeholder="Brand/Operations Manager Number"
        value={businessRegNum}
        onChange={(e) => setBusinessRegNum(e.target.value)}
      />
      <label>Brand Logo</label>
      <input
        type="file"
        onChange={handleFileChange(setLogo, 'logo')}
      />
      <label>Brand Banner</label>
      <input
        type="file"
        onChange={handleFileChange(setBanner, 'banner')}
      />
      <textarea
        placeholder="Brand Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>HQ Location</label>
      <input
        type="text"
        placeholder="HQ Location"
        value={hqLocation}
        onChange={(e) => setHqLocation(e.target.value)}
        required
      />
      <label>Total Number of Stores (Dubai only)</label>
      <input
        type="number"
        placeholder="e.g., 10"
        value={totalStores}
        onChange={handleTotalStore}
        onKeyDown={(e) => e.key === '-' && e.preventDefault()}
        required
      />
      <button type="submit">Add Brand</button>
    </form>
  );
};

export default BrandForm;