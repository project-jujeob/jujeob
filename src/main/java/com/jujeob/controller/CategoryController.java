package com.jujeob.controller;

import com.jujeob.entity.Category;
import com.jujeob.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CategoryController {

    @Autowired
    CategoryService categoryService;


    // 상품 카테고리 조회
    @GetMapping("/api/category")
    public List<Category> getCategoryList() {
        return categoryService.getCategoryList();
    }

}
