package com.jujeob.service;

import com.jujeob.entity.Category;
import com.jujeob.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class CategoryServiceTest {

    @InjectMocks
    private CategoryService categoryService;

    @Mock
    private CategoryRepository categoryRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("상품 카테고리 조회에 성공한다")
    void getCategoryList() {
        // given
        Category category1 = new Category(1, "날씨별");
        Category category2 = new Category(2, "기분별");
        List<Category> mockCategoryList = Arrays.asList(category1, category2);
        when(categoryRepository.findAll()).thenReturn(mockCategoryList);

        // when
        List<Category> categoryList = categoryService.getCategoryList();

        // then
        assertEquals("날씨별", categoryList.get(0).getCategoryName());
        assertEquals("기분별", categoryList.get(1).getCategoryName());
    }
}