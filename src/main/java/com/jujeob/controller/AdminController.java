package com.jujeob.controller;

import com.jujeob.dto.GetUsersDto;
import com.jujeob.dto.ProductAdminDto;
import com.jujeob.dto.ProductEditDto;
import com.jujeob.dto.ProductRegisterDto;
import com.jujeob.entity.Announcement;
import com.jujeob.entity.Product;
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
    UserRepository userRepository;

   @Autowired
    AnnouncementRepository announcementRepository;

   @Autowired
    ProductRepository productRepository;

   @Autowired
    StockRepository stockRepository;

    @PostMapping("api/registerProduct")
    public Product registerProduct(@ModelAttribute ProductRegisterDto productRegisterDto) {
        return productService.registerProduct(productRegisterDto);
    }

    @GetMapping("/api/showUserInfo")
    public List<GetUsersDto> getUsers() {
        List<User> users = userRepository.findAll();
        List<GetUsersDto> memberDto = new ArrayList<>();
        for (User user : users) {
            GetUsersDto dto = new GetUsersDto(user.getUserId(), user.getNickname(), user.getName(),
                    user.getEmail(), user.getPhone(), user.getAddress(),
                    user.getDeleted(), user.getCreateDate());
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

    @GetMapping("/api/getProductListForAdmin")
    public List<ProductAdminDto> getProductListForAdmin() {
        return productService.showAllProductListAndStock();
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
}
