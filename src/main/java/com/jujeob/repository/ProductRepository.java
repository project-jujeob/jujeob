package com.jujeob.repository;

import com.jujeob.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer>, ProductRepositoryCustom {

    @Query(value = "SELECT * FROM product ORDER BY RAND() LIMIT 5", nativeQuery = true)
    List<Product> findRandom5();

    @Query("SELECT p.img FROM Product p WHERE p.productNo = ?1")
    String findImgByProductNo(Integer productNo);

    @Query("SELECT p.name FROM Product p WHERE p.productNo = ?1")
    String findNameByProductNo(Integer productNo);

    @Query("SELECT p.alcohol FROM Product p WHERE p.productNo = ?1")
    double findAlcoholByProductNo(Integer productNo);

    @Query("SELECT p.volume FROM Product p WHERE p.productNo = ?1")
    String findVolumeByProductNo(Integer productNo);
}
