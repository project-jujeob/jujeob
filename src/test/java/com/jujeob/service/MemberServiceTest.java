package com.jujeob.service;

import com.jujeob.dto.LoginDto;
import com.jujeob.dto.RegisterDto;
import com.jujeob.entity.Member;
import com.jujeob.entity.MemberLog;
import com.jujeob.repository.MemberLogRepository;
import com.jujeob.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.never;


import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class MemberServiceTest {

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private MemberLogRepository memberLogRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private MemberService memberService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testRegister() {
        RegisterDto registerDto = new RegisterDto();
        // Set RegisterDto properties

        Member mockMember = new Member();
        // Set mockMember properties

        when(passwordEncoder.encode(registerDto.getMemPw())).thenReturn("encodedPassword");
        when(memberRepository.save(any(Member.class))).thenReturn(mockMember);

        Member registeredMember = memberService.register(registerDto);

        assertNotNull(registeredMember);
        assertEquals(mockMember, registeredMember);
        assertEquals("encodedPassword", registeredMember.getMemPw());
        verify(passwordEncoder, times(1)).encode(registerDto.getMemPw());
        verify(memberRepository, times(1)).save(any(Member.class));
    }

    @Test
    public void testLogin() {
        LoginDto loginDto = new LoginDto();
        // Set LoginDto properties

        Member mockMember = new Member();
        // Set mockMember properties

        Optional<Member> mockOptional = Optional.of(mockMember);

        when(memberRepository.findByMemId(loginDto.getMemId())).thenReturn(mockOptional);
        when(passwordEncoder.matches(loginDto.getMemPw(), mockMember.getMemPw())).thenReturn(true);

        Member loggedInMember = memberService.login(loginDto);

        assertNotNull(loggedInMember);
        assertEquals(mockMember, loggedInMember);
        verify(memberLogRepository, times(1)).save(any(MemberLog.class));
    }

    @Test
    public void testLoginInvalidPassword() {
        LoginDto loginDto = new LoginDto();
        // Set LoginDto properties

        Member mockMember = new Member();
        // Set mockMember properties

        Optional<Member> mockOptional = Optional.of(mockMember);

        when(memberRepository.findByMemId(loginDto.getMemId())).thenReturn(mockOptional);
        when(passwordEncoder.matches(loginDto.getMemPw(), mockMember.getMemPw())).thenReturn(false);

        Member loggedInMember = memberService.login(loginDto);

        assertNull(loggedInMember);
        verify(memberLogRepository, never()).save(any(MemberLog.class));
    }

    @Test
    public void testLoginMemberNotFound() {
        LoginDto loginDto = new LoginDto();
        // Set LoginDto properties

        when(memberRepository.findByMemId(loginDto.getMemId())).thenReturn(Optional.empty());

        Member loggedInMember = memberService.login(loginDto);

        assertNull(loggedInMember);
        verify(memberLogRepository, never()).save(any(MemberLog.class));
    }
}