import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-between items-center mt-4">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-blue-600 hover:bg-blue-700 text-white transition'}`}
            >
                Previous
            </button>
            <span className="text-gray-700 font-medium">Page {currentPage} of {totalPages}</span>
            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className={`px-4 py-2 rounded ${currentPage === totalPages || totalPages === 0 ? 'bg-gray-200 text-gray-500' : 'bg-blue-600 hover:bg-blue-700 text-white transition'}`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
