package com.jujeob.controller;

import com.jujeob.entity.Member;
import com.jujeob.service.MyPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MyPageController {

    @Autowired
    MyPageService myPageService;

    // 회원정보수정
    @PostMapping("/api/editMypage")
    public List<Member> memberProfileInfo(){
        return myPageService.getMemberProfileInfo();
    }

}
