package com.jujeob.dto;

import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.StringPath;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductListDto {
    private String img;
    private String name;
    private String description;
    private double alcohol;
    private double price;
    private Integer productNo;
}
