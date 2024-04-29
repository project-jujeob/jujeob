//package com.jujeob.jwt;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.stereotype.Component;
//
//import java.util.concurrent.TimeUnit;
//
//@Component
//public class JwtTokenManager {
//
//    private static final Logger logger = LoggerFactory.getLogger(JwtTokenManager.class);
//    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 24 hours
//    private static final String REDIS_PREFIX = "jwt:";
//
//    @Autowired
//    private RedisTemplate<String, String> redisTemplate;
//
//    public void addTokenToBlacklist(String token) {
//        // Redis에서 JWT 토큰을 블랙리스트에 저장하고 설정된 만료 시간 후에 자동으로 삭제
//        redisTemplate.opsForValue().set(REDIS_PREFIX + token, "blacklisted", EXPIRATION_TIME, TimeUnit.MILLISECONDS);
//        // 호출될 때 로그 출력
//        logger.info("Token added to blacklist: {}", token);
//    }
//
//    public boolean isTokenBlacklisted(String token) {
//        // Redis에서 토큰이 블랙리스트에 있는지 여부 확인
//        return Boolean.TRUE.equals(redisTemplate.hasKey(REDIS_PREFIX + token));
//    }
//
//    public void removeTokenFromBlacklist(String token) {
//        // Redis에 블랙리스트에서 토큰을 제거합니다.
//        redisTemplate.delete(REDIS_PREFIX + token);
//    }
//}
