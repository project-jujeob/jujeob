package com.jujeob.dto;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CheckOrderItemDto {
    private Integer productNo;
    private String productName;
    private int quantity;
}
