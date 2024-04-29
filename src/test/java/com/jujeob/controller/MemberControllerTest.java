//package com.jujeob.controller;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.jujeob.dto.LoginDto;
//import com.jujeob.dto.RegisterDto;
//import com.jujeob.entity.Member;
//import com.jujeob.prop.JwtProp;
//import com.jujeob.service.MemberService;
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultActions;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.when;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@ExtendWith(MockitoExtension.class)
//@SpringBootTest
//@AutoConfigureMockMvc
//class MemberControllerTest {
//
//    @Autowired
//    MockMvc mockMvc;
//
//    @Mock
//    private MemberService memberService;
//
//    @InjectMocks
//    private MemberController memberController;
//    @Autowired
//    private JwtProp jwtProp;
//
//    @Test
//    void register() {
//        // Given: 테스트가 실행될 때 필요한 초기 상태를 설정하는 단계
//        // -> 회원 등록에 필요한 정보를 포함시킬 객체를 생성하는 초기 상태
//        RegisterDto registerDto = new RegisterDto();
//
//        /*
//         * any: 어떤 클래스의 임의의 인스턴스(RegisterDto.class의 이름없는 임의의 인스턴스)
//         * thenAnswer: 해당 메서드를 호출할 때 반환할 값을 지정(Member를 반환)
//         * invocation: 모의 객체에 대한 메소드 호출(memberService.register() 메소드 호출)
//         * getArgument: 메소드 호출시 전달할 인자 선택(registerDto를 전달)
//         * */
//        // When: 어떤 특정한 동작이 발생했을 때를 의미. 주로 테스트하려는 메서드를 호출
//        // -> register를 하기위한 동작으로
//        when(memberService.register(any(RegisterDto.class))).thenAnswer(invocation -> {
//            Member member = new Member();
//            member.setMemId("example");
//            member.setMemPw("example");
//            member.setMemNickname("example");
//            member.setMemName("example");
//            member.setMemEmail("example");
//            member.setMemPhone("example");
//            member.setMemAddr("example");
//            member.setMemDeleted("N");
//            member.setMemRole("user");
//            return member;
//        });
//
//        // Then:  기능에 대한 결과를 확인
//        // -> 회원 가입 시도를 하고 http상태 코드가 HttpStatus.CREATED인지 확인, 성공 시 응답이 success인지 확인
//        ResponseEntity<String> responseEntity = memberController.register(registerDto);
//        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
//        assertEquals("success", responseEntity.getBody());
//    }
//
//    /*@Test
//    void login_ReturnsJwt_WhenMemberIsValid() throws Exception {
//        // Given
//        LoginDto loginDto = new LoginDto();
//        loginDto.setMemId("validUsername");
//        loginDto.setMemPw("validPassword");
//
//        Member validMember = new Member();
//        validMember.setMemId("validUsername");
//        validMember.setMemRole("ROLE_USER");
//
//        // Mocking the behavior of memberService.login()
//        when(memberService.login(any(LoginDto.class))).thenReturn(validMember);
//
//        // When & Then
//        mockMvc.perform(post("/api/login")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(new ObjectMapper().writeValueAsString(loginDto)))
//                .andExpect(status().isOk());
//    }*/
//
//    @Test
//    void login_ReturnsUnauthorized_WhenMemberIsInvalid() throws Exception {
//        // Given
//        LoginDto loginDto = new LoginDto();
//        loginDto.setMemId("invalidId");
//        loginDto.setMemPw("invalidPassword");
//
//        // When
//        mockMvc.perform(post("/api/login")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(new ObjectMapper().writeValueAsString(loginDto)))
//                .andExpect(status().isUnauthorized());
//    }
//
//    @Test
//    void memberInfo() {
//        // Test memberInfo method
//    }
//
//}
