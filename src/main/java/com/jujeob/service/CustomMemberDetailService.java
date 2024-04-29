//package com.jujeob.service;
//
//import com.jujeob.dto.CustomMemberDetailDto;
//import com.jujeob.entity.Member;
//import com.jujeob.repository.MemberRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
//@Service
//public class CustomMemberDetailService implements UserDetailsService {
//
//    @Autowired
//    MemberRepository memberRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//
//        Optional<Member> member = memberRepository.findByMemId(username);
//
//        if(member.isPresent()) {
//            return new CustomMemberDetailDto(member);
//        }
//        return null;
//    }
//}