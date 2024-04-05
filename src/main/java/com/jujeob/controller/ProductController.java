package com.jujeob.controller;

import com.jujeob.dto.ProductListDto;
import com.jujeob.entity.Product;
import com.jujeob.entity.SubCategory;
import com.jujeob.service.CategoryService;
import com.jujeob.service.ProductService;
import com.jujeob.service.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
    @PostMapping("/api/selectedCategoryNo")
    public List<ProductListDto> showProductListByCategory (@RequestBody Map<String, Object> requestBody) {
        Integer categoryNoObject = (Integer) requestBody.get("categoryNo");
        if (categoryNoObject == null) {// categoryNo가 없을 경우에 대한 처리 -> 빈 목록 반환
            return Collections.emptyList();
        }
        int categoryNo = categoryNoObject.intValue();

        List<String> subCategories = subCategoryService.findCategoryNameByCategoryNo(categoryNo);

        return productService.findProductListBySubCategories(subCategories);
    }


    // 서브카테고리별 주류 조회
    @PostMapping("/api/selectedSubCategoryName")
    public List<ProductListDto> showProductListByCategoryNameAndKeyword(@RequestBody Map<String, String> requestBody) {
        String subCategoryName = requestBody.get("subCategory");

        return productService.showProductListByCategoryNameAndKeyword(subCategoryName);
    }


    @GetMapping("/api/productDetail/{productNo}")
    public Optional<Product> getProductDetails(@PathVariable Integer productNo) {
        Optional<Product> product = productService.getProductByProductNo(productNo);
        return product;
    }
}
