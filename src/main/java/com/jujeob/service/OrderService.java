package com.jujeob.service;

import com.jujeob.dto.OrderDeliveriesDto;
import com.jujeob.dto.OrderItemDto;
import com.jujeob.entity.CustomerOrder;
import com.jujeob.entity.OrderItem;
import com.jujeob.entity.Stock;
import com.jujeob.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderItemRepository orderItemRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    StockRepository stockRepository;

    @Autowired
    CartRepository cartRepository;
    /*

        @Transactional
        public ResponseEntity<String> createOrder(CustomerOrder customerOrder) {
            try {
                System.out.println("customerOrder:" + customerOrder);

                // CustomerOrder 객체를 저장
                CustomerOrder savedCustomerOrder = orderRepository.save(customerOrder);

                // 주문 상품 정보
                List<OrderItem> orderItems = customerOrder.getOrderItems();
                System.out.println("orderItems:" + orderItems);

                // Cart 테이블에서 삭제할 상품 번호와 회원 번호를 담을 리스트 생성
                List<Integer> productNos = new ArrayList<>();
                Long memberNo = customerOrder.getMemberNo();

                for (OrderItem orderItem : orderItems) {
                    orderItem.setCustomerOrder(savedCustomerOrder);
                    orderItemRepository.save(orderItem);

                    // Cart 테이블에서 삭제할 상품 번호 추가
                    productNos.add(orderItem.getProductNo());

                    // 재고 업데이트
                    Stock stock = stockRepository.findByProductNo(orderItem.getProductNo());
                    System.out.println("stock = " + stock);
                    if (stock != null) {
                        boolean stockUpdated = stock.decreaseStock(orderItem.getQuantity());
                        if (!stockUpdated) {
                            // 재고가 부족한 경우 롤백하고 오류 반환
                            throw new RuntimeException("재고가 부족합니다.");
                        }
                    } else {
                        // 해당 상품의 재고 정보가 없는 경우 롤백하고 오류 반환
                        throw new RuntimeException("재고 정보를 찾을 수 없습니다.");
                    }
                }

                System.out.println("프넘productNos:" + productNos);
                System.out.println("멤넘memberNo:" + memberNo);

                //cartRepository.removeByProductNosAndMemberNo(productNos, memberNo);
                cartRepository.deleteAllByMemberNoAndProductNoIn(memberNo, productNos);
                // 확인용 로그 추가
                System.out.println("deleteAllByMemberNoAndProductNoIn 호출됨 - memberNo: " + memberNo + ", productNos: " + productNos);

                return ResponseEntity.ok("주문이 완료되었습니다.");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("주문 처리 중 오류가 발생했습니다.");
            }
        }
    */
    @Transactional
    public ResponseEntity<String> createOrder(CustomerOrder customerOrder) {
        try {
            // 주문 상품 정보
            List<OrderItem> orderItems = customerOrder.getOrderItems();

            // 재고 확인 및 주문 처리
            for (OrderItem orderItem : orderItems) {
                // 재고 조회
                Stock stock = stockRepository.findByProductNo(orderItem.getProductNo());
                if (stock == null || stock.getQuantity() < orderItem.getQuantity()) {
                    // 재고 부족한 경우 예외 처리
                    int remainingQuantity = stock != null ? stock.getQuantity() : 0;
                    throw new RuntimeException("재고가 부족합니다.(남은 수량:"+remainingQuantity+")");
                }
            }

            // 모든 상품의 재고가 충분한 경우 주문 생성 및 재고 감소
            CustomerOrder savedCustomerOrder = orderRepository.save(customerOrder);
            for (OrderItem orderItem : orderItems) {
                orderItem.setCustomerOrder(savedCustomerOrder);
                orderItemRepository.save(orderItem);

                // 재고 감소
                Stock stock = stockRepository.findByProductNo(orderItem.getProductNo());
                stock.decreaseStock(orderItem.getQuantity());
            }

            // 장바구니에서 해당 상품 삭제
            Long memberNo = customerOrder.getMemberNo();
            List<Integer> productNos = orderItems.stream()
                    .map(OrderItem::getProductNo)
                    .collect(Collectors.toList());
            cartRepository.deleteAllByMemberNoAndProductNoIn(memberNo, productNos);

            return ResponseEntity.ok("주문이 완료되었습니다.");
        } catch (RuntimeException e) {
            // 예외 발생 시 주문 롤백 및 오류 반환
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            // 그 외의 예외 발생 시 오류 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("주문 처리 중 오류가 발생했습니다.");
        }
    }

    public List<OrderDeliveriesDto> getAllOrderDeliveriesWithItems(Long memberNo) {
        List<CustomerOrder> customerOrders = orderRepository.findCustomerOrdersByMemberNoOrderByCreatedAtDesc(memberNo);
        List<OrderDeliveriesDto> orderDeliveriesDtos = new ArrayList<>();

        for(CustomerOrder customerOrder : customerOrders){
            //List<OrderItem> items = orderItemRepository.findByOrderId(customerOrder.getOrderId());
            List<OrderItem> orderItems = orderItemRepository.findByCustomerOrder(customerOrder);
            OrderDeliveriesDto orderDeliveriesDto = convertToDto(customerOrder, orderItems);
            orderDeliveriesDtos.add(orderDeliveriesDto);
        }
        return orderDeliveriesDtos;
    }

    private OrderDeliveriesDto convertToDto(CustomerOrder customerOrder, List<OrderItem> orderItems) {
        OrderDeliveriesDto dto = new OrderDeliveriesDto();
        dto.setOrderId(customerOrder.getOrderId());
        dto.setAddress(customerOrder.getAddress());
        dto.setMemberName(customerOrder.getMemberName());
        dto.setMemberPhone(customerOrder.getMemberPhone());
        dto.setMemberEmail(customerOrder.getMemberEmail());
        dto.setOrderStatus(customerOrder.getOrderStatus());
        dto.setPaymentMethod(customerOrder.getPaymentMethod());
        dto.setTotalPrice(customerOrder.getTotalPrice());
        dto.setDeliveryRequest(customerOrder.getDeliveryRequest());
        dto.setCreatedAt(customerOrder.getCreatedAt());

        List<OrderItemDto> orderItemDtos = new ArrayList<>();
        for (OrderItem orderItem : orderItems) {
            OrderItemDto itemDto = new OrderItemDto();
            itemDto.setProductNo(orderItem.getProductNo());
            itemDto.setQuantity(orderItem.getQuantity());
            itemDto.setPrice(orderItem.getPrice());
            String img = productRepository.findImgByProductNo(orderItem.getProductNo());
            itemDto.setImg(img);
            String productName = productRepository.findNameByProductNo(orderItem.getProductNo());
            itemDto.setProductName(productName);
            double alcohol = productRepository.findAlcoholByProductNo(orderItem.getProductNo());
            itemDto.setAlcohol(alcohol);
            String volume = productRepository.findVolumeByProductNo(orderItem.getProductNo());
            itemDto.setVolume(volume);
            orderItemDtos.add(itemDto);
        }
        dto.setOrderItems(orderItemDtos);

        return dto;
    }
}