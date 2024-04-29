package com.jujeob.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemDto {
    private Integer productNo;
    private int quantity;
    private double price;

    // Product
    //private String img;
    private String img;
    private String productName;
    private double alcohol;
    private String volume;
}
