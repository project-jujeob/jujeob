package com.jujeob.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CheckOrderListDto {
    private Long orderId;
    private String userId;
    private String name;
    private String phone;
    private String address;
    private Long totalPrice;
    private String orderStatus;
    private String paymentMethod;
    private int quantity;
    private List<CheckOrderItemDto> products;
    private LocalDateTime createdAt;
}
