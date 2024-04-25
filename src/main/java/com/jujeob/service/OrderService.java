package com.jujeob.service;

import com.jujeob.entity.CustomerOrder;
import com.jujeob.entity.OrderItem;
import com.jujeob.repository.OrderItemRepository;
import com.jujeob.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderItemRepository orderItemRepository;

    @Transactional
    public void processOrder(CustomerOrder customerOrder) {
        // CustomerOrder 저장
        CustomerOrder savedOrder = orderRepository.save(customerOrder);

        // OrderItem 저장
        List<OrderItem> orderItems = savedOrder.getOrderItems();
        for (OrderItem orderItem : orderItems) {
            orderItem.setCustomerOrder(savedOrder);
            orderItemRepository.save(orderItem);
        }
    }
}
