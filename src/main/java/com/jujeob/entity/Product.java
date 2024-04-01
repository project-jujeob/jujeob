package com.jujeob.entity;


import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Table(name="products")
@SequenceGenerator(name = "product_SEQ", sequenceName = "product_SEQ", allocationSize = 1)
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="productNo", updatable = false)
    private Long productNo;

    @Column(name = "productId", nullable = false)
    private String productId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "img")
    private String img;

    @Column(name = "price")
    private Double price;

    @Column(name = "alcohol")
    private Double alcohol;

    @Column(name = "volume")
    private Double volume;

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

    @Column(name = "expDate")
    private String expDate;

    @Column(name = "detailImg")
    private String detailImg;

    @Column(name = "tastingImg")
    private String tastingImg;

    @Column(name = "colorAndHomogeneity")
    private String colorAndHomogeneity;

    @Column(name = "incense")
    private String incense;

    @Column(name = "tasting")
    private String tasting;

    @Column(name = "mouthfeel")
    private String mouthfeel;

    @Column(name = "brandImg")
    private String brandImg;

    @Column(name = "winery")
    private String winery;

    @Column(name = "kind")
    private String kind;

    @Column(name = "color")
    private String color;

    @Column(name = "openType")
    private String openType;

    @Column(name = "aroma")
    private String aroma;

    @Column(name = "foodPairing")
    private String foodPairing;

    @Column(name = "breeding")
    private String breeding;

    @Column(name = "recommendGlass")
    private String recommendGlass;

    @Column(name = "country")
    private String country;

    @Column(name = "countryDescription")
    private String countryDescription;

    @Column(name = "brand")
    private String brand;

    @Column(name = "crate")
    private String crate;

    @Column(name = "howToDrink")
    private String howToDrink;

    @Column(name = "flavor")
    private String flavor;

    @Column(name = "finish")
    private String finish;

    @Column(name = "keyword")
    private String keyword;

    @CreatedDate
    @LastModifiedDate
    private LocalDateTime createdAt;
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
