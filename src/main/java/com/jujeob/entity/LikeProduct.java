package com.jujeob.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.TimeZoneStorage;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

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

    @Column(name = "userNo", nullable = false)
    private Long userNo;

    @Column(nullable = false, length = 1)
    private String likeStatus;

    @CreationTimestamp
    // @Temporal(TemporalType.TIMESTAMP)
    @TimeZoneStorage
    @Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date createdAt;

    @UpdateTimestamp
    // @Temporal(TemporalType.TIMESTAMP)
    @TimeZoneStorage
    @Column(name = "updated_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private Date updatedAt;
}
