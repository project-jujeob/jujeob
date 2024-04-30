package com.jujeob.controller;

import com.jujeob.entity.CustomerOrder;
import com.jujeob.entity.OrderItem;
import com.jujeob.entity.Stock;
import com.jujeob.repository.*;
import com.jujeob.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    OrderService orderService;

    @Autowired
    UserRepository userRepository;


    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderItemRepository orderItemRepository;

    @Autowired
    CartRepository cartRepository;

    @Autowired
    StockRepository stockRepository;


    @PostMapping("/customerOrder")
    public ResponseEntity<String> createOrder(@RequestBody CustomerOrder customerOrder) {
        return orderService.createOrder(customerOrder);
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