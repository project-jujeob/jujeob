import React, {useEffect, useState} from 'react';
import axios from "axios";
import Pagination from "../common/Pagination";

const PAGE_SIZE = 10;

const OrderListByAdmin = () => {
    const [totalOrder, setTotalOrder] = useState(0);
    const [checkOrderList, setCheckOrderList] = useState([]);
    const [selectedSearchType, setSelectedSearchType] = useState('all');
    const [keyword, setKeyword] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    function formatPrice(value) {
        return value.toLocaleString('ko-KR');
    }



    useEffect(() => {
        axios.get('/api/admin/orderListForAdmin')
            .then((response) => {
                setCheckOrderList(response.data);
                setTotalOrder(response.data.length);
                setTotalPages(Math.ceil(setTotalOrder / PAGE_SIZE));
            }).catch((error) => {
                console.log('주문 전체 내역 가져오기 실패', error);
        })
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        loadProductList();
    }, [currentPage]);

    const loadProductList = () => {
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        axios.get('/api/admin/orderListForAdmin')
            .then((response) => {
                setCheckOrderList(response.data.slice(startIndex, endIndex));
            }).catch((error) => {
            console.log('주문 전체 내역 가져오기 실패', error);
        });
    };


    const setSearchType = (value) => {
        setSelectedSearchType(value);
    };

    const setSearchKeyword = (value) => {
        setKeyword(value);
    };

    const handleSearch = () => {
        axios.post('/api/admin/orderListBySearchOption',
            { selectedSearchType, keyword })
            .then((response) => {
                setCheckOrderList(response.data);
            }).catch((error) => {
            console.log('검색 주문 내역 가져오기 실패', error);
        });
    }

    return (
        <>
            <div className="OrderListByAdmin">
                <div className="OrderListByAdminHeader">
                    <div className="OrderListByAdminHeader">
                        <div className="OrderListSearch">
                            <select onChange={e => setSearchType(e.target.value)}>
                                <option value="all">전체</option>
                                <option value="orderId">주문번호</option>
                                <option value="memberName">주문자</option>
                                <option value="memberId">회원 ID</option>
                            </select>
                            <input
                                type="text"
                                placeholder="검색어를 입력해주세요"
                                onChange={e => setSearchKeyword(e.target.value)}
                            />
                            <button onClick={handleSearch}>검 색</button>
                        </div>
                    </div>
                </div>
                <div className="OrderListByAdminContent">
                    <table>
                        <thead>
                        <tr>
                            <th>주문번호</th>
                            <th>주문일자</th>
                            <th>주문자 ID</th>
                            <th>주문자</th>
                            <th>전화번호</th>
                            <th>배송지</th>
                            <th>주문 상품 목록</th>
                            <th>상품 수량</th>
                            <th>총 수량</th>
                            <th>주문합계</th>
                            <th>주문상태</th>
                            <th>결제수단</th>
                        </tr>
                        </thead>
                        <tbody>
                        {checkOrderList.map((order, index) => (
                            <tr key={index}>
                                <td>{order.orderId}</td>
                                <td>{formatDate(order.createdAt)}</td>
                                <td>{order.userId}</td>
                                <td>{order.name}</td>
                                <td className="OrderListPhone" title={order.phone}>{order.phone}</td>
                                <td className="OrderListAddress" title={order.address}>{order.address}</td>
                                <td>
                                    {order.products.map((product, idx) => (
                                        <div className="OrderListProductName" key={idx} title={product.productName}>{product.productName}</div>
                                    ))}
                                </td>
                                <td>
                                    {order.products.map((product, idx) => (
                                        <div key={idx}>{product.quantity}</div>
                                    ))}
                                </td>
                                <td>{order.quantity}</td>
                                <td>{formatPrice(order.totalPrice)}원</td>
                                <td>{order.orderStatus === 'Y' ? '주문 완료' : '주문 취소'}</td>
                                <td>{order.paymentMethod}</td>
                            </tr>
                        ))}
                        <tr>
                            <th colSpan={2}>총 건수</th>
                            <th>{checkOrderList.length}건</th>
                            <th colSpan={3}>주문 총 합계</th>
                            <th colSpan={2}>{formatPrice(checkOrderList.reduce((acc, order) => acc + order.totalPrice, 0))}원</th>
                            <th>이체 합계</th>
                            <th>
                                {formatPrice(checkOrderList.filter(order => order.paymentMethod === 'BANK').reduce((acc, order) => acc + order.totalPrice, 0))}원
                            </th>
                            <th>카드 합계</th>
                            <th>
                                {formatPrice(checkOrderList.filter(order => order.paymentMethod === 'CARD').reduce((acc, order) => acc + order.totalPrice, 0))}원
                            </th>

                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Pagination
                totalItems={totalOrder}
                itemsPerPage={PAGE_SIZE}
                pageCount={5}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>
    );
};

export default OrderListByAdmin;