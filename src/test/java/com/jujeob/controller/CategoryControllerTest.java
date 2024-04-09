package com.jujeob.controller;

import com.jujeob.entity.Category;
import com.jujeob.service.CategoryService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;

public class CategoryControllerTest {

    @Mock
    private CategoryService categoryService;

    @InjectMocks
    private CategoryController categoryController;

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

        // Mockito when을 사용하여 categoryService의 getCategoryList() 메서드가 호출될 때 mockCategoryList 반환하도록 설정
        when(categoryService.getCategoryList()).thenReturn(mockCategoryList);

        // 컨트롤러의 getCategoryList() 메서드 호출
        ResponseEntity<List<Category>> responseEntity = (ResponseEntity<List<Category>>) categoryController.getCategoryList();

        // 반환된 ResponseEntity의 상태코드가 OK인지 확인
        Assertions.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        // 반환된 카테고리 리스트가 예상대로인지 확인
        List<Category> retrievedCategoryList = responseEntity.getBody();
        Assertions.assertNotNull(retrievedCategoryList);
        Assertions.assertEquals(mockCategoryList.size(), retrievedCategoryList.size());
        for (int i = 0; i < mockCategoryList.size(); i++) {
            Assertions.assertEquals(mockCategoryList.get(i).getCategoryNo(), retrievedCategoryList.get(i).getCategoryNo());
            Assertions.assertEquals(mockCategoryList.get(i).getCategoryName(), retrievedCategoryList.get(i).getCategoryName());
        }
    }
}
