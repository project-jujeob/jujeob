package com.jujeob.repository;

import com.jujeob.entity.CustomerOrder;
import com.jujeob.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByCustomerOrder(CustomerOrder customerOrder);
}