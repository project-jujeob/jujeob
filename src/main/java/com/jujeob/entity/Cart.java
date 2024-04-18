package com.jujeob.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cartNo;

    @Column(nullable = false)
    private Long quantity;

    @Column(nullable = false)
    private Long price;

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime cartDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memNo", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productno", nullable = false)
    private Product product;
}
