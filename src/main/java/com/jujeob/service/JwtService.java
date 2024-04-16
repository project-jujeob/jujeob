//package com.jujeob.service;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.security.Keys;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//
//import java.util.Date;
//
//@Service
//public class JwtService {
//    @Value("${jwt.secret}")
//    private String secretKey;
//
//    public long getRemainingTime(String token) {
//        Claims claims = Jwts.builder()
//                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
//                        .build()
//                .parseClaimsJws(token)
//                .getBody();
//        long expirationTime = claims.getExpiration().getTime();
//        long currentTime = System.currentTimeMillis();
//        return (expirationTime - currentTime) / 1000; // 남은 시간을 초 단위로 반환
//    }
//}
