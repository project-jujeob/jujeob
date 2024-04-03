package com.jujeob.controller;

import com.jujeob.entity.Product;
import com.jujeob.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {

    @Autowired
    ProductService productService;

//    @GetMapping("/api/productList")
//    public List<Product> showProductList() {
//
//       productService.showAllProductList();
//        System.out.println("출력문");
//        return null;
//    }

    @GetMapping("/api/productList")
    public Product showProductList() {

        Product p = productService.showAllProductOne();
        System.out.println(p);
        return null;
    }
}
