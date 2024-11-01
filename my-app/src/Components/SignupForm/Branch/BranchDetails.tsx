// BranchDetails.tsx
import React from 'react';
import SurpriseBagForm, { SurpriseBagData } from '../SurpriseBag/SurpriseBagForm';

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
  <div className="branch-section">
    <h3 onClick={toggleBranchExpansion} style={{ cursor: 'pointer' }}>
      Branch {index + 1} {expanded ? '▲' : '▼'}
    </h3>
    {expanded && (
      <div className="branch-details">
        <input
          type="text"
          placeholder="Branch Name"
          value={branch.branchName}
          onChange={(e) => onBranchChange('branchName', e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Manager's Name"
          value={branch.managerName}
          onChange={(e) => onBranchChange('managerName', e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Manager's Email"
          value={branch.managerEmail}
          onChange={(e) => onBranchChange('managerEmail', e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={branch.password}
          onChange={(e) => onBranchChange('password', e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Branch Phone Number"
          value={branch.phone}
          onChange={(e) => onBranchChange('phone', e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Branch Address"
          value={branch.address}
          onChange={(e) => onBranchChange('address', e.target.value)}
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={branch.description}
          onChange={(e) => onBranchChange('description', e.target.value)}
        />
        <select
          value={branch.storeType}
          onChange={(e) => onBranchChange('storeType', e.target.value)}
          required
        >
          <option value="">Select Store Type</option>
          {storeTypes.map((type, i) => (
            <option key={i} value={type.toLowerCase()}>{type}</option>
          ))}
        </select>

        <h4>Surprise Bags</h4>
        {branch.surpriseBags.map((bag, bagIndex) => (
          <SurpriseBagForm
            key={bagIndex}
            bag={bag}
            onChange={(field, value) => onSurpriseBagChange(bagIndex, field, value)}
            onDelete={() => deleteSurpriseBag(bagIndex)}
          />
        ))}
        <button type="button" onClick={addSurpriseBag}>Add Surprise Bag</button>
      </div>
    )}
  </div>
);

export default BranchDetails;
