package com.jujeob.controller;

import com.jujeob.entity.CustomerOrder;
import com.jujeob.entity.OrderItem;
import com.jujeob.repository.CartRepository;
import com.jujeob.repository.MemberRepository;
import com.jujeob.repository.OrderItemRepository;
import com.jujeob.repository.OrderRepository;
import com.jujeob.service.MemberService;
import com.jujeob.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @Autowired
    CartRepository cartRepository;

    /*@PostMapping("/customerOrder")
    public ResponseEntity<String> createOrder(@RequestBody CustomerOrder customerOrder) {
        System.out.println("주문 내용: " + customerOrder);
        System.out.println("주문 내용 getOrderItems(): " + customerOrder.getOrderItems());

        List<OrderItem> orderItems = customerOrder.getOrderItems();

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
    }*/

    /*@PostMapping("/customerOrder")
    public ResponseEntity<String> createOrder(@RequestBody CustomerOrder customerOrder) {
        try {

            // OrderItem 리스트를 가져와서 저장
            List<OrderItem> orderItems = customerOrder.getOrderItems();

            //CustomerOrder 객체 저장
            CustomerOrder saveCustomerOrder = orderRepository.save(customerOrder);

            for(OrderItem orderItem : orderItems){
                orderItem.setCustomerOrder(saveCustomerOrder);
                orderItemRepository.save(orderItem);

                Integer productNo = orderItem.getProductNo();
                System.out.println("productNo:"+productNo);

                List<Cart> cartsToRemove = cartRepository.findByMemberNoAndProductNo(customerOrder.getMemNo(),productNo);
                for(Cart cart : cartsToRemove){
                    cartRepository.delete(cart);
                }

                cartRepository.removeByMemberNoAndProductNo(customerOrder.getMemNo(),productNo);
            }

            // 주문 처리 완료 후 Cart에서 해당 상품들을 삭제
            *//*for(OrderItem orderItem : orderItems){
                Integer productNo = orderItem.getProductNo();
                // 해당 상품번호(productNo)에 해당하는 Cart 아이템값 삭제
                cartRepository.removeByMemberNoAndProductNo(customerOrder.getMemNo(),productNo);
            }*//*
            return ResponseEntity.ok("주문이 완료되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("주문에 실패하였습니다.");
        }
    }*/
    @PostMapping("/customerOrder")
    public ResponseEntity<String> createOrder(@RequestBody CustomerOrder customerOrder) {
        try {
            // CustomerOrder 객체를 저장
            CustomerOrder savedCustomerOrder = orderRepository.save(customerOrder);

            // OrderItem 리스트를 가져와서 저장
            List<OrderItem> orderItems = customerOrder.getOrderItems();
            for (OrderItem orderItem : orderItems) {
                orderItem.setCustomerOrder(savedCustomerOrder);
                orderItemRepository.save(orderItem);
            }

            return ResponseEntity.ok("주문이 완료되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("주문 처리 중 오류가 발생했습니다.");
        }
    }
}
