import React, { useEffect, useState } from 'react';
import '../common/Pagination.css';
import { Link } from "react-router-dom";

export default function Pagination({ totalItems, itemsPerPage, pageCount, currentPage, onPageChange, start }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [noPrev, setNoPrev] = useState(true);
    const [noNext, setNoNext] = useState(true);

    useEffect(() => {
        if (start > 1) {
            setNoPrev(false);
        } else {
            setNoPrev(true);
        }

        if (start + pageCount - 1 < totalItems) {
            setNoNext(false);
        } else {
            setNoNext(true);
        }
    }, [start, totalItems, pageCount]);

    const handlePageChange = (page) => {
        onPageChange(page);
    };

    return (
        <div>
            <ul>
                <li className={`${noPrev && 'invisible'}`}>
                    <Link to={`?page=${currentPage - 1}`} onClick={() => handlePageChange(currentPage - 1)}>이전</Link>
                </li>
                {[...Array(pageCount)].map((_, i) => {
                    const pageNumber = start + i;
                    return pageNumber <= totalPages ? (
                        <li key={pageNumber}>
                            <Link
                                className={`${currentPage === pageNumber && 'active'}`}
                                to={`?page=${pageNumber}`}
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                {pageNumber}
                            </Link>
                        </li>
                    ) : null;
                })}
                <li className={`${noNext && 'invisible'}`}>
                    <Link to={`?page=${currentPage + 1}`} onClick={() => handlePageChange(currentPage + 1)}>다음</Link>
                </li>
            </ul>
        </div>
    );
}