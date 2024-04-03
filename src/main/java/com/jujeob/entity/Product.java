package com.jujeob.entity;


import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Table(name="product")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="productno", updatable = false)
    private Integer productNo;

    @Column(name = "productid", nullable = false)
    private String productId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "img")
    private String img;

    @Column(name = "price")
    private String price;

    @Column(name = "alcohol")
    private String alcohol;

    @Column(name = "volume")
    private String volume;

    @Column(name = "type")
    private String type;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "company")
    private String company;

    @Column(name = "package")
    private String packageType;

    @Column(name = "unit")
    private String unit;

    @Column(name = "expdate")
    private String expDate;

    @Column(name = "detailimg")
    private String detailImg;

    @Column(name = "tastingimg")
    private String tastingImg;

    @Column(name = "colorandhomogeneity")
    private String colorAndHomogeneity;

    @Column(name = "incense")
    private String incense;

    @Column(name = "tasting")
    private String tasting;

    @Column(name = "mouthfeel")
    private String mouthfeel;

    @Column(name = "brandimg")
    private String brandImg;

    @Column(name = "winery")
    private String winery;

    @Column(name = "kind")
    private String kind;

    @Column(name = "color")
    private String color;

    @Column(name = "opentype")
    private String openType;

    @Column(name = "aroma")
    private String aroma;

    @Column(name = "foodpairing")
    private String foodPairing;

    @Column(name = "breeding")
    private String breeding;

    @Column(name = "recommendglass")
    private String recommendGlass;

    @Column(name = "country")
    private String country;

    @Column(name = "countrydescription")
    private String countryDescription;

    @Column(name = "brand")
    private String brand;

    @Column(name = "crate")
    private String crate;

    @Column(name = "howtodrink")
    private String howToDrink;

    @Column(name = "flavor")
    private String flavor;

    @Column(name = "finish")
    private String finish;

    @Column(name = "keyword")
    private String keyword;

    @Column(name = "created_at", updatable = false, columnDefinition = "TIMESTAMP DEFAULT now()")
    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime modifiedAt;

    @Override
    public String toString() {
        return "Product{" +
                "productNo=" + productNo +
                ", productId='" + productId + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}