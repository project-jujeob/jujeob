package com.jujeob.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Table(name="review")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewNo;

    @Column(nullable = false)
    private String reviewContent;

    @Column(nullable = false)
    private double star;

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime reviewDate;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime reviewUpdateDate;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "memNo", nullable = false)
//    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_no", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productno", referencedColumnName = "productno")
    private Product product;

}