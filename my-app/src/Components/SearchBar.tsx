// src/components/ImageAndLogo.tsx
import React from 'react';

const SearchBar: React.FC = () => {
    return (
      <div className="search-bar">
        <div className="search-input-wrapper">
          <span className="search-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m2.662-4.907a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Enter your store name"
            className="search-input"
          />
        </div>
      </div>
    );
  };
export default SearchBar;