//package com.jujeob.config;
//
//import com.jujeob.service.TokenBlacklistService;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import org.springframework.web.servlet.HandlerInterceptor;
//
////import javax.servlet.http.HttpServletRequest;
////import javax.servlet.http.HttpServletResponse;
//
//@Component
//public class JwtInterceptor implements HandlerInterceptor {
//
//    @Autowired
//    private TokenBlacklistService tokenBlacklistService;
//
//    @Override
//    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        String token = request.getHeader("Authorization");
//        if (token != null && tokenBlacklistService.isBlacklisted(token)) {
//            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
//            return false;
//        }
//        return true;
//    }
//}
