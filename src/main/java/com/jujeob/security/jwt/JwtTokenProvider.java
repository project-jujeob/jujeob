package com.jujeob.security.jwt;

import com.jujeob.controller.AuthController;
import com.jujeob.entity.User;
import com.jujeob.security.CustomUserDetails;
import com.jujeob.security.service.CustomUserDetailsService;
import com.jujeob.security.service.TokenStorageService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.crypto.SecretKey;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;



@Configuration
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.accessExpiration}")
    private Long accessExpiration;

    @Value("${jwt.refreshExpiration}")
    private Long refreshExpiration;

    private SecretKey key;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private TokenStorageService tokenStorageService;

    @PostConstruct
    protected void init() {
        key = Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    public String createAccessToken(String userId) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(userId);
        CustomUserDetails customUserDetails = (CustomUserDetails) userDetails;
        User user = customUserDetails.getUser();

        // 사용자 정보 추가
        Map<String, Object> claimsMap = new HashMap<>();
        claimsMap.put("sub", userId); // 'sub'는 subject를 의미
        claimsMap.put("auth", userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList()));
        claimsMap.put("userNo", user.getUserNo());
        claimsMap.put("userId", user.getUserId());
        claimsMap.put("nickname", user.getNickname());
        claimsMap.put("name", user.getName());
        claimsMap.put("phone", user.getPhone());
        claimsMap.put("email", user.getEmail());
        claimsMap.put("address", user.getAddress());
        claimsMap.put("createDate", user.getCreateDate().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        claimsMap.put("profileImage", user.getProfileImage());
        claimsMap.put("role", user.getRole());

        Date now = new Date();
        Date validity = new Date(System.currentTimeMillis() + accessExpiration);

        String accessToken = Jwts.builder()
                .claims(claimsMap)
                .issuedAt(now)
                .expiration(validity)
                .signWith(key, Jwts.SIG.HS512)
                .compact();

        tokenStorageService.storeToken(accessToken, "access", accessExpiration / 1000); // Store in Redis
        logger.info("JWT created for user ID: {}", userId);
        return accessToken;
    }

    public String createRefreshToken(String userId) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + refreshExpiration); // Refresh 토큰 만료 시간 계산

        String jtwiD = UUID.randomUUID().toString(); // JWT ID, 토큰을 고유하게 식별하는 데 사용

        String refreshToken = Jwts.builder()
                .id(jtwiD) // 토큰의 고유 식별자 설정
                .subject(userId)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(key, Jwts.SIG.HS512)
                .compact();

        tokenStorageService.storeToken(refreshToken, "refresh", refreshExpiration / 1000); // Store in Redis
        return refreshToken;
    }

    public boolean validateToken(String token) {

        // 토큰이 블랙리스트에 있으면 유효하지 않음
        if (tokenStorageService.isTokenBlacklisted(token)) {
            logger.error("Token is blacklisted: {}", token);
            return false;
        }

        // Redis에서 토큰의 유효성 및 만료 검사
        String tokenData = tokenStorageService.getTokenData(token);
        if (tokenData == null || tokenData.isEmpty()) {
            logger.error("No token data found in Redis for token: {}", token);
            return false;
        }
        // 만료 시간 검증
        try {
            Date tokenExpiration = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload()
                    .getExpiration();
            return !tokenExpiration.before(new Date());
        } catch (JwtException | IllegalArgumentException e) {
            logger.info(e.getMessage());
            return false;
        }
    }

    // 토큰으로 userId 가지고오기
    public String getUserIdFromToken(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public long getRemainingTime(String token) {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            Date expiration = claims.getExpiration();
            Date now = new Date();
            return expiration.getTime() - now.getTime();
        } catch (JwtException | IllegalArgumentException e) {
            // 토큰 파싱 실패 또는 기타 문제 발생 시
            return 0; // 유효하지 않은 토큰으로 간주하고 0 반환
        }
    }
}
