package com.jujeob.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDeliveriesDto {
    private List<OrderItemDto> orderItems;

    // CustomerOrder
    private Long orderId;
    private String address;
    private String memberName;
    private String memberPhone;
    private String memberEmail;
    private String orderStatus;
    private String paymentMethod;
    private Long totalPrice;
    private String deliveryRequest;
    private LocalDateTime createdAt;
}
