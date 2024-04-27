package com.jujeob.service;

import com.jujeob.entity.SubCategory;
import com.jujeob.repository.SubCategoryRepository;
import org.hibernate.service.spi.InjectService;
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

class SubCategoryServiceTest {

    @InjectMocks
    private SubCategoryService subCategoryService;

    @Mock
    private SubCategoryRepository subCategoryRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("상품 하위카테고리 이름 조회에 성공한다")
    void findCategoryNameByCategoryNo() {
        // given
        List<String> mockSubCategoryNames = Arrays.asList("맑음", "흐림");
        when(subCategoryRepository.getCategoryNameByCategoryNoUsingQuerydsl(1)).thenReturn(mockSubCategoryNames);
        // when
        List<String> subCategoryList = subCategoryService.findCategoryNameByCategoryNo(1);
        // then
        assertEquals(2, subCategoryList.size()); // 리스트 크기 확인
        assertTrue(subCategoryList.contains("맑음"));
        assertTrue(subCategoryList.contains("흐림"));
    }
}