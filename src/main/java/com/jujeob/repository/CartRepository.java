package com.jujeob.repository;

import com.jujeob.entity.CartItemData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<CartItemData,Long> {
}
