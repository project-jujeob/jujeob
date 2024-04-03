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

//    public List<Product> showAllProductList( ) {
//        List<Product> pList =  productRepository.findAll();
//        System.out.println(pList.size());
//        System.out.println(pList.get(0));
//        return pList;
//    }

    public List<ProductListDto> showAllProductList( ) {
        // List<Product> productList = productRepository.findAll();
        List<Product> entities = productRepository.findAll();
        List<ProductListDto> dtos = new ArrayList<>();

        for (Product entity : entities) {
            ProductListDto dto = new ProductListDto();
            dto.setName(entity.getName());
            dto.setDescription(entity.getDescription());
            dto.setAlcohol(entity.getAlcohol());
            dto.setPrice(entity.getPrice());
            dtos.add(dto);
        }

        return dtos;
    }
}