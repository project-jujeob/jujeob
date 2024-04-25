package com.jujeob.dto;

import com.jujeob.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductRegisterDto {
    private Integer productNo;

    private String productId;

    private String name;

    private MultipartFile img;

    private int price;

    private int quantity;

    private double alcohol;

    private String volume;

    private String type;

    private String description;

    private String company;

    private String packageType;

    private String unit;

    private String expDate;

    private MultipartFile  detailImg;

    private MultipartFile  tastingImg;

    private String colorAndHomogeneity;

    private String incense;

    private String tasting;

    private String mouthfeel;

    private MultipartFile  brandImg;

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

}
