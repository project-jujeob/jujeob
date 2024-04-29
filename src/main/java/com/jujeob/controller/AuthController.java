package com.jujeob.controller;

import com.jujeob.dto.JwtResponse;
import com.jujeob.dto.LoginRequest;
import com.jujeob.dto.LogoutRequest;
import com.jujeob.dto.Register;
import com.jujeob.service.AuthService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody Register register) {
        try {
            authService.register(register);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // 사용자 인증 시도
            Authentication authentication = authService.authenticate(loginRequest.getUserId(), loginRequest.getPassword());

//            // 탈퇴한 회원 여부 확인
//            User user = (User) authentication.getPrincipal();
//            if ("Y".equals(user.getDeleted())) {
//                logger.info("Attempt to login with deactivated account: {}", loginRequest.getUserId());
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("탈퇴된 계정입니다");
//            }

            // Authentication 객체를 SecurityContextHolder에 저장
            SecurityContextHolder.getContext().setAuthentication(authentication);
            logger.info("Authentication successful for user: {}", authentication.getName());

            // JWT 토큰 생성
            String accessToken = authService.createAccessToken(authentication.getName());
            String refreshToken = authService.createRefreshToken(authentication.getName());

            // JWT 토큰과 함께 응답 반환
            return ResponseEntity.ok(new JwtResponse(accessToken, refreshToken));
        } catch (Exception e) {
            logger.error("Login failed for user: {}", loginRequest.getUserId(), e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed due to server error");
        }
    }

    //아이디 중복검사
    @GetMapping("/checkUserId")
    public ResponseEntity<?> checkUserId(@RequestParam String userId) {
        try {
            boolean isAvailable = !authService.checkUserId(userId); // 사용가능하면 true, 아니면 false
            return ResponseEntity.ok().body("{\"available\": " + isAvailable + "}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error");
        }
    }
    //이메일 중복검사
    @GetMapping("/checkUserEmail")
    public ResponseEntity<?> checkUserEmail(@RequestParam String email) {
        try {
            boolean isAvailable = !authService.checkUserEmail(email); // 사용가능하면 true, 아니면 false
            return ResponseEntity.ok().body("{\"available\": " + isAvailable + "}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error");
        }
    }

    @DeleteMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody LogoutRequest logoutRequest) {
        authService.logout(logoutRequest.getAccessToken(), logoutRequest.getRefreshToken());
        return ResponseEntity.ok().build();
    }
}

