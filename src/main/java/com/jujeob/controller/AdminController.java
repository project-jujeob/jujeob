package com.jujeob.controller;

import com.jujeob.dto.GetMemberDto;
import com.jujeob.dto.ProductRegisterDto;
import com.jujeob.entity.Member;
import com.jujeob.entity.Product;
import com.jujeob.repository.MemberRepository;
import com.jujeob.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
public class AdminController {
    @Autowired
    ProductService productService;

   @Autowired
    MemberRepository memberRepository;

    @PostMapping("api/registerProduct")
    public Product registerProduct(@ModelAttribute ProductRegisterDto productRegisterDto) {
        System.out.println(productRegisterDto.toString());
        System.out.println(productRegisterDto.getImg());
        return productService.registerProduct(productRegisterDto);
    }

    @GetMapping("/api/showUserInfo")
    public List<GetMemberDto> getUserInfo() {
        List<Member> members = memberRepository.findAll();
        List<GetMemberDto> memberDto = new ArrayList<>();
        for (Member member : members) {
            GetMemberDto dto = new GetMemberDto(member.getMemId(), member.getMemNickname(), member.getMemName(),
                                                member.getMemEmail(), member.getMemPhone(), member.getMemAddr(),
                                                member.getCreateDate(), member.getMemDeleted());
            memberDto.add(dto);
        }
        return memberDto;
    }
}
