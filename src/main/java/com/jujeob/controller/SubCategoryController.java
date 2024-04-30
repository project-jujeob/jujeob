package com.jujeob.controller;

import com.jujeob.entity.Category;
import com.jujeob.service.CategoryService;
import com.jujeob.service.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SubCategoryController {

    @Autowired
    CategoryService categoryService;

    @Autowired
    SubCategoryService subCategoryService;

    @GetMapping("/api/subCategory")
    public List<String> findSubCategoryName(@RequestParam int categoryNo) {

        Category category = categoryService.getCategoryNo(categoryNo).get();

        return subCategoryService.findCategoryNameByCategoryNo(category.getCategoryNo());
    }
}