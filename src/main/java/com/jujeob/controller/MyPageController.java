package com.jujeob.controller;

import com.jujeob.dto.OrderDeliveriesDto;
import com.jujeob.repository.OrderRepository;
import com.jujeob.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MyPageController {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderService orderService;


    @GetMapping("/api/orderDeliveries/{userNo}")
    public ResponseEntity<List<OrderDeliveriesDto>> getAllOrderDeliveriesWithItems(@PathVariable Long userNo){

        List<OrderDeliveriesDto> orderDeliveries = orderService.getAllOrderDeliveriesWithItems(userNo);

        System.out.println("orderDeliveries:"+orderDeliveries);

        return ResponseEntity.ok(orderDeliveries);
    }
}
