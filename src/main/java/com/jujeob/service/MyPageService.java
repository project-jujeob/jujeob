package com.jujeob.service;

import com.jujeob.dto.BoardDto;
import com.jujeob.dto.RegisterDto;
import com.jujeob.entity.Board;
import com.jujeob.entity.Member;
import com.jujeob.repository.MyPageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MyPageService {

    @Autowired
    MyPageRepository myPageRepository;


    public RegisterDto mapRegisterDto(Member member) {
        RegisterDto registerDto = new RegisterDto();
        registerDto.setMemId(member.getMemId());
        registerDto.setMemNickname(member.getMemNickname());
        registerDto.setMemName(member.getMemName());
        registerDto.setMemEmail(member.getMemEmail());
        registerDto.setMemPhone(member.getMemPhone());
        registerDto.setMemAddr(member.getMemAddr());

        return registerDto;
    }

    public RegisterDto getMemberProfile() {
        Member member = myPageRepository.findById(1L).orElse(null); // 1L은 회원의 고유 ID로 수정해야 합니다.
        if (member == null) {
            throw new RuntimeException("회원 정보를 찾을 수 없습니다.");
        }
        return mapRegisterDto(member);
    }

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
