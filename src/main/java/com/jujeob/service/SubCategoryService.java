package com.jujeob.service;

import com.jujeob.entity.SubCategory;
import com.jujeob.repository.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubCategoryService {

    @Autowired
    SubCategoryRepository subCategoryRepository;

    public List<String> findCategoryNameByCategoryNo(Integer categoryNo) {
        return subCategoryRepository.getCategoryNameByCategoryNoUsingQuerydsl(categoryNo);
    }
}
