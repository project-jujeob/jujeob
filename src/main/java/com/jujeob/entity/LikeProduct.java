package com.jujeob.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LikeProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="likeNo", updatable = false)
    private Integer likeNo;

    @Column(name = "productId", nullable = false)
    private Integer productId;

    @Column(name = "memNo", nullable = false)
    private Long memNo;
}
