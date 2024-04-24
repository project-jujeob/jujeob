package com.jujeob.controller;

import com.jujeob.entity.CustomerOrder;
import com.jujeob.entity.OrderItem;
import com.jujeob.repository.MemberRepository;
import com.jujeob.repository.OrderItemRepository;
import com.jujeob.repository.OrderRepository;
import com.jujeob.service.MemberService;
import com.jujeob.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    OrderService orderService;

    @Autowired
    MemberService memberService;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderItemRepository orderItemRepository;

    @PostMapping("/customerOrder")
    public ResponseEntity<String> createOrder(@RequestBody CustomerOrder customerOrder) {
        System.out.println("주문 내용: " + customerOrder);
        System.out.println("주문 내용 getOrderItems(): " + customerOrder.getOrderItems());

        // CustomerOrder 객체에서 OrderItem 리스트를 가져옴
       /* for (OrderItem orderItem : customerOrder.getOrderItems()) {
            System.out.println("Product No: " + orderItem.getProduct().getProductNo());
            // 다른 필요한 정보들을 여기서 처리
        }*/

        List<OrderItem> orderItems = customerOrder.getOrderItems();

        //Long memNo = customerOrder.get

        // CustomerOrder를 먼저 저장
        CustomerOrder savedCustomerOrder = orderRepository.save(customerOrder);

        for (OrderItem orderItem : orderItems) {
            // 주문 객체의 orderId를 OrderItem에 설정
            orderItem.setCustomerOrder(savedCustomerOrder);

            int quantity = orderItem.getQuantity();
            double price = orderItem.getPrice();
            Long productNo = orderItem.getProductNo();
            // quantity와 price를 사용하여 원하는 작업을 수행합니다.

            System.out.println("quantity:"+quantity);
            System.out.println("price:"+price);
            System.out.println("productNo:"+productNo);

            orderItemRepository.save(orderItem);
        }

        //orderRepository.save(customerOrder);

        return ResponseEntity.ok("주문이 완료 되었습니다");
    }
}
