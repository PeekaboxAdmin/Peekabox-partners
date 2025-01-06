import React from 'react';
import SurpriseBagForm, { SurpriseBagData } from '../SurpriseBag/SurpriseBagForm';
import Button from '../../../Components/Button/Button';
import Input from '../../../Components/Input/Input';

export interface BranchData {
  branchName: string;
  managerName: string;
  managerEmail: string;
  password: string;
  phone: string;
  address: string;
  description?: string;
  storeType: string;
  surpriseBags: SurpriseBagData[];
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
        {/* Row 1: Branch Name and Manager Name */}
        <div className="flex flex-wrap gap-4">
          <Input
            type="text"
            placeholder="Branch Name"
            value={branch.branchName}
            onChange={(e) => onBranchChange('branchName', e.target.value)}
            required
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-grey-500"
          />
          <Input
            type="text"
            placeholder="Manager's Name"
            value={branch.managerName}
            onChange={(e) => onBranchChange('managerName', e.target.value)}
            required
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-grey-500"
          />
        </div>

        {/* Row 2: Manager Email and Password */}
        <div className="flex flex-wrap gap-4">
          <Input
            type="email"
            placeholder="Manager's Email"
            value={branch.managerEmail}
            onChange={(e) => onBranchChange('managerEmail', e.target.value)}
            required
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-grey-500"
          />
          <Input
            type="password"
            placeholder="Password"
            value={branch.password}
            onChange={(e) => onBranchChange('password', e.target.value)}
            required
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-grey-500"
          />
        </div>

        {/* Row 3: Branch Phone and Address */}
        <div className="flex flex-wrap gap-4">
          <Input
            type="text"
            placeholder="Branch Phone Number"
            value={branch.phone}
            onChange={(e) => onBranchChange('phone', e.target.value)}
            required
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-grey-500"
          />
          <Input
            type="text"
            placeholder="Branch Address"
            value={branch.address}
            onChange={(e) => onBranchChange('address', e.target.value)}
            required
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-grey-500"
          />
        </div>

        {/* Row 4: Description */}
        <textarea
          placeholder="Description (optional)"
          value={branch.description}
          onChange={(e) => onBranchChange('description', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-grey-500"
        />

        {/* Row 5: Store Type */}
        <select
          value={branch.storeType}
          onChange={(e) => onBranchChange('storeType', e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-grey-500"
        >
          <option value="">Select Store Type</option>
          {storeTypes.map((type, i) => (
            <option key={i} value={type.toLowerCase()}>{type}</option>
          ))}
        </select>

        {/* Surprise Bags Section */}
        <h4 className="mt-4 text-lg font-medium">Surprise Bags</h4>
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
          className="mt-4 bg-pinkCustom text-white py-2 px-4 rounded-md focus:outline-none"
          type="button"
          onClick={addSurpriseBag}
        />
      </div>
    )}
  </div>
);

export default BranchDetails;
