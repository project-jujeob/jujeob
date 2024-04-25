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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
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

    @Transactional
    @PostMapping("/customerOrder")
    public ResponseEntity<String> createOrder(@RequestBody CustomerOrder customerOrder) {
        try {

            System.out.println("customerOrder:"+customerOrder);
            // CustomerOrder 객체를 저장
            CustomerOrder savedCustomerOrder = orderRepository.save(customerOrder);

            // OrderItem 리스트를 가져와서 저장
            List<OrderItem> orderItems = customerOrder.getOrderItems();
            System.out.println("orderItems:"+orderItems);

            // Cart 테이블에서 삭제할 상품 번호와 회원 번호를 담을 리스트 생성
            List<Integer> productNos = new ArrayList<>();
            Long memberNo = customerOrder.getMemNo();

            for (OrderItem orderItem : orderItems) {
                orderItem.setCustomerOrder(savedCustomerOrder);
                orderItemRepository.save(orderItem);

                // Cart 테이블에서 삭제할 상품 번호 추가
                productNos.add(orderItem.getProductNo());
            }

            System.out.println("프넘productNos:"+productNos);
            System.out.println("멤넘memberNo:"+memberNo);

            //cartRepository.removeByProductNosAndMemberNo(productNos, memberNo);
            cartRepository.deleteAllByMemberNoAndProductNoIn(memberNo, productNos);
            // 확인용 로그 추가
            System.out.println("deleteAllByMemberNoAndProductNoIn 호출됨 - memberNo: " + memberNo + ", productNos: " + productNos);


            return ResponseEntity.ok("주문이 완료되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("주문 처리 중 오류가 발생했습니다.");
        }
    }

}
