//package com.jujeob.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.stereotype.Service;
//
//import java.util.concurrent.TimeUnit;
//
//@Service
//public class TokenBlacklistService {    // 로그아웃시 사용자의 JWT를 Redis에 저장하여 블랙리스트로 관리
//
//    @Autowired
//    private RedisTemplate<String, String> redisTemplate;
//
//    public void blacklist(String token, long expireTime) {
//        redisTemplate.opsForValue().set(token, "blacklisted", expireTime, TimeUnit.SECONDS);
//    }
//
//    public boolean isBlacklisted(String token) {
//        String status = redisTemplate.opsForValue().get(token);
//        return "blacklisted".equals(status);
//    }
//}
