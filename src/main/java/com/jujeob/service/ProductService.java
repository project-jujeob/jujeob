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

    public List<ProductListDto> showAllProductList( ) {
        List<Product> products = productRepository.findAll();
        List<ProductListDto> dtos = new ArrayList<>();

        for (Product entity : products) {
            ProductListDto dto = new ProductListDto();
            dto.setImg(entity.getImg());
            dto.setName(entity.getName());
            dto.setDescription(entity.getDescription());
            dto.setAlcohol(entity.getAlcohol());
            dto.setPrice(entity.getPrice());
            dtos.add(dto);
        }

        return dtos;
    }

    public List<ProductListDto> showTodayRecommend() {
        List<Product> products = productRepository.findRandom5();
        List<ProductListDto> dtos2 = new ArrayList<>();

        for (Product entity : products) {
            ProductListDto dto = new ProductListDto();
            dto.setImg(entity.getImg());
            dto.setName(entity.getName());
            dto.setDescription(entity.getDescription());
            dto.setAlcohol(entity.getAlcohol());
            dto.setPrice(entity.getPrice());
            dtos2.add(dto);
        }
        return dtos2;
    }
}