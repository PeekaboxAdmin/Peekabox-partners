
import React from 'react';
import './Image.css';


interface ImageProps {
  imageSrc: string;  
  altText?: string;  
  className?: string;  
}

const Image: React.FC<ImageProps> = ({ 
  imageSrc, 
  altText = "screenshot",  
  className = "screenshot" 
}) => {
    return (
        <div className="left-image-container">
          <img 
            src={imageSrc}
            alt={altText} 
            className={className}
          />
        </div>
    );
};

export default Image;