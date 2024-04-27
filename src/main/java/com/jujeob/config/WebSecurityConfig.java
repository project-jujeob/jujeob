package com.jujeob.config;

import com.jujeob.jwt.JwtUtil;
import com.jujeob.jwt.LoginFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    //AuthenticationManager가 인자로 받을 때 AuthenticationConfiguration 객체 생성자 주입
    private final AuthenticationConfiguration authenticationConfiguration;
    private final JwtUtil jwtUtil;

    public WebSecurityConfig(AuthenticationConfiguration authenticationConfiguration, JwtUtil jwtUtil) {
        this.authenticationConfiguration = authenticationConfiguration;
        this.jwtUtil = jwtUtil;
    }

    // AuthenticationManager Bean에 등록
    @Bean
    public AuthenticationManager authenticationManager  (AuthenticationConfiguration configuration) throws Exception
    {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // SpringSecurity 5.5 이상
    // 보안설정
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws  Exception {
        // CRSF 공격 방어 기능 비활성화 (일단 비활성화)
        // CSRF 보호 비활성화
        httpSecurity.csrf(AbstractHttpConfigurer::disable); // = http.csrf((csrf) -> csrf.disable());


//        httpSecurity.cors(Customizer.withDefaults());

        // 세션 관리 정첵 설정: JWT를 사용하여 인증하기 때문에 세션 불필요
        httpSecurity.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS)); // stateless 세션 생성 비활성화

        // 특정경로 허용 - 아이디 중복체크
        /*httpSecurity.authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/checkMemId", "/api/register", "/api/login", "/api/logout").permitAll()  // 중복 검사 API 접근 허용
                .anyRequest().authenticated()  // 나머지 요청은 인증 필요
        );*/


        // 폼 기반 로그인 비활성화 (아이디, 비밀번호만 입력하면 로그인 되는 방식)
        httpSecurity.formLogin(AbstractHttpConfigurer::disable); // = http.formLogin((login) -> login.disable());

        // HTTP 기본 인증 비활성화 ( 비밀번호가 Base64로 인코딩되어 전송되는 인증)
        httpSecurity.httpBasic(AbstractHttpConfigurer::disable); // = http.httpBasic((basic) -> basic.disable());

        // 동일한 출처로 간주되어 웹 공격 방지 (localhost:8080 = localhost:XXXX)
        httpSecurity.headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin));

        // 커스텀 필터 추가
        httpSecurity.addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil),
                UsernamePasswordAuthenticationFilter.class);

//        httpSecurity.authorizeHttpRequests((auth) -> auth
//                .requestMatchers("/", "/api/login2", "/api/register2", "api/member/info2").permitAll() // 메인페이지, 로그인페이지, 회원가입페이지 모두 허용
////                .requestMatchers(PathRequest.toH2Console()).permitAll()
//                .requestMatchers("/admin").hasRole("admin") // admin페이지는 admin만
//                .anyRequest().authenticated() // 모든 요청에 대해 인증된 사용자만 가능
//        );





        return httpSecurity.build(); // 빌드되어서 SecurityFilterChain 반환
    }
}
