import React from 'react';
import SurpriseBagForm, { SurpriseBagData } from '../SurpriseBag/SurpriseBagForm';
import Button from '../../../Components/Button/Button';
import Input from '../../../Components/Input/Input';
import './BranchDetails.css';

export interface BranchData {
  branchName: string;
  managerName: string;
  managerEmail: string;
  password: string;
  phone: string;
  address: {
    street: string;
    area: string;
    city: string;
    country: string;
  };
  description?: string;
  storeType: string;
  surpriseBags: SurpriseBagData[];
  storeLogo?: File | null;
  operatingHours: {
    day: string;
    open: string;
    close: string;
  }[];

}

interface BranchDetailsProps {
  branch: BranchData;
  index: number;
  expanded: boolean;
  storeTypes: string[];
  onBranchChange: (field: keyof BranchData, value: any) => void;
  onSurpriseBagChange: (bagIndex: number, field: keyof SurpriseBagData, value: any) => void;
  addSurpriseBag: () => void;
  deleteSurpriseBag: (bagIndex: number) => void;
  toggleBranchExpansion: () => void;
}

const BranchDetails: React.FC<BranchDetailsProps> = ({
  branch,
  index,
  expanded,
  storeTypes,
  onBranchChange,
  onSurpriseBagChange,
  addSurpriseBag,
  deleteSurpriseBag,
  toggleBranchExpansion,
}) => (
  <div className="mb-6 p-4 border border-gray-300 rounded-lg shadow-sm">
    <h3
      onClick={toggleBranchExpansion}
      className="text-xl font-semibold text-black-600 cursor-pointer"
    >
      Branch {index + 1} {expanded ? '▲' : '▼'}
    </h3>

    {expanded && (
      <div className="mt-4 space-y-6">
      {/* Row 1: Branch Name & Store Logo */}
      <div className="flex flex-wrap gap-4">
        <Input
          type="text"
          placeholder="Branch Name"
          value={branch.branchName}
          onChange={(e) => onBranchChange('branchName', e.target.value)}
          required
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />
        <div className="input-container flex-1 p-2">
          <select
            value={branch.storeType}
            onChange={(e) => onBranchChange('storeType', e.target.value)}
            required
            className="input-field-branchDetails w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Store Type</option>
            {storeTypes.map((type, i) => (
              <option key={i} value={type.toLowerCase()}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 2: Phone & Manager Name */}
      <div className="flex flex-wrap gap-4">
        <Input
          type="text"
          placeholder="Branch Phone Number"
          value={branch.phone}
          onChange={(e) => onBranchChange('phone', e.target.value)}
          required
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />
        <Input
          type="text"
          placeholder="Manager's Name"
          value={branch.managerName}
          onChange={(e) => onBranchChange('managerName', e.target.value)}
          required
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />
      </div>
    
      {/* Row 3: Manager Email & Password */}
      <div className="flex flex-wrap gap-4">
        <Input
          type="email"
          placeholder="Manager's Email"
          value={branch.managerEmail}
          onChange={(e) => onBranchChange('managerEmail', e.target.value)}
          required
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />
        <Input
          type="password"
          placeholder="Password"
          value={branch.password}
          onChange={(e) => onBranchChange('password', e.target.value)}
          required
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />
      </div>
    
      {/* Row 4: Street & Area */}
      <div className="flex flex-wrap gap-4">
        <Input
          type="text"
          placeholder="Street"
          value={branch.address.street}
          onChange={(e) =>
            onBranchChange('address', {
              ...branch.address,
              street: e.target.value,
            })
          }
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />
        <Input
          type="text"
          placeholder="Area"
          value={branch.address.area}
          onChange={(e) =>
            onBranchChange('address', {
              ...branch.address,
              area: e.target.value,
            })
          }
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />
      </div>
    
      {/* Row 5: City & Country */}
      <div className="flex flex-wrap gap-4">
        <Input
          type="text"
          placeholder="City"
          value={branch.address.city}
          onChange={(e) =>
            onBranchChange('address', {
              ...branch.address,
              city: e.target.value,
            })
          }
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />
        <Input
          type="text"
          placeholder="Country"
          value={branch.address.country}
          onChange={(e) =>
            onBranchChange('address', {
              ...branch.address,
              country: e.target.value,
            })
          }
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />
      </div>
    
      {/* Row 6: Description */}
      <textarea
        placeholder="Description (optional)"
        value={branch.description}
        onChange={(e) => onBranchChange('description', e.target.value)}
        className="description-field w-full p-2 border border-gray-300 rounded-md"
      />
    
      {/* Row 7: Store Type */}
      <h4 className="mt-4 text-lg fontWeightChange">Store Logo</h4>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          onBranchChange('storeLogo', file);
        }}
        className="w-full p-2 border border-gray-300 rounded-md"
      />

      {/* Row 8: Operating Hours */}
      <h4 className="mt-4 text-lg fontWeightChange">Operating Hours</h4>
      {branch.operatingHours.map((hours, idx) => (
        <div key={idx} className="flex gap-4 items-center mb-2">
          <Input
            type="text"
            placeholder="Day"
            value={hours.day}
            onChange={(e) => {
              const updated = [...branch.operatingHours];
              updated[idx].day = e.target.value;
              onBranchChange('operatingHours', updated);
            }}
          />
          <Input
            type="time"
            placeholder="Open"
            value={hours.open}
            onChange={(e) => {
              const updated = [...branch.operatingHours];
              updated[idx].open = e.target.value;
              onBranchChange('operatingHours', updated);
            }}
          />
          <Input
            type="time"
            placeholder="Close"
            value={hours.close}
            onChange={(e) => {
              const updated = [...branch.operatingHours];
              updated[idx].close = e.target.value;
              onBranchChange('operatingHours', updated);
            }}
          />
        </div>
      ))}
      <Button
        label="Add Operating Hour"
        className="mt-4 bg-pinkCustom changeBorderColor text-white py-2 px-4 rounded-md"
        type="button"
        onClick={() =>
          onBranchChange('operatingHours', [
            ...branch.operatingHours,
            { day: '', open: '', close: '' },
          ])
        }
      />
    
      {/* Row 9: Surprise Bags */}
      <h4 className="mt-4 text-lg fontWeightChange">Surprise Bags</h4>
      {branch.surpriseBags.map((bag, bagIndex) => (
        <SurpriseBagForm
          key={bagIndex}
          bag={bag}
          onChange={(field, value) => onSurpriseBagChange(bagIndex, field, value)}
          onDelete={() => deleteSurpriseBag(bagIndex)}
        />
      ))}
    
      <Button
        label="Add Surprise Bag"
        className="mt-4 bg-pinkCustom changeBorderColor text-white py-2 px-4 rounded-md"
        type="button"
        onClick={addSurpriseBag}
      />
    </div>
    
    )}
  </div>
);

export default BranchDetails;
