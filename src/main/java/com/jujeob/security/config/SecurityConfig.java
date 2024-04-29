package com.jujeob.security.config;

import com.jujeob.security.jwt.JwtAuthenTicationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserDetailsService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws  Exception {

        httpSecurity
                // 폼 기반 로그인 비활성화 (아이디, 비밀번호만 입력하면 로그인 되는 방식)
                .formLogin(AbstractHttpConfigurer::disable) // = http.formLogin((login) -> login.disable());

                // HTTP 기본 인증 비활성화 ( 비밀번호가 Base64로 인코딩되어 전송되는 인증)
                .httpBasic(AbstractHttpConfigurer::disable) // = http.httpBasic((basic) -> basic.disable());

                // CRSF 공격 방어 기능 비활성화 (일단 비활성화)
                .csrf(AbstractHttpConfigurer::disable) // = http.csrf((csrf) -> csrf.disable());

                // 세션 관리 정첵 설정: JWT를 사용하여 인증하기 때문에 세션 불필요
                .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // stateless 세션 생성 비활성화

                // 동일한 출처로 간주되어 웹 공격 방지 (localhost:8080 = localhost:XXXX)
                .headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin))

                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/user/**").permitAll()
//                        .requestMatchers(PathRequest.toH2Console()).permitAll()
                        .requestMatchers("/admin").hasRole("admin") // admin페이지는 admin만
                        .anyRequest().authenticated() // 모든 요청에 대해 인증된 사용자만 가능
                )
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build(); // 빌드되어서 SecurityFilterChain 반환
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());

        return authenticationManagerBuilder.build();
    }

    @Bean
    public JwtAuthenTicationFilter jwtAuthenticationFilter() {
        return new JwtAuthenTicationFilter(userDetailsService);
    }
}
