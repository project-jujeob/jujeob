package com.jujeob.security.service;

import com.jujeob.controller.AuthController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class TokenStorageService {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private StringRedisTemplate redisTemplate;

    public void storeToken(String token, String data, long durationInSeconds) {
        redisTemplate.opsForValue().set(token, data, durationInSeconds, TimeUnit.SECONDS);
    }

    public void storeBlacklisted(String token, long durationInSeconds) {
        if (durationInSeconds <= 0) {
            // 만료 시간이 없거나 잘못된 경우 기본값 설정
            durationInSeconds = TimeUnit.DAYS.toSeconds(1); // 예: 1일
        }
        redisTemplate.opsForValue().set(token, "blacklisted", durationInSeconds, TimeUnit.SECONDS);
    }

    public boolean isTokenBlacklisted(String token) {
        String value = redisTemplate.opsForValue().get(token);
        boolean isBlacklisted = "blacklisted".equals(value);
        logger.info("Checking if token is blacklisted: {} -> {}", token, isBlacklisted);
        return isBlacklisted;
    }

    public String getTokenData(String token) {
        return redisTemplate.opsForValue().get(token);
    }

    public void removeToken(String token) {
        redisTemplate.delete(token);
        System.out.println("Token removed from Redis: " + token); // 로그 추가
    }
}
