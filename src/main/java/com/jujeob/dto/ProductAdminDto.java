package com.jujeob.dto;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductAdminDto {
    private Integer productNo;
    private String name;
    private String img;
    private int price;
    private Integer quantity;
}