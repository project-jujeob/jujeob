package com.jujeob.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartDto {
    private Long cartNo;
    private Integer productNo;
    private String name;
    private Long price;
    private int quantity;
    private String img;
}