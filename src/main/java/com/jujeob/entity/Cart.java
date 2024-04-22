package com.jujeob.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;


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
