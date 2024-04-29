package com.jujeob.security.jwt;

import com.jujeob.controller.AuthController;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.stream.Collectors;

// JWT 인증 필터
public class JwtAuthenTicationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final UserDetailsService userDetailsService;

    public JwtAuthenTicationFilter(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Autowired
    private JwtTokenProvider tokenProvider;

    // HTTP 요청을 필터링하고 JWT 토큰을 사용하여 사용자 인증을 수행하는 메서드
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        // 요청 URL 로깅
        logger.info("Filtering request for URL: {}", request.getRequestURL());
        logger.info("Request Headers: {}", Collections.list(request.getHeaderNames()).stream()
                .map(headerName -> headerName + ": " + request.getHeader(headerName))
                .collect(Collectors.joining(", ")));

        String jwt = getJwtFromRequest(request);

        logger.info("Extracted JWT: {}", jwt);

        // JWT 토큰이 존재하고 유효한 경우
        if (jwt != null && tokenProvider.validateToken(jwt)) {
            String userId = tokenProvider.getUserIdFromToken(jwt);
            UserDetails userDetails = userDetailsService.loadUserByUsername(userId);
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            logger.info("JWT validation successful for user: {}", userId);
        } else {
            logger.info("No valid JWT found, proceeding without authentication");
        }
        // 다음 필터로 요청 전달
        filterChain.doFilter(request, response);
    }

    // HTTP 요청에서 JWT 토큰을 가져오는 메서드
    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    // JWT 토큰 유효성 검사
//    private boolean validateToken(String token) {
//        // Redis를 사용하여 토큰 유효성 검사
//        return tokenStorageService.getTokenData(token) != null;

//        try {
//            SecretKey key = signingKey();
//
//            Jws<Claims> claims = Jwts.parser()
//                    .verifyWith(key) // 서명 검증에 사용할 키 설정
//                    .build()
//                    .parseSignedClaims(authToken); // 토큰 파싱 및 검증
//
//            // 토큰의 만료 시간 검증
//            return !claims.getPayload().getExpiration().before(new Date());
//        } catch (JwtException | IllegalArgumentException e) {
//            // 유효하지 않은 토큰 처리
//            return false;
//        }
//    }
}



