import React, { useEffect, useState } from 'react';
import './Pagination.css';
import { Link } from "react-router-dom";

export default function Pagination({ totalItems, itemsPerPage, pageCount, currentPage, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [start, setStart] = useState(1); // start 상태 추가 및 useState로 관리

    useEffect(() => {
        // 현재 페이지를 기준으로 start 값을 변경
        const newStart = Math.max(1, currentPage - Math.floor(pageCount / 2));
        setStart(newStart);
    }, [currentPage, pageCount]);

    const handlePageChange = (page) => {
        onPageChange(page);
    };

    return (
        <div className="wrapper">
            <ul className="paginationList">
                {currentPage > 1 && (
                    <li className="move">
                        <Link to={`?page=1`} className="link" onClick={() => handlePageChange(1)}>
                            <span>{'<<'}</span>
                        </Link>
                    </li>
                )}
                {start > 1 && (
                    <li className="move">
                        <Link to={`?page=${currentPage - 1}`} className="link" onClick={() => handlePageChange(currentPage - 1)}>
                            <span>{'<'}</span>
                        </Link>
                    </li>
                )}
                {[...Array(pageCount)].map((_, i) => {
                    const pageNumber = start + i;
                    return pageNumber <= totalPages ? (
                        <li key={pageNumber} className="page">
                            <Link
                                className={`link ${currentPage === pageNumber && 'active'}`}
                                to={`?page=${pageNumber}`}
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                <button className="pageNumber">{pageNumber}</button>
                            </Link>
                        </li>
                    ) : null;
                })}
                {start + pageCount - 1 < totalPages && (
                    <li className="move">
                        <Link to={`?page=${currentPage + 1}`} className="link"
                              onClick={() => handlePageChange(currentPage + 1)}>
                            <span>{'>'}</span>
                        </Link>
                    </li>
                )}
                {currentPage < totalPages && (
                    <li className="move">
                        <Link to={`?page=${totalPages}`} className="link"
                              onClick={() => handlePageChange(totalPages)}>
                            <span>{'>>'}</span>
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
}
