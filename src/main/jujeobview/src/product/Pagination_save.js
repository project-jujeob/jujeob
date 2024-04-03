// // Pagination.js
//
// import React from 'react';
// import './Pagination.css';
// const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
//     // 전체 페이지 수 계산
//     const totalPages = Math.ceil(totalItems / itemsPerPage);
//
//
//     // 페이지 변경 핸들러
//     const handlePageChange = (pageNumber) => {
//         onPageChange(pageNumber);
//     };
//
//     return (
//         <div>
//             {/* 페이지네이션 버튼들 */}
//             <div className="wrapper">
//                 {Array.from({ length: totalPages }).map((_, index) => (
//                     <button
//                         key={index}
//                         onClick={() => handlePageChange(index + 1)}
//                         disabled={currentPage === index + 1}
//                     >
//                         {index + 1}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default Pagination;
