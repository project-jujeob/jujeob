package com.jujeob.service;

import com.jujeob.dto.ProductListDto;
import com.jujeob.entity.LikeProduct;
import com.jujeob.entity.Product;
import com.jujeob.repository.LikeProductRepository;
import com.jujeob.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    LikeProductRepository likeProductRepository;

    // 기본 생성자
    public ProductService() {
        this.productRepository = null;
    }

    // 다른 생성자
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    private ProductListDto mapProductToDto(Product entity) {
        ProductListDto dto = new ProductListDto();
        dto.setImg(entity.getImg());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setAlcohol(entity.getAlcohol());
        dto.setPrice(entity.getPrice());
        dto.setProductNo(entity.getProductNo());
        return dto;
    }

    public List<ProductListDto> showAllProductList( ) {
        List<Product> products = productRepository.findAll();
        List<ProductListDto> productListDtos = new ArrayList<>();

        for (Product entity : products) {
            productListDtos.add(mapProductToDto(entity));
        }
        return productListDtos;
    }

    public List<ProductListDto> showTodayRecommend() {
        List<Product> products = productRepository.findRandom5();
        List<ProductListDto> recommendListDtos = new ArrayList<>();

        for (Product entity : products) {
            recommendListDtos.add(mapProductToDto(entity));
        }
        return recommendListDtos;
    }

    public List<ProductListDto> showProductListByCategoryNameAndKeyword(String subCategoryName) {
        List<Product> products = productRepository.findProductListByCategoryNameAndKeyword(subCategoryName);
        List<ProductListDto> productListByCategoryNameAndKeywordDtos = new ArrayList<>();

        for (Product entity : products) {
            productListByCategoryNameAndKeywordDtos.add(mapProductToDto(entity));
        }
        return productListByCategoryNameAndKeywordDtos;
    }

    public List<ProductListDto> findProductListBySubCategories(List<String> subCategories) {
        List<Product> products = productRepository.findProductListByCategory(subCategories);
        List<ProductListDto> productListByCategoryDtos = new ArrayList<>();

        for (Product entity : products) {
            productListByCategoryDtos.add(mapProductToDto(entity));
        }
        return productListByCategoryDtos;
    }

    public Optional<Product> getProductByProductNo(Integer productNo) {
        return productRepository.findById(productNo);
    }


    public List<String> getProductId() {
        return productRepository.findProductId();
    }


    private List<String> getProductType(String mainType) {
        return productRepository.findType(mainType);
    }

    public Map<String, List<String>> getProductTypesByMainTypes(List<String> mainTypes) {
        Map<String, List<String>> mainTypeToTypes = new HashMap<>();
        for (String mainType : mainTypes) {
            List<String> types = getProductType(mainType);
            mainTypeToTypes.put(mainType, types);
        }
        return mainTypeToTypes;
    }

    public List<ProductListDto> getProductListByMainType(List<String> mainTypes) {
        List<ProductListDto> productListByProductIdDtos = new ArrayList<>();

        for (String productId : mainTypes) {
            List<Product> products = productRepository.findProductListByMainType(productId);
            products.forEach(product -> productListByProductIdDtos.add(mapProductToDto(product)));
        }
        return productListByProductIdDtos;
    }

    public List<ProductListDto> getProductListByType(List<String> types) {
        List<ProductListDto> productListByTypeDtos = new ArrayList<>();

        for(String type : types) {
            List<Product> products = productRepository.findProductListByType(type);
            products.forEach(product -> productListByTypeDtos.add(mapProductToDto(product)));
        }
        return productListByTypeDtos;
    }

    public List<ProductListDto> getProductListByAlcohol(List<String> alcoholLevels) {
        List<ProductListDto> productListByAlcoholDtos = new ArrayList<>();

        for(String alcohol : alcoholLevels) {
            List<Product> products = productRepository.findProductListByAlcohol(alcohol);
            products.forEach(product -> productListByAlcoholDtos.add(mapProductToDto(product)));
        }
        return productListByAlcoholDtos;
    }

    public List<ProductListDto> getProductListByPrice(List<String> prices) {
        List<ProductListDto> productListByPriceDtos = new ArrayList<>();

        for(String price : prices) {
            List<Product> products = productRepository.findProductListByPrice(price);
            products.forEach(product -> productListByPriceDtos.add(mapProductToDto(product)));
        }
        return productListByPriceDtos;
    }

    public List<ProductListDto> getProductListByFilterOption(Map<String, List<String>> filters) {

        List<String> searchKeyword = filters.get("keyword");
        List<String> categoryNo = filters.get("category");
        List<String> subCategoryName = filters.get("subCategory");
        List<String> orderOption = filters.get("orderOption");
        List<String> mainTypes = filters.get("mainType");
        List<String> types = filters.get("types");
        List<String> alcoholLevels = filters.get("alcoholLevels");
        List<String> prices = filters.get("prices");

        List<Product> productsListByFilterOption = productRepository.findProductListByFilterOptions(searchKeyword, categoryNo, subCategoryName, orderOption, mainTypes, types, alcoholLevels, prices);

        return productsListByFilterOption.stream().map(this::mapProductToDto).collect(Collectors.toList());
    }

    public List<ProductListDto> getProductListBySearchKeyword(String searchKeyword) {
        List<Product> products = productRepository.findProductListBySearchKeyword(searchKeyword);
        List<ProductListDto> productListBySearchKeywordDtos = new ArrayList<>();

        for (Product entity : products) {
            productListBySearchKeywordDtos.add(mapProductToDto(entity));
        }
        return productListBySearchKeywordDtos;
    }

    public List<ProductListDto> getProductListByOrderByOrderType(Map<String, Object> orderOptions) {
        String orderByBtnType = (String) orderOptions.get("orderByBtnType");
        Integer categoryNo = (Integer) orderOptions.get("selectedCategoryNo");
        String subCategoryName = (String) orderOptions.get("selectedSubCategoryName");
        List<String> mainTypes = (List<String>) orderOptions.get("mainType");
        List<String> types = (List<String>) orderOptions.get("types");
        List<String> alcoholLevels = (List<String>) orderOptions.get("alcoholLevels");
        List<String> prices = (List<String>) orderOptions.get("prices");

        List<Product> products = productRepository.findProductListByOrderByOrderType(orderByBtnType, categoryNo, subCategoryName,
                                                                                     mainTypes, types, alcoholLevels, prices);
        List<ProductListDto> productListByOrderByDtos = new ArrayList<>();

        for (Product entity : products) {
            productListByOrderByDtos.add(mapProductToDto(entity));
        }
        return productListByOrderByDtos;
    }
}