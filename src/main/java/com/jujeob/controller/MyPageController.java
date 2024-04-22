package com.jujeob.controller;

import com.jujeob.dto.ApiResponse;
import com.jujeob.dto.PasswordVerificationDto;
import com.jujeob.dto.RegisterDto;
import com.jujeob.entity.LikeProduct;
import com.jujeob.entity.Member;
import com.jujeob.repository.MemberRepository;
import com.jujeob.service.MemberService;
import com.jujeob.service.MyPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class MyPageController {

    @Autowired
    MyPageService myPageService;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;



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


}
