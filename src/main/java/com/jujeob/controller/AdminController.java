package com.jujeob.controller;

import com.jujeob.dto.GetMemberDto;
import com.jujeob.dto.ProductRegisterDto;
import com.jujeob.entity.Announcement;
import com.jujeob.entity.Member;
import com.jujeob.entity.Product;
import com.jujeob.repository.AnnouncementRepository;
import com.jujeob.repository.MemberRepository;
import com.jujeob.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@RestController
public class AdminController {
    @Autowired
    ProductService productService;

   @Autowired
    MemberRepository memberRepository;

   @Autowired
    AnnouncementRepository announcementRepository;

    @PostMapping("api/registerProduct")
    public Product registerProduct(@ModelAttribute ProductRegisterDto productRegisterDto) {
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

    @PostMapping("/api/AnnouncementWrite")
    public Announcement writeAnnouncement(@RequestBody Announcement announcement) {

        return announcementRepository.save(announcement);
    }

    @GetMapping("/api/AnnouncementList")
    public List<Announcement> getAnnouncementList () {
        return announcementRepository.findAll();
    }

    @PostMapping("api/AnnouncementDelete")
    public void deleteAnnouncement(@RequestBody Map<String, Integer> requestBody) {
        long announcementNo = requestBody.get("announcementNo");
        announcementRepository.deleteById(announcementNo);
    }

    @PostMapping("/api/AnnouncementUpdate")
    public Announcement editAnnouncement(@RequestBody Announcement announcement) {
        System.out.println(announcement);
        return announcementRepository.save(announcement);
    }
}
