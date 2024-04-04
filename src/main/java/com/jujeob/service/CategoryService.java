package com.jujeob.service;

import com.jujeob.entity.Category;
import com.jujeob.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    public List<Category> getCategoryList() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryNo(int categoryNo) {
        return categoryRepository.findById(categoryNo);
    }
}
