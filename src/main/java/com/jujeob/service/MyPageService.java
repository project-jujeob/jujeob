//package com.jujeob.service;
//
//import com.jujeob.dto.UpdateMemberDto;
//import com.jujeob.entity.Member;
//import com.jujeob.repository.MemberRepository;
//import com.jujeob.repository.MyPageRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.Base64;
//
//@Service
//public class MyPageService {
//    @Autowired
//    MemberRepository memberRepository;
//
//    @Autowired
//    MyPageRepository myPageRepository;
//
//    @Autowired
//    BCryptPasswordEncoder bCryptPasswordEncoder;
//
//
//    // 토큰 해석(분리) 회원 정보조회
//    public String getMemberInfo(String token) {
//        // "Bearer " 부분 제거
//        String jwt = token.replace("Bearer ", "");
//
//        // 토큰에서 "."을 기준으로 세 부분으로 분리
//        String[] parts = jwt.split("\\.");
//
//        // 각 부분을 디코딩하여 원래 형태로 변환
//        String header = decodeBase64(parts[0]);
//        String payload = decodeBase64(parts[1]);
//        String signature = parts[2]; // 시그니처는 디코딩할 필요 없음
//
//        // 각 부분을 표시하는 문자열로 조합하여 반환
//        return "header=" + header + ", payload=" + payload + ", signature=" + signature;
//    }
//
//    // Base64 디코딩 함수
//    private String decodeBase64(String encoded) {
//        byte[] decodedBytes = Base64.getUrlDecoder().decode(encoded);
//        return new String(decodedBytes);
//    }
//
//
////    public Member updateProfile(UpdateMemberDto updateDto, String memId) {
////        // 현재 로그인한 사용자 조회
////        Member member = memberRepository.findByMemId(memId)
////                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
////
////        // 정보 업데이트
////        // 비밀번호칸이 비어있으면 변경되지 않게
////        if (updateDto.getMemPw() != null && !updateDto.getMemPw().isEmpty()) {
////            member.setMemPw(bCryptPasswordEncoder.encode(updateDto.getMemPw()));
////        }
////        member.setMemNickname(updateDto.getMemNickname());
////        member.setMemName(updateDto.getMemName());
////        member.setMemEmail(updateDto.getMemEmail());
////        member.setMemPhone(updateDto.getMemPhone());
////        member.setMemAddr(updateDto.getMemAddr());
////
////        return memberRepository.save(member);
////
////    }
//}
