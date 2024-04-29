package com.jujeob.repository;

import com.jujeob.entity.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<CustomerOrder, Long> {

    List<CustomerOrder> findCustomerOrdersByMemberNoOrderByCreatedAtDesc(Long memberNo);
}
