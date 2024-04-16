/*
package com.jujeob.service;

import com.jujeob.repository.MemberRepository;
import com.jujeob.repository.MyPageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MyPageServiceBackup {
    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MyPageRepository myPageRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 비번확인ver1
    // 비밀번호 확인(사용자 id확인)
//    public Member findByMemId(String memId) {
//        return myPageRepository.findByMemId(memId);
//    }
//    // 비밀번호 확인
//    public boolean checkPassword(String rawPassword, String encodedPassword) {
//        return passwordEncoder.matches(rawPassword, encodedPassword);
//    }


    // 비번확인 ver2
//    public boolean verifyPassword(PasswordVerificationDto passwordVerificationDto) {
//        try {
//            // ID를 Long 타입으로 파싱
//            // passwordVerificationDto.getMemId()가 String 타입을 반환하고 있음
//            // JPA에서 findById는 Long, Integer
//            Long id = Long.parseLong(passwordVerificationDto.getMemId());
//
//            // 파싱된 ID를 사용하여 회원 정보 조회
//            Member member = memberRepository.findById(id).orElse(null);
//
//            // 회원 정보가 존재하고 비밀번호가 일치하는지 검증
//            if (member != null && passwordEncoder.matches(passwordVerificationDto.getMemPw(), member.getMemPw())) {
//                return true;
//            }
//        } catch (NumberFormatException e) {
//            // ID 파싱 실패 처리
//            System.err.println("MyPageService ID 파싱실패: " + e.getMessage());
//        }
//        return false;
//    }

    // 비번 확인 ver2-1
//    public boolean verifyPassword(PasswordVerificationDto passwordVerificationDto) {
//        String memId = passwordVerificationDto.getMemId();
//        if (memId == null) {
//            throw new IllegalArgumentException("Member ID is null");
//        }
//        try {
//            Long id = Long.parseLong(memId);
//            Member member = memberRepository.findById(id).orElse(null);
//            return member != null && passwordEncoder.matches(passwordVerificationDto.getMemPw(), member.getMemPw());
//        } catch (NumberFormatException e) {
//            // 로깅 또는 오류 처리
//            throw new IllegalArgumentException("MyPageService ID parsing failed: Cannot parse null string" + e.getMessage());
//        }
//    }


    // 비번확인 ver3
//    public ApiResponse verifyPassword(Long memId, String inputPassword) {
//        Optional<Member> loginMember = memberRepository.findById(memId);
//        if (!loginMember.isPresent()) {
//            return new ApiResponse(false, "Member not found");
//        }
//        Member member = loginMember.get();
//        boolean isMatch = passwordEncoder.matches(inputPassword, member.getMemPw());
//        return isMatch ? new ApiResponse(true, "Password matches") : new ApiResponse(false, "Password does not match");
//    }










//    public RegisterDto mapRegisterDto(Member member) {
//        RegisterDto registerDto = new RegisterDto();
//        registerDto.setMemId(member.getMemId());
//        registerDto.setMemNickname(member.getMemNickname());
//        registerDto.setMemName(member.getMemName());
//        registerDto.setMemEmail(member.getMemEmail());
//        registerDto.setMemPhone(member.getMemPhone());
//        registerDto.setMemAddr(member.getMemAddr());
//
//        return registerDto;
//    }
//
//    public RegisterDto getMemberProfile() {
//        Member member = myPageRepository.findById(1L).orElse(null); // 1L은 회원의 고유 ID로 수정해야 합니다.
//        if (member == null) {
//            throw new RuntimeException("회원 정보를 찾을 수 없습니다.");
//        }
//        return mapRegisterDto(member);
//    }

//    public List<RegisterDto> getMemberProfileInfo() {
//        List<Member> Members = myPageRepository.findAll();
//        List<RegisterDto> registerDto = new ArrayList<>();
//
//        for (Member entity : Members) {
//            registerDto.add(mapRegisterDto(entity));
//        }
//
//        return registerDto;
//    }

}
*/
