package com.jujeob.service;

import com.jujeob.dto.ProductListDto;
import com.jujeob.entity.Product;
import com.jujeob.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    private ProductListDto mapProductToDto(Product entity) {
        ProductListDto dto = new ProductListDto();
        dto.setImg(entity.getImg());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setAlcohol(entity.getAlcohol());
        dto.setPrice(entity.getPrice());
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

        for (Product entitiy : products) {
            productListByCategoryDtos.add(mapProductToDto(entitiy));
        }
        return productListByCategoryDtos;
    }
}