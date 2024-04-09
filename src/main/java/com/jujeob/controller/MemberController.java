package com.jujeob.controller;

import com.jujeob.constants.SecurityConstants;
import com.jujeob.dto.LoginDto;
import com.jujeob.dto.RegisterDto;
import com.jujeob.entity.Member;
import com.jujeob.prop.JwtProp;
import com.jujeob.service.MemberService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@Slf4j
@RestController
public class MemberController {

    @Autowired
    private JwtProp jwtProp;

    @Autowired
    MemberService memberService;


    @PostMapping("/api/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        memberService.register(registerDto);

        return ResponseEntity.status(HttpStatus.CREATED).body("success");
    }

    @PostMapping("/api/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        Member loginMember = memberService.login(loginDto);
        if(loginMember != null) {
            // 시크릿키  -> 바이트
            byte[] signingKey = jwtProp.getSecretKey().getBytes();

            // 토큰 생성
            String jwt = Jwts.builder()
                    // .signWith(시크릿키, 알고리즘)
                    .signWith(Keys.hmacShaKeyFor(signingKey), Jwts.SIG.HS512 )  // 시그니처 사용할 비밀키, 알고리즘 설정
                    .header()                                                   // 헤더 설정
                        .add("type", SecurityConstants.TOKEN_TYPE)           // type : jwt
                    .and()
                    .expiration(new Date(System.currentTimeMillis() + 1000*60*60*24))   // 토큰 만료 시간 설정 (1일)
                    .claim("memberId", loginMember.getMemId())      // payload - 키: memberId  값: loginMember.getMemId() 사용자 아이디
                    .claim("memberRole", loginMember.getMemRole())  // payload - 키: memberRole  값: loginMember.getMemRole() 사용자 권한
                    .compact();                                        // 최종적으로 토큰 생성
            log.info("jwt: " + jwt);
            return new ResponseEntity<>(jwt, HttpStatus.OK);
            // ResponseEntity.ok().build(); HTTP 응답 코드 200(OK)를 반환하는 코드

        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // HTTP 응답 코드 401(UNAUTHORIZED)를 반환하는 코드
    }

    // 토큰 해석(분리)
    @GetMapping("/api/member/info")
    public ResponseEntity<?> memberInfo(@RequestHeader(name = "Authorization") String header) {
        log.info("----header----");
        log.info("Authorization: " + header);

        // Authorization: Bearer ${jwt} 에서 Bearer을 분리하여 해석
        String jwt = header.replace(SecurityConstants.TOKEN_PREFIX, "");

        byte[] signingKey = jwtProp.getSecretKey().getBytes();
        Jws<Claims> parsedToken = Jwts.parser()
                                        .verifyWith(Keys.hmacShaKeyFor(signingKey))
                                        .build()
                                        .parseSignedClaims(jwt); // parse? 다른 형태로 변환
                                                                // signed? 암호화된
                                                                // claims(jwt)? jwt를 가지고
        log.info("parsedToken: " + parsedToken);
        // 정보 불러오기
        String memId = parsedToken.getPayload().get("memberId").toString();
        String memRole = parsedToken.getPayload().get("memberRole").toString();
        log.info("memId: " + memId);
        log.info("memRole: " + memRole);

        return new ResponseEntity<>(parsedToken.toString(), HttpStatus.OK);
    }


    @PostMapping("/api/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/";
    }
}
