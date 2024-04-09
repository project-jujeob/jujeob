package com.jujeob.entity;

import jakarta.persistence.*;
import lombok.Data;

@Table(name = "category")
@Entity
@Data
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="categoryno", updatable = false)
    private Integer categoryNo;

    @Column(name = "categoryname", nullable = false)
    private String categoryName;

    public Category(int i, String s) {
    }
}
