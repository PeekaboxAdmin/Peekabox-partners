import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Triangle from "../Components/Triangle/Triangle";
import HeaderBar from "../Components/HeaderBar/HeaderBar";
import Button from "../Components/Button/Button";
import './ViewBranches.css'; // You'll need to create this CSS file

interface Branch {
  _id: string;
  name: string;
  description: string;
  managerName: string;
  address: {
    street: string;
    area: string;
    city: string;
    country: string;
  };
  contactDetails: {
    phone: {
      countryCode: string;
      number: string;
    };
    email: string;
  };
  image: string;
}

const ViewBranches: React.FC = () => {
  const navigate = useNavigate();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const brandIdFromRedux = useSelector((state: any) => state.storeAuth.Brand_id);
  const [brandId, setBrandId] = useState<string | null>(brandIdFromRedux);

    useEffect(() => {
    if (!brandIdFromRedux) {
        const storedBrandId = localStorage.getItem('Brand_id');
        if (storedBrandId) {
        setBrandId(storedBrandId);
        }
    }
    }, [brandIdFromRedux]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.REACT_APP_API_URL;
        
        // Updated API endpoint to match backend route structure
        // The backend expects query parameters for pagination and sorting
        const response = await axios.get(
          `${apiUrl}/api/v1/brands/${brandId}/stores`, 
          {
            params: {
              page: 1,
              limit: 50,
              sort: 'desc'
            },
            withCredentials: true
          }
        );
        
        if (response.data && response.data.stores) {
          // Backend returns stores array inside a stores property
          setBranches(response.data.stores);
        } else if (response.data && response.data.data && response.data.data.stores) {
          // Or it might be nested in data.stores based on your API structure
          setBranches(response.data.data.stores);
        } else {
          setError('Unexpected response format from API');
          console.error('Unexpected API response:', response.data);
        }
      } catch (err: any) {
        console.error('Error fetching branches:', err);
        setError(err.response?.data?.message || 'Failed to load branches. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (brandId) {
      fetchBranches();
    } else {
      setError('Brand ID is required');
      setLoading(false);
    }
  }, [brandId]);

  const handleAddBranch = () => {
    navigate('/signup/branches');
  };

  const handleGoBack = () => {
    navigate('/signup/brand-created');
  };

  return (
    <div className="view-branches-container">
      <Triangle>
        <HeaderBar>All Branches</HeaderBar>

        <div className="view-branches-content">
          {loading ? (
            <p className="loading-text">Loading branches...</p>
          ) : error ? (
            <div className="error-container">
              <p className="error-text">{error}</p>
              <Button 
                label="Try Again" 
                onClick={() => window.location.reload()} 
                className="retry-button"
              />
            </div>
          ) : branches.length === 0 ? (
            <div className="no-branches">
              <p>No branches found. Add your first branch to get started.</p>
              <Button
                label="Add Branch"
                onClick={handleAddBranch}
                className="px-4 py-2 bg-pinkCustom text-white border-2 border-pinkCustom rounded-md"
              />
            </div>
          ) : (
            <>
              <div className="branches-grid">
                {branches.map((branch) => (
                  <div className="branch-card" key={branch._id}>
                    <div className="branch-image">
                      <img src={branch.image || '/default-store.png'} alt={branch.name} />
                    </div>
                    <div className="branch-details">
                      <h3>{branch.name}</h3>
                      <p className="branch-description">{branch.description}</p>
                      <p className="branch-manager">Manager: {branch.managerName}</p>
                      <p className="branch-address">
                        {branch.address?.street || ''}, 
                        {branch.address?.area || ''}, 
                        {branch.address?.city || ''}
                      </p>
                      <p className="branch-contact">
                        {branch.contactDetails?.phone?.countryCode || ''} {branch.contactDetails?.phone?.number || ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="branches-actions">
                <Button
                  label="Add Another Branch"
                  onClick={handleAddBranch}
                  className="px-4 py-2 bg-pinkCustom text-white border-2 border-pinkCustom rounded-md mr-4"
                />
                <Button
                  label="Back"
                  onClick={handleGoBack}
                  className="px-4 py-2 bg-white text-pinkCustom border-2 border-pinkCustom rounded-md"
                />
              </div>
            </>
          )}
        </div>
      </Triangle>
    </div>
  );
};

export default ViewBranches;