package com.jujeob.entity;

import jakarta.persistence.*;
import lombok.Data;

@Table(name = "subcategory")
@Entity
@Data
public class SubCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="subcategoryno", updatable = false)
    private Integer subCategoryNo;

    @Column(name = "subcategoryname", nullable = false)
    private String subCategoryName;

    @Column(name = "categoryno", nullable = false)
    private String categoryNo;
}
