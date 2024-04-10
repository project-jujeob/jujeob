package com.jujeob.controller;

import com.jujeob.entity.Category;
import com.jujeob.service.CategoryService;
import com.jujeob.service.SubCategoryService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(SubCategoryController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureWebMvc
class SubCategoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SubCategoryService subCategoryService;

    @MockBean
    private CategoryService categoryService;

    @Test
    @DisplayName("findSubCategoryName : 상품 하위 카테고리 이름 조회에 성공한다")
    @WithMockUser
    void findSubCategoryName() throws Exception{
        // given
        Category mockCategory = new Category(2, "TestCategory");
        when(categoryService.getCategoryNo(2)).thenReturn(Optional.of(mockCategory));

        List<String> subCategoryNames = Arrays.asList("좋음", "나쁨");
        when(subCategoryService.findCategoryNameByCategoryNo(2)).thenReturn(subCategoryNames);

        // when & then
        mockMvc.perform(get("/api/subCategory")
                        .param("categoryNo", "2")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0]").value("좋음"));


    }
}