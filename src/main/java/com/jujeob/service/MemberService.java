package com.jujeob.service;

import com.jujeob.dto.GetMemberDto;
import com.jujeob.dto.LoginDto;
import com.jujeob.dto.RegisterDto;
import com.jujeob.entity.Member;
import com.jujeob.entity.MemberLog;
import com.jujeob.repository.MemberLogRepository;
import com.jujeob.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MemberLogRepository memberLogRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    //회원가입시 입력받을 데이터
    public Member register(RegisterDto registerDto) {
        Member member = new Member();
        member.setMemId(registerDto.getMemId());
        member.setMemPw(bCryptPasswordEncoder.encode(registerDto.getMemPw()));
        member.setMemNickname(registerDto.getMemNickname());
        member.setMemName(registerDto.getMemName());
        member.setMemEmail(registerDto.getMemEmail());
        member.setMemPhone(registerDto.getMemPhone());
        member.setMemAddr(registerDto.getMemAddr());
        member.setMemDeleted("N");   // 회원탈퇴여부

        if (registerDto.getMemId().equals("admin")) {
            member.setMemRole("admin");
        } else {
            member.setMemRole("user");
        }

        return memberRepository.save(member);
    }

    public Member login(LoginDto loginDto) {
        Optional<Member> loginMember = memberRepository.findByMemId(loginDto.getMemId());
        System.out.println("MemberService" + loginDto.getMemId());
        if (loginMember.isPresent()) {
            if (bCryptPasswordEncoder.matches(loginDto.getMemPw(), loginMember.get().getMemPw())) {
                MemberLog memberLog = new MemberLog();
                memberLog.setMember(loginMember.get());
                memberLog.setLoginType("LOCAL");
                memberLogRepository.save(memberLog);
                return loginMember.get();
            }
        }
        return null;
    }

    // 아이디 중복검사
//    public boolean checkMemId(String memId) {
//        return !memberRepository.existsByMemId(memId);
//    }

    public boolean checkMemberId(String memId) {

        return memberRepository.existsByMemId(memId);
    }

    public List<GetMemberDto> getUserInfoByKeyword(String searchType, String keyword) {
        List <Member> memberList = memberRepository.findAllBySearchTypeAndKeyword(searchType, keyword);
        List<GetMemberDto> memberDto = new ArrayList<>();
        for (Member member : memberList) {
            GetMemberDto dto = new GetMemberDto(member.getMemId(), member.getMemNickname(), member.getMemName(),
                    member.getMemEmail(), member.getMemPhone(), member.getMemAddr(),
                    member.getCreateDate(), member.getMemDeleted());
            memberDto.add(dto);
        }
        return memberDto;
    }
}
