package com.jujeob.repository;

import com.jujeob.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer>, ProductRepositoryCustom {

    @Query(value = "SELECT * FROM product ORDER BY RAND() LIMIT 5", nativeQuery = true)
    List<Product> findRandom5();

}
