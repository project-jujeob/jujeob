
package com.jujeob.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
        ProductListDto productDto1 = new ProductListDto("감자이미지어쩌구", "감자맥주", "이 맥주는 강판에 갈은 감자로 원래는 감자전을 만드려했으나 실패하여 맥주가 되었다", 5, 4500, 1);
        ProductListDto productDto2 = new ProductListDto("고사리이미지어쩌구", "고사리맥주", "이 맥주는 밭에서 난 고사리로 만든 맥주이다", 5.5, 5500, 2);

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
                .andExpect(jsonPath("$[1].price").value(5500));
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

    @Test
    @DisplayName("showProductListByCategory : 카테고리별 상품 조회에 성공한다")
    @WithMockUser
    void showProductListByCategory() throws Exception{
        Integer categoryNo = 1;
        List<String> subCategories = Arrays.asList("좋음", "맑음");
        when(subCategoryService.findCategoryNameByCategoryNo(categoryNo)).thenReturn(subCategories);
        when(productService.findProductListBySubCategories(subCategories)).thenReturn(mockProductListDtos);

        // when & then
        mockMvc.perform(post("/api/selectedCategoryNo")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"categoryNo\": " + categoryNo + "}")
                .with(csrf()))  //  추가하기전 시큐리티에 의해 403오류 발생해 넣음
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("감자맥주"));
    }

    @Test
    @DisplayName("showProductListByCategoryNameAndKeyword : 하위 카테고리별 상품 조회에 성공한다")
    @WithMockUser
    void showProductListByCategoryNameAndKeyword() throws Exception{
        String subCategoryName = "가족과";
        when(productService.showProductListByCategoryNameAndKeyword(subCategoryName)).thenReturn(mockProductListDtos);

        // when & then
        mockMvc.perform(post("/api/selectedSubCategoryName")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"subCategory\": \"" + subCategoryName + "\"}")
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].price").value(4500));
    }

    @Test
    @DisplayName("getProductId : 주종을 조회한다")
    @WithMockUser
    void getProductId() throws Exception {
        //given
        List<String> expectedProductIds = Arrays.asList("1", "2", "3", "4");
        when(productService.getProductId()).thenReturn(expectedProductIds);

        // when & then
        mockMvc.perform(get("/api/showProductMainType"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0]").value("1"))
                .andExpect(jsonPath("$[3]").value("4"));

    }

    @Test
    @DisplayName("getProductType : 주종으로 type을 조회한다")
    @WithMockUser
    void getProductType() throws Exception{
        // given
        List<String> mainTypes = Arrays.asList("1", "2", "3", "4");
        Map<String, List<String>> expectedTypes = new HashMap<>();
        expectedTypes.put("1", Arrays.asList("맥주", "에일", "라거"));
        when(productService.getProductTypesByMainTypes(mainTypes)).thenReturn(expectedTypes);

        // when & then
        mockMvc.perform(post("/api/selectedMainType")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"mainType\": " + new ObjectMapper().writeValueAsString(mainTypes) + "}")
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.['1'][0]").value("맥주"));

    }

    @Test
    @DisplayName("showProductListByMainType : 주종에 따른 상품을 조회한다")
    @WithMockUser
    void showProductListByMainType() throws Exception {
        // given
        List<String> mainTypes = Arrays.asList("1", "2", "3", "4");
        when(productService.getProductListByMainType(mainTypes)).thenReturn(mockProductListDtos);

        // when & then
        mockMvc.perform(post("/api/productListByMainType")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"mainType\": " + new ObjectMapper().writeValueAsString(mainTypes) + "}")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(mockProductListDtos.size())))
                .andExpect(jsonPath("$[0].name").value(mockProductListDtos.get(0).getName()))
                .andExpect(jsonPath("$[1].price").value(mockProductListDtos.get(1).getPrice()));
    }

    @Test
    @DisplayName("showProductListByType : type별 상품 조회에 성공한다")
    @WithMockUser
    void showProductListByType() throws Exception{
        // given
        List<String> types = Arrays.asList("레드와인", "화이트와인", "로제와인");
        when(productService.getProductListByType(types)).thenReturn(mockProductListDtos);

        // when & then
        mockMvc.perform(post("/api/productListByType")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"types\": " + new ObjectMapper().writeValueAsString(types) + "}")
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(mockProductListDtos.size())))
                .andExpect(jsonPath("$[0].name").value(mockProductListDtos.get(0).getName()));

    }

    @Test
    @DisplayName("showProductListByAlcoholLevel : 도수별 상품 조회에 성공한다")
    @WithMockUser
    void showProductListByAlcoholLevel() throws Exception {
        // given
        List<String> alcoholLevels = Arrays.asList("level1", "level2", "level3", "level4", "level5");
        when(productService.getProductListByAlcohol(alcoholLevels)).thenReturn(mockProductListDtos);

        // when & then
        mockMvc.perform(post("/api/productListByAlcoholLevel")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"levels\": " + new ObjectMapper().writeValueAsString(alcoholLevels) + "}")
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(mockProductListDtos.size())))
                .andExpect(jsonPath("$[0].name").value(mockProductListDtos.get(0).getName()))
                .andExpect(jsonPath("$[1].price").value(mockProductListDtos.get(1).getPrice()));
        }

    @Test
    @DisplayName("showProductListByPrice : 가격별 상품 조회에 성공한다")
    @WithMockUser
    void showProductListByPrice() throws Exception {
        // given
        List<String> prices = Arrays.asList("price1", "price2", "price3", "price4", "price5", "price6");
        when(productService.getProductListByPrice(prices)).thenReturn(mockProductListDtos);
        // when & then
        mockMvc.perform(post("/api/productListByPrice")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"prices\": " + new ObjectMapper().writeValueAsString(prices) + "}")
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(mockProductListDtos.size())))
                .andExpect(jsonPath("$[0].name").value(mockProductListDtos.get(0).getName()))
                .andExpect(jsonPath("$[1].price").value(mockProductListDtos.get(1).getPrice()));

    }
}

