import React, { createContext, useContext, useState } from 'react';

const PaginationContext = createContext();

export const usePagination = () => useContext(PaginationContext);

export const PaginationProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const setTotalItemCount = (count) => {
        setTotalItems(count);
    };

    return (
        <PaginationContext.Provider
            value={{
                currentPage,
                handlePageChange,
                totalItems,
                setTotalItemCount
            }}
        >
            {children}
        </PaginationContext.Provider>
    );
};