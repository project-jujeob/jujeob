package com.jujeob.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Table(name="cart")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartNo;

    @Column(name = "productno")
    private Integer productNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productno", referencedColumnName = "productno", insertable = false, updatable = false)
    private Product product;

    /*
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memNo", referencedColumnName = "memNo")
    private Member member;*/
    private Long userNo;

    private String name;
    private Long price;

    @Column(nullable = false)
    private int quantity;

}

