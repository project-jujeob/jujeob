package com.jujeob.controller;

import com.jujeob.entity.Category;
import com.jujeob.entity.SubCategory;
import com.jujeob.service.CategoryService;
import com.jujeob.service.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SubCategoryController {

    @Autowired
    CategoryService categoryService;

    @Autowired
    SubCategoryService subCategoryService;

    @GetMapping("/api/categoryNo")
    public List<String> findSubCategoryName(int categoryNo) {

        Category category = categoryService.getCategoryNo(categoryNo).get();

        List<String> subCategories = subCategoryService.findCategoryNameByCategoryNo(category.getCategoryNo());

        return subCategories;
    }
}
