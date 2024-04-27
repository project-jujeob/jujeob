package com.jujeob.controller;

import com.jujeob.dto.ApiResponse;
import com.jujeob.dto.LoginDto;
import com.jujeob.dto.RegisterDto;
import com.jujeob.entity.Member;
import com.jujeob.jwt.JwtTokenManager;
import com.jujeob.jwt.JwtUtil;
import com.jujeob.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
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
    MemberService memberService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private JwtTokenManager jwtTokenManager;


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
                                             loginMember.getMemName(),
                                             loginMember.getMemNickname(),
                                             loginMember.getMemEmail(),
                                             loginMember.getMemPhone(),
                                             loginMember.getMemAddr(),
                                             loginMember.getMemRole(),
                                             1000 * 60 * 60 * 24L);
            // 토큰이 블랙리스트에 있는지 확인
            if (jwtTokenManager.isTokenBlacklisted(token)) {
                // 토큰이 블랙리스트에 있으면 로그인을 거부하고 적절한 응답을 반환
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is blacklisted");
            }
            // 블랙리스트에 없으면 토큰 반환
            token = jwtUtil.createJwt(loginMember.getMemNo(),
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

    @DeleteMapping("/api/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String token) {
        log.info(token);
        if (token != null) {
            jwtTokenManager.addTokenToBlacklist(token);
            return ResponseEntity.ok("Logout successful");
        } else {
            return ResponseEntity.badRequest().body("Token not found in request");
        }
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
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/checkMemId")
    public ResponseEntity<?> checkMemId(@RequestParam String memId) {
        boolean isAvailable = memberService.checkMemberId(memId);
        return ResponseEntity.ok().body(new ApiResponse(true, "isAvailable"));
    }


}
