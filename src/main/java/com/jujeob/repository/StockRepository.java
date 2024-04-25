package com.jujeob.repository;

import com.jujeob.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, Long> {
    Stock findByProductNo(Integer productNo);

    void deleteByProductNo(Integer productNo);
}
