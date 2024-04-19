import {createContext, useContext, useState} from "react";

const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const paginationState = {
        currentPage,
        totalPages,
        onPageChange,
        setTotalPages
    };

    return (
        <PaginationContext.Provider value={paginationState}>
            {children}
        </PaginationContext.Provider>
    );
};

export const usePagination = () => useContext(PaginationContext);