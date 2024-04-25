package com.jujeob.controller;

import com.jujeob.repository.MemberRepository;
import com.jujeob.repository.OrderRepository;
import com.jujeob.service.MyPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyPageController {

    @Autowired
    MyPageService myPageService;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    OrderRepository orderRepository;



    // 토큰 해석(분리) 회원 정보조회
    @GetMapping("/api/member/info")
    public ResponseEntity<?> memberInfo(@RequestHeader("Authorization") String token) {
        String memberInfo = myPageService.getMemberInfo(token);
        return ResponseEntity.ok().body(memberInfo);
    }

    // 회원정보수정
//    @GetMapping("/api/updateProfile")
//    public List<RegisterDto> memberProfileInfo(){
//        return myPageService.getMemberProfileInfo();
//    }

    @GetMapping("/api/orderDelivery/{memberNo}")
    public ResponseEntity<?> orderDeliveryInfo(@PathVariable Long memberNo){

        return orderRepository.findAllByMemberNo(memberNo);
    }


}
