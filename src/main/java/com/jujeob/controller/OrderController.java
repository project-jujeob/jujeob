package com.jujeob.controller;

import com.jujeob.entity.CustomerOrder;
import com.jujeob.entity.OrderItem;
import com.jujeob.entity.Stock;
import com.jujeob.repository.CartRepository;
import com.jujeob.repository.OrderItemRepository;
import com.jujeob.repository.OrderRepository;
import com.jujeob.repository.StockRepository;
import com.jujeob.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    OrderService orderService;


    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderItemRepository orderItemRepository;

    @Autowired
    CartRepository cartRepository;

    @Autowired
    StockRepository stockRepository;

    @Transactional
    @PostMapping("/customerOrder")
    public ResponseEntity<String> createOrder(@RequestBody CustomerOrder customerOrder) {
        try {

            System.out.println("customerOrder:"+customerOrder);
            // CustomerOrder 객체를 저장
            CustomerOrder savedCustomerOrder = orderRepository.save(customerOrder);

            // 주문 상품 정보
            List<OrderItem> orderItems = customerOrder.getOrderItems();
            System.out.println("orderItems:"+orderItems);

            // Cart 테이블에서 삭제할 상품 번호와 회원 번호를 담을 리스트 생성
            List<Integer> productNos = new ArrayList<>();
            Long userNo = customerOrder.getUserNo();

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

            System.out.println("프넘productNos:"+productNos);
            System.out.println("멤넘userNo:"+userNo);

            //cartRepository.removeByProductNosAndMemberNo(productNos, memberNo);
            cartRepository.deleteAllByUserNoAndProductNoIn(userNo, productNos);

            // 확인용 로그 추가
            System.out.println("deleteAllByUserNoAndProductNoIn 호출됨 - userNo: " + userNo + ", productNos: " + productNos);


            return ResponseEntity.ok("주문이 완료되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("주문 처리 중 오류가 발생했습니다.");
        }
    }

    @Transactional
    @PutMapping("/cancelOrder/{orderId}")
    public ResponseEntity<String> cancelOrder(@PathVariable Long orderId){
        System.out.println("오더아이디:"+orderId);
        try{
            CustomerOrder customerOrder = orderRepository.findById(orderId).orElse(null);
            if(customerOrder == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 주문을 찾을 수 없습니다.");
            }
            customerOrder.setOrderStatus("N"); // 주문 상태 취소로 변경
            orderRepository.save(customerOrder);

            // 취소된 상품 재고 복구
            for(OrderItem orderItem : customerOrder.getOrderItems()){
                Stock stock = stockRepository.findByProductNo(orderItem.getProductNo());
                if(stock != null){
                    stock.increaseStock(orderItem.getQuantity()); // 재고 quantity 복구
                }
            }
            return ResponseEntity.ok("주문이 취소되었습니다.");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("주문 취소 중 오류가 발생했습니다.");
        }
    }
}
