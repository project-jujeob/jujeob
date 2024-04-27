package com.jujeob.controller;

import com.jujeob.dto.ApiResponse;
import com.jujeob.dto.LoginDto;
import com.jujeob.dto.RegisterDto;
import com.jujeob.entity.Member;
import com.jujeob.jwt.JwtUtil;
import com.jujeob.prop.JwtProp;
import com.jujeob.service.MemberService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
public class MemberController {

    @Autowired
    private JwtProp jwtProp;

    @Autowired
    MemberService memberService;

    @Autowired
    private JwtUtil jwtUtil;

//    @Autowired
//    TokenBlacklistService tokenBlacklistService;

//    @Autowired
//    private JwtService jwtService;


    @PostMapping("/api/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        memberService.register(registerDto);

        return ResponseEntity.status(HttpStatus.CREATED).body("success");
    }


    @PostMapping("/api/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        Member loginMember = memberService.login(loginDto);
        if(loginMember != null) {

            // 로그인에 성공하면 토큰 생성
            String token = jwtUtil.createJwt(loginMember.getMemNo(),
                                             loginMember.getMemId(),
                                             loginMember.getMemNickname(),
                                             loginMember.getMemName(),
                                             loginMember.getMemEmail(),
                                             loginMember.getMemPhone(),
                                             loginMember.getMemAddr() ,
                                             loginMember.getMemRole(),
                                    1000 * 60 * 60 * 24L);
            // 토큰을 출력
            return ResponseEntity.ok().body(token);

        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // HTTP 응답 코드 401(UNAUTHORIZED)를 반환하는 코드
    }

    // 토큰 해석(분리)
//    @GetMapping("/api/member/info")
//    public ResponseEntity<?> memberInfo(@RequestHeader("Authorization") String token) {
//        String memberInfo = memberService.getMemberInfo(token);
//        return ResponseEntity.ok().body(memberInfo);
//    }




      // 로그아웃 ver1
    @DeleteMapping("/api/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/";
    }

    // 로그아웃 ver2
//    @PostMapping("/logout")
//    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authToken) {
//        String token = authToken.substring(7); // "Bearer " 접두사 제거
//        long remainingTime = jwtService.getRemainingTime(token); // JWT 서비스로부터 토큰의 남은 유효시간 계산
//        tokenBlacklistService.blacklist(token, remainingTime); // 토큰을 블랙리스트에 추가
//        return ResponseEntity.ok().body("로그아웃 되었습니다.");
//    }

    // 아이디 중복검사
//    @CrossOrigin(origins = "*", allowedHeaders = "*")
//    @GetMapping("/checkMemId")
//    public ResponseEntity<?> checkMemId(@RequestParam String memId) {
//        boolean isAvailable = memberService.checkMemberId(memId);
//        return ResponseEntity.ok().body(new ApiResponse(true, "isAvailable"));
//    }




}
