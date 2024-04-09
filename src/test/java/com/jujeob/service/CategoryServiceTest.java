package com.jujeob.service;

import com.jujeob.entity.Category;
import com.jujeob.repository.CategoryRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;

public class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryService categoryService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGetCategoryList() {
        // Mock 데이터 설정
        List<Category> mockCategoryList = new ArrayList<>();
        mockCategoryList.add(new Category(1, "Category 1"));
        mockCategoryList.add(new Category(2, "Category 2"));

        // Mockito when을 사용하여 categoryRepository의 findAll() 메서드가 호출될 때 mockCategoryList 반환하도록 설정
        when(categoryRepository.findAll()).thenReturn(mockCategoryList);

        // 카테고리 서비스의 getCategoryList() 메서드 호출
        List<Category> retrievedCategoryList = categoryService.getCategoryList();

        // 반환된 카테고리 리스트가 예상대로인지 확인
        Assertions.assertEquals(mockCategoryList.size(), retrievedCategoryList.size());
        for (int i = 0; i < mockCategoryList.size(); i++) {
            Assertions.assertEquals(mockCategoryList.get(i).getCategoryNo(), retrievedCategoryList.get(i).getCategoryNo());
            Assertions.assertEquals(mockCategoryList.get(i).getCategoryName(), retrievedCategoryList.get(i).getCategoryName());
        }
    }
}
