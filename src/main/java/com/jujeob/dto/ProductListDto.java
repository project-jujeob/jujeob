package com.jujeob.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductListDto {
    private String img;
    private String name;
    private String description;
    private String alcohol;
    private String price;
    private Integer productNo;


}
