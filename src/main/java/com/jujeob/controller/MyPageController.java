//package com.jujeob.controller;
//
//
//import com.jujeob.dto.OrderDeliveriesDto;
//import com.jujeob.dto.UpdateMemberDto;
//import com.jujeob.entity.Member;
//import com.jujeob.repository.MemberRepository;
//import com.jujeob.repository.OrderRepository;
//import com.jujeob.service.MyPageService;
//import com.jujeob.service.OrderService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//import java.security.Principal;
//import java.util.List;
//
//
//@RestController
//public class MyPageController {
//
//    @Autowired
//    MyPageService myPageService;
//
//    @Autowired
//    MemberRepository memberRepository;
//
//    @Autowired
//    PasswordEncoder passwordEncoder;
//
//    @Autowired
//    OrderRepository orderRepository;
//
//    @Autowired
//    OrderService orderService;
//
//
//
//    // 토큰 해석(분리) 회원 정보조회
//    @GetMapping("/api/member/info")
//    public ResponseEntity<?> memberInfo(@RequestHeader("Authorization") String token) {
//        String memberInfo = myPageService.getMemberInfo(token);
//        return ResponseEntity.ok().body(memberInfo);
//    }
//
//
//    // 회원정보수정
////    @PutMapping("/api/member/updateProfile")
////    public ResponseEntity<?> updateProfile(@RequestBody UpdateMemberDto updateDto, Principal principal) {
////        try {
////            Member updatedMember = myPageService.updateProfile(updateDto, principal.getName());
////            return ResponseEntity.ok(updatedMember);
////        } catch (Exception e) {
////            return ResponseEntity.badRequest().body("Update 실패 : " + e.getMessage());
////        }
////    }
//
//    @GetMapping("/api/orderDeliveries/{memberNo}")
//    public ResponseEntity<List<OrderDeliveriesDto>> getAllOrderDeliveriesWithItems(@PathVariable Long memberNo){
//
//        List<OrderDeliveriesDto> orderDeliveries = orderService.getAllOrderDeliveriesWithItems(memberNo);
//
//        System.out.println("orderDeliveries:"+orderDeliveries);
//
//        return ResponseEntity.ok(orderDeliveries);
//    }
//}
