package com.jujeob.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Table(name="cartitemdata")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class CartItemData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartNo;

    /*@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memNo", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productno", nullable = false)
    private Product product;*/

    private Integer productNo;
    private Long memberNo;


    private String name;
    private Long price;
    //private String img;
    @Column(nullable = false)
    private int quantity;

}

