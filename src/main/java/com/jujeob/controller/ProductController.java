package com.jujeob.controller;

import com.jujeob.dto.ProductListDto;
import com.jujeob.entity.Product;
import com.jujeob.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {

    @Autowired
    ProductService productService;

    // 상품 전체 조회
    @GetMapping("/api/productList")
    public List<ProductListDto> showProductList() {

        return productService.showAllProductList();
    }

    // 오늘의 추천 주류 조회
    @GetMapping("/api/todayRecommend")
    public List<ProductListDto> showTodayRecommend() {
        return productService.showTodayRecommend();
    }
}
