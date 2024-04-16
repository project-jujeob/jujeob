package com.jujeob.jwt;

import com.jujeob.dto.CustomMemberDetailDto;
import com.jujeob.entity.Member;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

// JwtFilter jwt로 검증하는 단계(토큰 검증)
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;

    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
        // request에서 Authorization 헤더를 찾음
        String authorization = request.getHeader("Authorization");

        // Authorization검증
        if(authorization == null || !authorization.startsWith("Bearer ")) {
            System.out.println("token null");
            filterChain.doFilter(request, response);
            return;
        }

        // Bearer 부분 제거 후 순수 토큰만 획득
        String token = authorization.split(" ")[1];
        System.out.println("token : " + token);

        // 토큰 소멸시간 검증
        if(jwtUtil.isExpired(token)) {
            System.out.println("token expired");
            filterChain.doFilter(request, response);
            return;
        }

        // 토큰에서 username과 role 획득
        String id = jwtUtil.getUsername(token);
        String nickname = jwtUtil.getNickname(token);
        String name = jwtUtil.getName(token);
        String email = jwtUtil.getEmail(token);
        String phone = jwtUtil.getPhone(token);
        String addr = jwtUtil.getAddr(token);
        String role = jwtUtil.getRole(token);


        Member member = new Member();
        member.setMemId(id);
        member.setMemNickname(nickname);
        member.setMemName(name);
        member.setMemName(email);
        member.setMemName(phone);
        member.setMemName(addr);
        member.setMemRole(role);

        // 세션에 일시적으로 넣어줌
        CustomMemberDetailDto customUserDetails = new CustomMemberDetailDto(Optional.of(member));
        Authentication authToken = new UsernamePasswordAuthenticationToken
                (customUserDetails, null, customUserDetails.getAuthorities());

        // user 세션 만들기
        SecurityContextHolder.getContext().setAuthentication(authToken);
        filterChain.doFilter(request, response);
    }
}
