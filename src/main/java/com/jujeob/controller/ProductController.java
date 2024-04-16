package com.jujeob.controller;

import com.jujeob.dto.ProductListDto;
import com.jujeob.entity.LikeProduct;
import com.jujeob.entity.Product;
import com.jujeob.entity.SubCategory;
import com.jujeob.repository.LikeProductRepository;
import com.jujeob.service.CategoryService;
import com.jujeob.service.ProductService;
import com.jujeob.service.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class ProductController {

    @Autowired
    ProductService productService;

    @Autowired
    CategoryService categoryService;

    @Autowired
    SubCategoryService subCategoryService;

    @Autowired
    LikeProductRepository likeProductRepository;


    // 상품 전체 조회
    @GetMapping("/api/productList")
    public List<ProductListDto> showProductList() {
        return productService.showAllProductList();
    }

    // 오늘의 추천 주류 조회
    @GetMapping("/api/todayRecommend")
    public List<ProductListDto> showTodayRecommend() {
        return productService.showTodayRecommend();
    }

    // 카테고리별 주류 조회
    @PostMapping("/api/selectedCategoryNo")
    public List<ProductListDto> showProductListByCategory (@RequestBody Map<String, Object> requestBody) {
        Integer categoryNoObject = (Integer) requestBody.get("categoryNo");
        if (categoryNoObject == null) {// categoryNo가 없을 경우에 대한 처리 -> 빈 목록 반환
            return Collections.emptyList();
        }
        int categoryNo = categoryNoObject;
        List<String> subCategories = subCategoryService.findCategoryNameByCategoryNo(categoryNo);
        return productService.findProductListBySubCategories(subCategories);
    }

    // 서브카테고리별 주류 조회
    @PostMapping("/api/selectedSubCategoryName")
    public List<ProductListDto> showProductListByCategoryNameAndKeyword(@RequestBody Map<String, String> requestBody) {
        String subCategoryName = requestBody.get("subCategory");
        return productService.showProductListByCategoryNameAndKeyword(subCategoryName);
    }

    @GetMapping("/api/productDetail/{productNo}")
    public Optional<Product> getProductDetails(@PathVariable Integer productNo) {
        return productService.getProductByProductNo(productNo);
    }
    // 주종 화면에 띄우기
    @GetMapping("/api/showProductMainType")
    public List<String> getProductId() {
        return productService.getProductId();
    }

    // 선택된 주종으로 주종의 type 조회
    @PostMapping("api/selectedMainType")
    public Map<String, List<String>> getProductType(@RequestBody Map<String, List<String>> requestBody) {
        List<String> mainTypes = requestBody.get("mainType");
        return productService.getProductTypesByMainTypes(mainTypes);
    }

    // 선택된 주종으로 해당 상품 조회
    @PostMapping("api/productListByMainType")
    public List<ProductListDto> showProductListByMainType(@RequestBody Map<String, List<String>> requestBody) {
        List<String> mainTypes = requestBody.get("mainType");
        return productService.getProductListByMainType(mainTypes);
    }

    // 선택된 체크박스의 type으로 해당 상품 찾아오기
    @PostMapping("/api/productListByType")
    public List<ProductListDto> showProductListByType(@RequestBody Map<String, List<String>> requestBody) {
        List<String> types = requestBody.get("types");
       return productService.getProductListByType(types);
    }

    // 선택된 체크박스의 level로 해당 상품 찾아오기
    @PostMapping("/api/productListByAlcoholLevel")
    public List<ProductListDto> showProductListByAlcoholLevel(@RequestBody Map<String, List<String>> requestBody) {
        List<String> alcoholLevels = requestBody.get("levels");
        return productService.getProductListByAlcohol(alcoholLevels);
    }

    // 선택된 체크박스의 price로 해당 상품 찾아오기
    @PostMapping("/api/productListByPrice")
    public List<ProductListDto> showProductListByPrice(@RequestBody Map<String, List<String>> requestBody) {
        List<String> prices = requestBody.get("prices");
        return productService.getProductListByPrice(prices);
    }

    // 필터링 조건에 따라 사용자가 원하는 상품 찾아오기
    @PostMapping("/api/submitSelections")
    public ResponseEntity<List<ProductListDto>> showProductListByFiltering(@RequestBody Map<String, List<String>> filters) {
        List<ProductListDto> products = productService.getProductListByFilterOption(filters);
        return ResponseEntity.ok(products);
    }

    // 검색어에 따라 사용자가 원하는 상품 찾아오기
    @PostMapping("/api/productListBySearch")
    public List<ProductListDto> showProductListBySearchkeyword(@RequestBody Map<String, String> requestBody) {
        String searchKeyword = requestBody.get("searchKeyword");
        return productService.getProductListBySearchKeyword(searchKeyword);
    }

    // 상품 좋아요 버튼
    @PostMapping("/api/likeProduct")
    public ResponseEntity<String> likeProduct(@RequestBody LikeProduct likeProduct) {
        Optional<LikeProduct> existingLike = likeProductRepository
                .findByMemberNoAndProductId(likeProduct.getMemberNo(), likeProduct.getProductId());
        if (existingLike.isPresent()) {
            LikeProduct currentLike = existingLike.get();
            currentLike.setLikeStatus(currentLike.getLikeStatus().equals("Y") ? "N" : "Y");
            likeProductRepository.save(currentLike);
            return ResponseEntity.ok(currentLike.getLikeStatus().equals("Y") ? "좋아요 성공🙂" : "좋아요 취소😭");
        } else {
            likeProduct.setLikeStatus("Y");
            likeProductRepository.save(likeProduct);
            return ResponseEntity.ok("좋아요 성공🙂");
        }
    }
}
