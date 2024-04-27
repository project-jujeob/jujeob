package com.jujeob.dto;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductEditDto {
    private Integer productNo;
    private String productId;
    private String name;
    private String img;
    private int price;
    private double alcohol;
    private String volume;
    private String type;
    private String description;
    private String company;
    private String packageType;
    private String unit;
    private String expDate;
    private String detailImg;
    private String tastingImg;
    private String colorAndHomogeneity;
    private String incense;
    private String tasting;
    private String mouthfeel;
    private String brandImg;
    private String winery;
    private String kind;
    private String color;
    private String openType;
    private String aroma;
    private String foodPairing;
    private String breeding;
    private String recommendGlass;
    private String country;
    private String countryDescription;
    private String brand;
    private String crate;
    private String howToDrink;
    private String flavor;
    private String finish;
    private String keyword;
    private int quantity;
}
