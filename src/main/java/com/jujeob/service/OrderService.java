package com.jujeob.service;

import com.jujeob.dto.OrderDeliveriesDto;
import com.jujeob.dto.OrderItemDto;
import com.jujeob.entity.CustomerOrder;
import com.jujeob.entity.OrderItem;
import com.jujeob.repository.OrderItemRepository;
import com.jujeob.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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

    /*public List<CustomerOrder> getAllCustomerOrdersByMemberNoOrderByCreatedAt(Long memberNo) {
        return orderRepository.findCustomerOrdersByMemberNoOrderByCreatedAt(memberNo);
    }*/

   /* public OrderDeliveriesDto convertToDto(CustomerOrder customerOrder) {
        OrderDeliveriesDto dto = new OrderDeliveriesDto();
        dto.setOrderId(customerOrder.getOrderId());

        return dto;
    }*/

    public List<OrderDeliveriesDto> getAllOrderDeliveriesWithItems(Long memberNo) {
        List<CustomerOrder> customerOrders = orderRepository.findCustomerOrdersByMemberNoOrderByCreatedAt(memberNo);
        List<OrderDeliveriesDto> orderDeliveriesDtos = new ArrayList<>();

        for(CustomerOrder customerOrder : customerOrders){
            //List<OrderItem> items = orderItemRepository.findByOrderId(customerOrder.getOrderId());
            List<OrderItem> orderItems = orderItemRepository.findByCustomerOrder(customerOrder);
            OrderDeliveriesDto orderDeliveriesDto = convertToDto(customerOrder, orderItems);
            orderDeliveriesDtos.add(orderDeliveriesDto);

        }
        return orderDeliveriesDtos;
    }

    private OrderDeliveriesDto convertToDto(CustomerOrder customerOrder, List<OrderItem> orderItems) {
        OrderDeliveriesDto dto = new OrderDeliveriesDto();
        dto.setOrderId(customerOrder.getOrderId());
        dto.setAddress(customerOrder.getAddress());
        dto.setMemberName(customerOrder.getMemberName());
        dto.setMemberPhone(customerOrder.getMemberPhone());
        dto.setMemberEmail(customerOrder.getMemberEmail());
        dto.setOrderStatus(customerOrder.getOrderStatus());
        dto.setPaymentMethod(customerOrder.getPaymentMethod());
        dto.setTotalPrice(customerOrder.getTotalPrice());
        dto.setDeliveryRequest(customerOrder.getDeliveryRequest());
        dto.setCreatedAt(customerOrder.getCreatedAt());

        List<OrderItemDto> orderItemDtos = new ArrayList<>();
        for (OrderItem orderItem : orderItems) {
            OrderItemDto itemDto = new OrderItemDto();
            itemDto.setProductNo(orderItem.getProductNo());
            itemDto.setQuantity(orderItem.getQuantity());
            itemDto.setPrice(orderItem.getPrice());
            orderItemDtos.add(itemDto);
        }
        dto.setOrderItems(orderItemDtos);

        return dto;
    }
}
