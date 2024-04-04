package com.jujeob.controller;

import com.jujeob.dto.ProductListDto;
import com.jujeob.entity.Product;
import com.jujeob.service.CategoryService;
import com.jujeob.service.ProductService;
import com.jujeob.service.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
public class ProductController {

    @Autowired
    ProductService productService;

    @Autowired
    CategoryService categoryService;

    @Autowired
    SubCategoryService subCategoryService;


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

    // 카테고리별 주류 조회
    @PostMapping("/api/categoryNo")
    public List<ProductListDto> showProductListByCategory (@RequestBody Map<String, Object> requestBody) {
        Integer categoryNoObject = (Integer) requestBody.get("categoryNo");
        if (categoryNoObject == null) {// categoryNo가 없을 경우에 대한 처리 -> 빈 목록 반환
            return Collections.emptyList();
        }
        int categoryNo = categoryNoObject.intValue();

        List<String> subCategories = subCategoryService.findCategoryNameByCategoryNo(categoryNo);

        List<ProductListDto> p = productService.findProductListBySubCategories(subCategories);
        System.out.println(p.size());
        return p;
    }


    // 서브카테고리별 주류 조회
    @GetMapping("/api/productListByCategory/{subCategoryName}")
    public List<ProductListDto> showProductListByCategoryNameAndKeyword(@PathVariable String subCategoryName) {
        return productService.showProductListByCategoryNameAndKeyword(subCategoryName);
    }
}
