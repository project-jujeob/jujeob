package com.jujeob.service;

import com.jujeob.dto.RegisterDto;
import com.jujeob.entity.Member;
import com.jujeob.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    @Autowired
    MemberRepository memberRepository;

    //회원가입시 입력받을 데이터
    public Member register(RegisterDto registerDto) {
        Member member = new Member();
        member.setMemId(registerDto.getMemId());
        member.setMemPw(registerDto.getMemPw());
        member.setMemNickname(registerDto.getMemNickname());
        member.setMemName(registerDto.getMemName());
        member.setMemEmail(registerDto.getMemEmail());
        member.setMemPhone(registerDto.getMemPhone());
        member.setMemAddr(registerDto.getMemAddr());
        member.setMemDeleted("N");   // 회원탈퇴여부

        if(registerDto.getMemId().equals("admin")){
            member.setMemRole("admin");
        }else {
            member.setMemRole("user");
        }

        return memberRepository.save(member);
    }


}
