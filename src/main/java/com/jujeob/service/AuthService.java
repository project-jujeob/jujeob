package com.jujeob.service;

import com.jujeob.dto.Register;
import com.jujeob.entity.Role;
import com.jujeob.entity.User;
import com.jujeob.repository.UserRepository;
import com.jujeob.security.jwt.JwtTokenProvider;
import com.jujeob.security.service.TokenStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.TimeUnit;


@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenStorageService tokenStorageService;

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AuthService(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Transactional
    public User register(Register register) throws Exception{
        if (userRepository.existsByUserId(register.getUserId())) {
            throw new IllegalStateException("이미 있는 아이디입니다.");
        }

        User newUser = User.builder()
                .userId(register.getUserId())
                .password(passwordEncoder.encode(register.getPassword()))
                .nickname(register.getNickname())
                .name(register.getName())
                .email(register.getEmail())
                .phone(register.getPhone())
                .address(register.getAddress())
                .role(Role.USER)
                .build();

        return userRepository.save(newUser);
    }


    @Transactional
    public Authentication authenticate(String userId, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userId, password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return authentication;
    }

    public String createAccessToken(String userId) {
        return jwtTokenProvider.createAccessToken(userId);
    }

    public String createRefreshToken(String userId) {
        return jwtTokenProvider.createRefreshToken(userId);
    }

    public void logout(String accessToken, String refreshToken) {
//        long accessTokenExpiry = jwtTokenProvider.getRemainingTime(accessToken);
//        long refreshTokenExpiry = jwtTokenProvider.getRemainingTime(refreshToken);
//
//        // 토큰을 블랙리스트에 저장
//        tokenStorageService.storeBlacklisted(accessToken, accessTokenExpiry);
//        tokenStorageService.storeBlacklisted(refreshToken, refreshTokenExpiry);

        // Access token과 Refresh token을 Redis에서 삭제
//        tokenStorageService.removeToken(accessToken);
//        tokenStorageService.removeToken(refreshToken);

//         엑세스 토큰 처리
        if (accessToken != null && !accessToken.isEmpty()) {
            long accessTokenExpiry = jwtTokenProvider.getRemainingTime(accessToken);
            if (accessTokenExpiry > 0) {
                tokenStorageService.storeBlacklisted(accessToken, accessTokenExpiry);
            } else {
                tokenStorageService.storeBlacklisted(accessToken, TimeUnit.DAYS.toSeconds(1)); // 기본 1일
            }
        }

        // 리프레시 토큰 처리
        if (refreshToken != null && !refreshToken.isEmpty()) {
            long refreshTokenExpiry = jwtTokenProvider.getRemainingTime(refreshToken);
            if (refreshTokenExpiry > 0) {
                tokenStorageService.storeBlacklisted(refreshToken, refreshTokenExpiry);
            } else {
                tokenStorageService.storeBlacklisted(refreshToken, TimeUnit.DAYS.toSeconds(1)); // 기본 1일
            }
        }
    }

    //아이디 중복체크
    public boolean checkUserId(String userId) {
        return userRepository.existsByUserId(userId);
    }

    // 이메일 중복체크
    public boolean checkUserEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
