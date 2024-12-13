import React from "react";
import Button from "../Button/Button";

// Pagination props type definition
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page); 
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2">
    
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-DarkGreen text-white rounded disabled:opacity-50"
      >
        &#8592; 
      </button>

     
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-sm border-0 ${
            page === currentPage
              ? "bg-pinkCustom text-white"
              : "bg-pinkCustom text-black"
          }`}
        >
          {page}
        </button>
      ))}

      
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-DarkGreen text-white rounded disabled:opacity-50"
      >
        &#8594;
      </button>
    </div>
  );
};

export default Pagination;
