package com.jujeob.repository;

import com.jujeob.entity.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<CustomerOrder, Long> {
    ResponseEntity<?> findAllByMemberNo(Long memberNo);
}
