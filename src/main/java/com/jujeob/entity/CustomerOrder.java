package com.jujeob.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "customerorder")
public class CustomerOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @OneToMany(mappedBy = "customerOrder", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems = new ArrayList<>();

    /*@ManyToOne // 수정
    @JoinColumn(name = "memNo", nullable = false) // 수정
    private Member member;*/

    @Column(nullable = false)
    private Long memNo;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String memberName;

    @Column(nullable = false)
    private String memberPhone;

    @Column(nullable = false)
    private String memberEmail;

    @Column(nullable = false)
    private String orderStatus;

    @Column(nullable = false)
    private String paymentMethod;

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}