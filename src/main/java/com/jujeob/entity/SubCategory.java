package com.jujeob.entity;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "subcategory")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SubCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="subcategoryno", updatable = false)
    private Integer subCategoryNo;

    @Column(name = "subcategoryname", nullable = false)
    private String subCategoryName;

    @Column(name = "categoryno", nullable = false)
    private Integer categoryNo;

}