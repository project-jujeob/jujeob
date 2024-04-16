package com.jujeob.jwt;

import com.jujeob.dto.CustomMemberDetailDto;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.Collection;
import java.util.Iterator;

// 로그인했으면 토큰 맞는지
public class LoginFilter extends UsernamePasswordAuthenticationFilter {
    // 검증 담당
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    // 생성자
    public LoginFilter(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        // 클라이언트 요청에서 username, password추출
        String username = obtainUsername(request);      // request에서 사용자이름을 가져오는 메소드
        String password = obtainPassword(request);      // request에서 비밀번호를 가져오는 메소드

        // 스프링 시큐리티에서 username, password를 검증하기 위해 token에 담아야 함
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password, null);

        // toden 에 담은 검증을 위한 authenticationManager로 전달
        return authenticationManager.authenticate(authenticationToken);
    }

    // 로그인 성공시 실행하는 메소드(실제 jwt를 발급하면 됨)
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain, Authentication authentication) {

        CustomMemberDetailDto customUserDetails = (CustomMemberDetailDto) authentication.getPrincipal();

        String username = customUserDetails.getUsername();
        String nickname = customUserDetails.getNickname();
        String name = customUserDetails.getName();
        String email = customUserDetails.getEmail();
        String phone = customUserDetails.getPhone();
        String addr = customUserDetails.getAddr();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();

        String role = auth.getAuthority();

        String token = jwtUtil.createJwt(username, nickname, name, email, phone, addr, role, 1000*60L);

        response.addHeader("Authorization", "Bearer " + token);
    }

    // 로그인 실패시 실해하는 메소드
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request,
                                              HttpServletResponse response,
                                              AuthenticationException failed) {
        response.setStatus(401);
    }
}
