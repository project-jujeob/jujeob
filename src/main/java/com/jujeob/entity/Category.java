package com.jujeob.entity;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "category")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="categoryno", updatable = false)
    private Integer categoryNo;

    @Column(name = "categoryname", nullable = false)
    private String categoryName;

}
