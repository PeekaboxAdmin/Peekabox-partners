import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BranchDetails, { BranchData } from './BranchDetails';
import { SurpriseBagData } from '../SurpriseBag/SurpriseBagForm';

import Button from "../../../Components/Button/Button";
import Triangle from '../../../Components/Triangle/Triangle';
import HeaderBar from '../../../Components/HeaderBar/HeaderBar';

const storeTypes = [
  'Restaurant',
  'Cafe',
  'Buffet restaurant',
  'Takeaway restaurant',
  'Sushi restaurant',
  'Hotel',
  'Bakery',
  'Pastry shop',
  'Supermarket',
  'Beverage shop',
  'Butcher shop',
  'Fruit & vegetable store',
  'Other',
];

const BranchForm: React.FC<{ totalStores: number; onNext: (branches: BranchData[]) => void }> = ({ totalStores, onNext }) => {
  const navigate = useNavigate();

  const HandleBack=()=>{
    navigate('/signup/brandform')

}

const HandleNext=()=>{
  navigate('/')

}






  const [branches, setBranches] = useState<BranchData[]>(Array.from({ length: totalStores }, () => ({
    branchName: '',
    managerName: '',
    managerEmail: '',
    password: '',
    phone: '',
    address: '',
    description: '',
    storeType: '',
    surpriseBags: [],
  })));

  const [expandedBranches, setExpandedBranches] = useState<boolean[]>(Array(totalStores).fill(false));

  const handleBranchChange = (index: number, field: keyof BranchData, value: any) => {
    const updatedBranches = [...branches];
    updatedBranches[index] = { ...updatedBranches[index], [field]: value };
    setBranches(updatedBranches);
  };

  const handleSurpriseBagChange = (branchIndex: number, bagIndex: number, field: keyof SurpriseBagData, value: any) => {
    const updatedBranches = [...branches];
    const updatedBags = [...updatedBranches[branchIndex].surpriseBags];

    updatedBags[bagIndex] = { ...updatedBags[bagIndex], [field]: value };
    updatedBranches[branchIndex].surpriseBags = updatedBags;
    setBranches(updatedBranches);
  };

  const addSurpriseBag = (branchIndex: number) => {
    const updatedBranches = [...branches];
    updatedBranches[branchIndex].surpriseBags.push({
      name: '',
      category: '',
      description: '',
      price: 0,
      quantity: 0,
      CollectionDays: [],
      CollectionTime: {},
    });
    setBranches(updatedBranches);
  };

  const deleteSurpriseBag = (branchIndex: number, bagIndex: number) => {
    const updatedBranches = [...branches];
    updatedBranches[branchIndex].surpriseBags.splice(bagIndex, 1);
    setBranches(updatedBranches);
  };

  const toggleBranchExpansion = (index: number) => {
    setExpandedBranches((prev) =>
      prev.map((expanded, i) => (i === index ? !expanded : expanded))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Branches Data:', branches);
    onNext(branches);

    localStorage.removeItem('brandName');
    localStorage.removeItem('email');
    localStorage.removeItem('businessRegNum');
    localStorage.removeItem('logo');
    localStorage.removeItem('banner');
    localStorage.removeItem('description');
    localStorage.removeItem('hqLocation');
    localStorage.removeItem('totalStores');

    navigate('/signup/login');
  };

  return (
       <div className="space-y-6 px-4 sm:px-6 lg:px-8 mt-10">
    <Triangle>
      <form onSubmit={handleSubmit}>
        <div className="w-full flex justify-center">
          <div className="w-full max-w-4xl">
            <HeaderBar>
            Add Branches
            </HeaderBar>
          </div>
        </div>

        {branches.map((branch, index) => (
          <div key={index} className="mb-6">
            <BranchDetails
              branch={branch}
              index={index}
              expanded={expandedBranches[index]}
              storeTypes={storeTypes}
              onBranchChange={(field, value) => handleBranchChange(index, field, value)}
              onSurpriseBagChange={(bagIndex, field, value) => handleSurpriseBagChange(index, bagIndex, field, value)}
              addSurpriseBag={() => addSurpriseBag(index)}
              deleteSurpriseBag={(bagIndex) => deleteSurpriseBag(index, bagIndex)}
              toggleBranchExpansion={() => toggleBranchExpansion(index)}
            />
          </div>
        ))}

        <div className="flex justify-end space-x-4 mt-4 px-4 pb-4">
          <Button label="Back"
            className="px-4 py-2 bg-white text-pinkCustom border-2 border-pinkCustom rounded-md transition duration-200"
            onClick={HandleBack}/>

          <Button label="Submit & Join"
            className="px-6 py-3 bg-pinkCustom text-white border-2 border-pinkCustom rounded-md transition duration-200"
            type="submit"
            onClick={HandleNext} />
        </div>


      </form>
      </Triangle>
      </div>
  );
};

export default BranchForm;