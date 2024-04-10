package com.jujeob.service;

import com.jujeob.dto.ProductListDto;
import com.jujeob.entity.Product;
import com.jujeob.entity.SubCategory;
import com.jujeob.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;

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
}