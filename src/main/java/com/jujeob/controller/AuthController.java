package com.jujeob.controller;

import com.jujeob.dto.JwtResponse;
import com.jujeob.dto.LoginRequest;
import com.jujeob.dto.LogoutRequest;
import com.jujeob.dto.Register;
import com.jujeob.security.dto.TokenRefreshRequest;
import com.jujeob.security.dto.TokenRefreshResponse;
import com.jujeob.security.service.TokenService;
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

    @Autowired
    private TokenService tokenService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody Register register) {
        try {
            authService.register(register);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/token/refresh")
    public ResponseEntity<TokenRefreshResponse> refreshAccessToken(@RequestBody TokenRefreshRequest tokenRefreshRequest) {
        String refreshToken = tokenRefreshRequest.getRefreshToken();
        TokenRefreshResponse response = tokenService.refreshAccessToken(refreshToken);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // 사용자 인증 시도
            Authentication authentication = authService.login(loginRequest.getUserId(), loginRequest.getPassword());

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
            String accessToken = tokenService.createAccessToken(authentication.getName());
            String refreshToken = tokenService.createRefreshToken(authentication.getName());

            // JWT 토큰과 함께 응답 반환
            return ResponseEntity.ok(new JwtResponse(accessToken, refreshToken));
        } catch (Exception e) {
            logger.error("Login failed for user: {}", loginRequest.getUserId(), e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed due to server error");
        }
    }

    @DeleteMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody LogoutRequest logoutRequest) {
        authService.logout(logoutRequest.getAccessToken(), logoutRequest.getRefreshToken());
        return ResponseEntity.ok().build();
    }
}

