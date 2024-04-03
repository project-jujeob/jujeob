package com.jujeob.service;

import com.jujeob.entity.Product;
import com.jujeob.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;

//    public List<Product> showAllProductList( ) {
//
//        productRepository.findAll();
//        System.out.println("서비스");
//        return null;
//    }

    public Product showAllProductOne( ) {

        productRepository.findById(1);
        System.out.println("서비스");
        return null;
    }
}
