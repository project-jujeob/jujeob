package com.jujeob.security.service;

import com.jujeob.security.dto.TokenRefreshResponse;
import com.jujeob.security.exception.TokenRefreshException;
import com.jujeob.security.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TokenService {

    @Autowired
    private final JwtTokenProvider jwtTokenProvider;

    public TokenService(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    // 엑세스토큰
    public String createAccessToken(String userId) {
        return jwtTokenProvider.createAccessToken(userId);
    }

    // 리프레시토큰
    public String createRefreshToken(String userId) {
        return jwtTokenProvider.createRefreshToken(userId);
    }

    // 토큰 재발급
    public TokenRefreshResponse refreshAccessToken(String refreshToken) {
        // 리프레시 토큰 유효성 검증
        if (!jwtTokenProvider.validateToken(refreshToken))
            throw new TokenRefreshException(refreshToken, "Refresh token is not valid");

        // 리프레시 토큰에서 사용자 ID 추출
        String userId = jwtTokenProvider.getUserIdFromToken(refreshToken);

        // 새로운 엑세스 토큰 생성
        String newAccessToken = jwtTokenProvider.createAccessToken(userId);

        // 응답 생성 및 반환
        return new TokenRefreshResponse(newAccessToken);
    }
}
