
package com.jujeob.service;

import com.jujeob.dto.ProductListDto;
import com.jujeob.entity.Product;
import com.jujeob.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.*;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class ProductServiceTest {

    @InjectMocks
    private ProductService productService;

    @Mock
    private ProductRepository productRepository;

    private Product product1;
    private Product product2;
    private List<Product> mockProducts;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);

        product1 = new Product();
        product1.setImg("감자이미지어쩌구");
        product1.setName("감자맥주");
        product1.setDescription("이 맥주는 강판에 갈은 감자로 원래는 감자전을 만드려했으나 실패하여 맥주가 되었다");
        product1.setAlcohol(5);
        product1.setPrice(4500);
        product1.setProductNo(1);

        product2 = new Product();
        product2.setImg("고사리이미지어쩌구");
        product2.setName("고사리맥주");
        product2.setDescription("이 맥주는 밭에서 난 고사리로 만든 맥주이다");
        product2.setAlcohol(5.5);
        product2.setPrice(5500);
        product2.setProductNo(2);

        mockProducts = Arrays.asList(product1, product2);
    }


    @Test
    public void testGetProductByProductNo() {

        // Mocking the ProductRepository
        ProductRepository productRepositoryMock = mock(ProductRepository.class);


        // Creating a sample Product
        Product sampleProduct = new Product();
        sampleProduct.setProductNo(1);
        sampleProduct.setName("Sample Product");

        // Stubbing the findById method to return the sample product
        when(productRepositoryMock.findById(1)).thenReturn(Optional.of(sampleProduct));

        ProductService productService = new ProductService(productRepositoryMock);

        // Calling the service method
        Optional<Product> result = productService.getProductByProductNo(1);

        // Asserting the result
        assertEquals("Sample Product", result.isPresent() ? result.get().getName() : null);
    }

    @Test
    @DisplayName("showAllProductList : 전체 상품을 조회한다")
    void showAllProductList() {
        // given
        when(productRepository.findAll()).thenReturn(mockProducts);

        // when
        List<ProductListDto> productList = productService.showAllProductList();

        // then
        assertEquals(2, productList.size());
        assertEquals("감자맥주", productList.get(0).getName());
        assertEquals(5500, productList.get(1).getPrice());
    }

    @Test
    @DisplayName("showTodayRecommend : 오늘의 추천 상품 조회에 성공한다")
    void showTodayRecommend() {
        // given
        when(productRepository.findRandom5()).thenReturn(mockProducts);

        // when
        List<ProductListDto> result = productService.showTodayRecommend();

        // then
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("감자맥주", result.get(0).getName());
    }

    @Test
    @DisplayName("showProductListByCategoryNameAndKeyword : 카테고리별 상품 조회에 성공한다")
    void showProductListByCategoryNameAndKeyword() {
        // given
        String subCategoryName = "우울";
        when(productRepository.findProductListByCategoryNameAndKeyword(subCategoryName)).thenReturn(mockProducts);

        // when
        List<ProductListDto> result = productService.showProductListByCategoryNameAndKeyword(subCategoryName);

        // then
        assertEquals(2, result.size());
        assertEquals("감자맥주", result.get(0).getName());
        assertEquals("고사리맥주", result.get(1).getName());
    }

    @Test
    @DisplayName("findProductListBySubCategories : 하위카테고리별 상품 조회에 성공한다")
    void findProductListBySubCategories() {
        // given
        List<String> subCategories = Arrays.asList("좋음", "맑음");
        when(productRepository.findProductListByCategory(subCategories)).thenReturn(mockProducts);

        // when
        List<ProductListDto> result = productService.findProductListBySubCategories(subCategories);

        // then
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("감자맥주", result.get(0).getName());
    }

    @Test
    @DisplayName("getProductId : 상품 주종번호 조회에 성공한다")
    void getProductId() {
        // given
        List<String> mockProductIdList = Arrays.asList("1", "2", "3");
        when(productRepository.findProductId()).thenReturn(mockProductIdList);

        // when
        List<String> productIdList = productService.getProductId();

        // then
        assertEquals(mockProductIdList.size(), productIdList.size());
        assertEquals(mockProductIdList, productIdList);
    }

    @Test
    @DisplayName("getProductTypesByMainTypes : 주종(들)에 따른 상품의 type을 조회해온다")
    void getProductTypesByMainTypes() {
        // given
        List<String> mainTypes = Arrays.asList("1", "2");
        List<String> typesForMainType1 = Arrays.asList("맑음", "흐림");
        List<String> typesForMainType2 = Arrays.asList("좋음", "화남");

        when(productRepository.findType("1")).thenReturn(typesForMainType1);
        when(productRepository.findType("2")).thenReturn(typesForMainType2);

        Map<String, List<String>> expectedMap = new HashMap<>();
        expectedMap.put("1", typesForMainType1);
        expectedMap.put("2", typesForMainType2);

        // when
        Map<String, List<String>> result = productService.getProductTypesByMainTypes(mainTypes);

        // then
        assertEquals(expectedMap, result);
    }

    @Test
    @DisplayName("getProductListByMainType : 주종에 따른 상품 목록을 조회해온다")
    void getProductListByMainType() {
        // given
        List<String> mainTypes = Arrays.asList("1", "2");

        List<Product> productsListByMainType = Arrays.asList(product1, product2);
        when(productRepository.findProductListByMainType("1")).thenReturn(productsListByMainType);

        List<ProductListDto> expectedDtoList = new ArrayList<>();
        expectedDtoList.add(new ProductListDto(product1.getImg(), product1.getName(), product1.getDescription(), product1.getAlcohol(), product1.getPrice(), product1.getProductNo()));
        expectedDtoList.add(new ProductListDto(product2.getImg(), product2.getName(), product2.getDescription(), product2.getAlcohol(), product2.getPrice(), product2.getProductNo()));

        // when
        List<ProductListDto> result = productService.getProductListByMainType(mainTypes);

        // then
        assertEquals(expectedDtoList.size(), result.size());
        for (int i = 0; i < result.size(); i++) {
            assertEquals(expectedDtoList.get(i).getName(), result.get(i).getName());
        }
    }

    @Test
    @DisplayName("getProductListByType : type에 따른 상품 목록을 조회해온다")
    void getProductListByType() {
        // given
        List<String> types = Arrays.asList("맥주", "에일");

        List<Product> productLisByType = Arrays.asList(product1, product2);
        when(productRepository.findProductListByType("맥주")).thenReturn(productLisByType);

        List<ProductListDto> expectedDtoList = new ArrayList<>();
        expectedDtoList.add(new ProductListDto(product1.getImg(), product1.getName(), product1.getDescription(), product1.getAlcohol(), product1.getPrice(), product1.getProductNo()));
        expectedDtoList.add(new ProductListDto(product2.getImg(), product2.getName(), product2.getDescription(), product2.getAlcohol(), product2.getPrice(), product2.getProductNo()));

        // when
        List<ProductListDto> result = productService.getProductListByType(types);

        // then
        assertEquals(expectedDtoList.size(), result.size());
        for (int i = 0; i < result.size(); i++) {
            assertEquals(expectedDtoList.get(i).getName(), result.get(i).getName());
        }
    }

    @Test
    @DisplayName("getProductListByAlcohol : 도수에 따른 상품 목록을 조회해온다")
    void getProductListByAlcohol() {
        // given
        List<String> alcoholLevels = Arrays.asList("level1", "level2");

        List<Product> productLisByAlcoholLevel = Arrays.asList(product1, product2);
        when(productRepository.findProductListByAlcohol("level1")).thenReturn(productLisByAlcoholLevel);

        List<ProductListDto> expectedDtoList = new ArrayList<>();
        expectedDtoList.add(new ProductListDto(product1.getImg(), product1.getName(), product1.getDescription(), product1.getAlcohol(), product1.getPrice(), product1.getProductNo()));
        expectedDtoList.add(new ProductListDto(product2.getImg(), product2.getName(), product2.getDescription(), product2.getAlcohol(), product2.getPrice(), product2.getProductNo()));

        // when
        List<ProductListDto> result = productService.getProductListByAlcohol(alcoholLevels);

        // then
        assertEquals(expectedDtoList.size(), result.size());
        for (int i = 0; i < result.size(); i++) {
            assertEquals(expectedDtoList.get(i).getName(), result.get(i).getName());
        }
    }

    @Test
    @DisplayName("getProductListByPrice : 가격에 따른 상품 목록을 조회해온다")
    void getProductListByPrice() {
        // given
        List<String> prices = Arrays.asList("price1", "price2");

        List<Product> productLisByPrice = Arrays.asList(product1, product2);
        when(productRepository.findProductListByPrice("price1")).thenReturn(productLisByPrice);

        List<ProductListDto> expectedDtoList = new ArrayList<>();
        expectedDtoList.add(new ProductListDto(product1.getImg(), product1.getName(), product1.getDescription(), product1.getAlcohol(), product1.getPrice(), product1.getProductNo()));
        expectedDtoList.add(new ProductListDto(product2.getImg(), product2.getName(), product2.getDescription(), product2.getAlcohol(), product2.getPrice(), product2.getProductNo()));

        // when
        List<ProductListDto> result = productService.getProductListByPrice(prices);

        // then
        assertEquals(expectedDtoList.size(), result.size());
        for (int i = 0; i < result.size(); i++) {
            assertEquals(expectedDtoList.get(i).getName(), result.get(i).getName());
        }
    }

}

