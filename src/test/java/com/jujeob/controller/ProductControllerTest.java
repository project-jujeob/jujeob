
package com.jujeob.controller;

import com.jujeob.dto.ProductListDto;
import com.jujeob.service.CategoryService;
import com.jujeob.service.ProductService;
import com.jujeob.service.SubCategoryService;
import org.junit.jupiter.api.BeforeEach;
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

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@WebMvcTest(ProductController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureWebMvc
public class ProductControllerTest {
//    @LocalServerPort
//    private int port;
//
//    @Autowired
//    private TestRestTemplate restTemplate;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    @MockBean
    private CategoryService categoryService;

    @MockBean
    private SubCategoryService subCategoryService;

//    @Test
//    public void testGetProductDetails() {
//        ResponseEntity<String> response = restTemplate.getForEntity("http://localhost:" + port + "/api/productDetail/1", String.class);
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        // 여기서 응답 본문을 확인하여 필요한 테스트를 추가할 수 있습니다.
//    }
    private List<ProductListDto> mockProductListDtos;

    @BeforeEach
    void setUp() {
        ProductListDto productDto1 = new ProductListDto("감자이미지어쩌구", "감자맥주", "이 맥주는 강판에 갈은 감자로 원래는 감자전을 만드려했으나 실패하여 맥주가 되었다", "5%", "4500원", 1);
        ProductListDto productDto2 = new ProductListDto("고사리이미지어쩌구", "고사리맥주", "이 맥주는 밭에서 난 고사리로 만든 맥주이다", "5.5%", "5500원", 2);

        mockProductListDtos = Arrays.asList(productDto1, productDto2);
    }

    @Test
    @DisplayName("showProductList : 상품 전체 조회에 성공한다.")
    @WithMockUser
    void showProductList() throws Exception{
        // given
        when(productService.showAllProductList()).thenReturn(mockProductListDtos);

        // when  &  then
        mockMvc.perform(get("/api/productList")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].name").value("감자맥주"))
                .andExpect(jsonPath("$[1].price").value("5500원"));
    }

    @Test
    @DisplayName("showTodayRecommend : 오늘의 추천 상품 조회에 성공한다")
    @WithMockUser
    void showTodayRecommend() throws Exception {
        when(productService.showTodayRecommend()).thenReturn(mockProductListDtos);

        // when & then
        mockMvc.perform(get("/api/todayRecommend")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("감자맥주"));
    }
}

