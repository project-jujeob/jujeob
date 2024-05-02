package com.jujeob.controller;

import com.jujeob.dto.*;
import com.jujeob.entity.Announcement;
import com.jujeob.entity.Product;
import com.jujeob.service.MemberService;
import com.jujeob.service.OrderService;
import com.jujeob.entity.User;
import com.jujeob.repository.AnnouncementRepository;
import com.jujeob.repository.ProductRepository;
import com.jujeob.repository.StockRepository;
import com.jujeob.repository.UserRepository;
import com.jujeob.service.ProductService;
import jakarta.transaction.Transactional;
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
    MemberService memberService;

   @Autowired
   UserRepository userRepository;

   @Autowired

    AnnouncementRepository announcementRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    StockRepository stockRepository;

   @Autowired
    OrderService orderService;

    @PostMapping("/api/admin/registerProduct")
    public Product registerProduct(@ModelAttribute ProductRegisterDto productRegisterDto) {
        return productService.registerProduct(productRegisterDto);
    }

    @GetMapping("/api/admin/showUserInfo")
    public List<GetUsersDto> getUsers() {
        List<User> users = userRepository.findAll();
        List<GetUsersDto> userDto = new ArrayList<>();
        for (User user : users) {
            GetUsersDto dto = new GetUsersDto(user.getUserId(), user.getNickname(), user.getName(),
                    user.getEmail(), user.getPhone(), user.getAddress(),
                    user.getDeleted(), user.getCreateDate());
            userDto.add(dto);
        }

        return userDto;
    }

    @PostMapping("/api/admin/userInfoBySearchOption")
    public List<GetUsersDto> getUserInfoByKeyword(@RequestBody Map<String, String> requestBody) {
        String searchType = requestBody.get("selectedSearchType");
        String keyword = requestBody.get("keyword");
        return memberService.getUserInfoByKeyword(searchType, keyword);
    }

    @PostMapping("/api/admin/AnnouncementWrite")
    public Announcement writeAnnouncement(@RequestBody Announcement announcement) {
        return announcementRepository.save(announcement);
    }

    @GetMapping("/api/AnnouncementList")
    public List<Announcement> getAnnouncementList () {
        return announcementRepository.findAll();
    }

    @PostMapping("/api/AnnouncementDelete")
    public void deleteAnnouncement(@RequestBody Map<String, Integer> requestBody) {
        long announcementNo = requestBody.get("announcementNo");
        announcementRepository.deleteById(announcementNo);
    }

    @PostMapping("/api/admin/AnnouncementUpdate")
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

    @PostMapping("/api/productDelete")
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

    @GetMapping("/api/admin/orderListForAdmin")
    public List<CheckOrderListDto> getOrderListByAdmin () {
        return orderService.getOrderListByAdmin();
    }

    @PostMapping("/api/admin/orderListBySearchOption")
    public List<CheckOrderListDto> getOrderListBySearchOption (@RequestBody Map<String, String> requestBody) {
        String searchType = requestBody.get("selectedSearchType");
        String keyword = requestBody.get("keyword");
        return orderService.getOrderListBySearchOption(searchType, keyword);
    }
}
