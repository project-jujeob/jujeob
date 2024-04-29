//package com.jujeob.jwt;
//
//import io.jsonwebtoken.Jwts;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//
//import javax.crypto.SecretKey;
//import javax.crypto.spec.SecretKeySpec;
//import java.nio.charset.StandardCharsets;
//import java.util.Date;
//
//// 토큰 생성하는 곳
//@Component
//public class JwtUtil {
//    private final SecretKey secretKey;
//
//    // application.yml에 정의한 SecretKey를 불러온다
//    public JwtUtil(@Value("${com.jujeob.secret-key}") String secret) {
//        this.secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8),
//                Jwts.SIG.HS256.key().build().getAlgorithm());
//    }
//
//    // 검증
//    public Long getNo(String token) {
//        String memberNoStr = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("memberNo", String.class);
//        return Long.parseLong(memberNoStr);
//    }
//
//    public String getUsername(String token) {
//        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("memberId", String.class);
//    }
//
//    public String getNickname(String token) {
//        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("memberNickname", String.class);
//    }
//
//    public String getName(String token) {
//        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("memberName", String.class);
//    }
//
//    public String getEmail(String token) {
//        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("memberEmail", String.class);
//    }
//
//    public String getPhone(String token) {
//        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("memberPhone", String.class);
//    }
//
//    public String getAddr(String token) {
//        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("memberAddr", String.class);
//    }
//
//    public String getRole(String token) {
//        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("memberRole", String.class);
//    }
//
//    public Boolean isExpired(String token) {
//        return Jwts.parser().verifyWith(secretKey).build()
//                .parseSignedClaims(token).getPayload()
//                .getExpiration().before(new Date());
//    }
//
//    // 토큰 생성
//    public String createJwt(Long memNo,
//                            String memId,
//                            String memNickname,
//                            String memName,
//                            String memEmail,
//                            String memPhone,
//                            String memAddr,
//                            String memRole,
//                            Long expiredMs) {
//        return Jwts.builder()
//                .claim("memberNo", memNo)
//                .claim("memberId", memId)
//                .claim("memberNickname", memNickname)
//                .claim("memberName", memName)
//                .claim("memberEmail", memEmail)
//                .claim("memberPhone", memPhone)
//                .claim("memberAddr", memAddr)
//                .claim("memberRole", memRole)
//
//                .issuedAt(new Date(System.currentTimeMillis())) // 현재 발행시간
//                .expiration(new Date(System.currentTimeMillis() + expiredMs))   // 소멸시간
//                .signWith(secretKey)
//                .compact();
//    }
//}
