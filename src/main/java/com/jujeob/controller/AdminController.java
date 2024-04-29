package com.jujeob.controller;

import com.jujeob.dto.*;
import com.jujeob.entity.Announcement;
import com.jujeob.entity.Member;
import com.jujeob.entity.Product;
import com.jujeob.repository.*;
import com.jujeob.service.MemberService;
import com.jujeob.service.OrderService;
import com.jujeob.service.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
public class AdminController {
    @Autowired
    ProductService productService;

    @Autowired
    MemberService memberService;

   @Autowired
    MemberRepository memberRepository;

   @Autowired
    AnnouncementRepository announcementRepository;

   @Autowired
    ProductRepository productRepository;

   @Autowired
    StockRepository stockRepository;

   @Autowired
    OrderService orderService;

    @PostMapping("api/registerProduct")
    public Product registerProduct(@ModelAttribute ProductRegisterDto productRegisterDto) {
        return productService.registerProduct(productRegisterDto);
    }

    @GetMapping("/api/showUserInfo")
    public List<GetMemberDto> getUserInfo() {
        List<Member> members = memberRepository.findAllNonAdminUsers();
        List<GetMemberDto> memberDto = new ArrayList<>();
        for (Member member : members) {
            GetMemberDto dto = new GetMemberDto(member.getMemId(), member.getMemNickname(), member.getMemName(),
                                                member.getMemEmail(), member.getMemPhone(), member.getMemAddr(),
                                                member.getCreateDate(), member.getMemDeleted());
            memberDto.add(dto);
        }
        return memberDto;
    }
    
    @PostMapping("/api/userInfoBySearchOption")
    public List<GetMemberDto> getUserInfoByKeyword(@RequestBody Map<String, String> requestBody) {
        String searchType = requestBody.get("selectedSearchType");
        String keyword = requestBody.get("keyword");
        return memberService.getUserInfoByKeyword(searchType, keyword);
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

    @GetMapping("/api/getProductListForAdmin")
    public List<ProductAdminDto> getProductListForAdmin() {
        return productService.showAllProductListAndStock();
    }

    @PostMapping("/api/productListForAdminBySearchOption")
    public List<ProductAdminDto> getProductListForAdminByKeyword(@RequestBody Map<String, String> requestbody) {
        String keyword = requestbody.get("keyword");
        return productService.findProductListAndStockForAdminByKeyword(keyword);
    }

    @PostMapping("api/productDelete")
    @Transactional
    public void deleteProductListByAdmin(@RequestBody Map<String, Integer> requestBody) {
        Integer productNo = requestBody.get("productNo");
        productRepository.deleteById(productNo);
        stockRepository.deleteByProductNo(productNo);
    }

    @GetMapping("/api/getProductDetails/{productNo}")
    public ProductEditDto getProductDetailsByProductNo(@PathVariable Integer productNo) {
        return productService.getProductAndStockByProductNo(productNo);
    }

    @PostMapping("/api/updateProductDetails")
    public Product updateProductDetailsAndStock(@ModelAttribute ProductRegisterDto productRegisterDto) {
        return productService.updateProductDetail(productRegisterDto);
    }

    @GetMapping("/api/orderListForAdmin")
    public List<CheckOrderListDto> getOrderListByAdmin () {
        return orderService.getOrderListByAdmin();
    }

    @PostMapping("/api/orderListBySearchOption")
    public List<CheckOrderListDto> getOrderListBySearchOption (@RequestBody Map<String, String> requestBody) {
        String searchType = requestBody.get("selectedSearchType");
        String keyword = requestBody.get("keyword");
        return orderService.getOrderListBySearchOption(searchType, keyword);
    }
}
