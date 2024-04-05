package com.jujeob.controller;


import com.jujeob.dto.LoginDto;
import com.jujeob.dto.RegisterDto;
import com.jujeob.entity.Member;
import com.jujeob.service.MemberService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MemberController {

    @Autowired
    MemberService memberService;

    @PostMapping("/register.do")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        memberService.register(registerDto);

        return ResponseEntity.status(HttpStatus.CREATED).body("success");
    }

    @PostMapping("/login.do")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto, HttpSession session) {
        Member loginMember = memberService.login(loginDto);
        if(loginMember != null) {
            session.setAttribute("loginMember", loginMember);
            return ResponseEntity.ok(loginMember);
//            ResponseEntity.ok().build(); //  HTTP 응답 코드 200(OK)를 반환하는 코드
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // HTTP 응답 코드 401(UNAUTHORIZED)를 반환하는 코드
    }


    @PostMapping("/logout.do")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/";
    }
}
