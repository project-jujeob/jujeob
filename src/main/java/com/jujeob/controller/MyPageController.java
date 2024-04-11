package com.jujeob.controller;

import com.jujeob.dto.RegisterDto;
import com.jujeob.entity.Member;
import com.jujeob.service.MyPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MyPageController {

    @Autowired
    MyPageService myPageService;

    // 회원정보수정
//    @GetMapping("/api/showProfile")
//    public List<RegisterDto> memberProfileInfo(){
//        return myPageService.getMemberProfileInfo();
//    }

    // 회원정보 조회
    @GetMapping("/api/getMemberProfile")
    public ResponseEntity<RegisterDto> getMemberProfile(){
        RegisterDto registerDto = myPageService.getMemberProfile();
        return ResponseEntity.ok(registerDto);
    }

}
