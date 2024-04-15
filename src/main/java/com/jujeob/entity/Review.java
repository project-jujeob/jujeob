package com.jujeob.entity;/*
package com.jujeob.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Data
@Table(name="Review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="Review_No")
    private int reviewNo;

    @Column(name="Review_Content")
    private String reviewContent;

    @Column(name="Star")
    private double star;

    @Column(name="Like")
    private double like;

    @CreatedDate
    @Column(name="Review_Date")
    private LocalDate reviewDate;

    @LastModifiedDate
    @Column(name="Review_Update_Date")
    private LocalDate reviewUpdateDate;

    */
/*
    @ManyToOne
    @JoinColumn(name="memNo")
    private Member member;

    @ManyToOne
    @JoinColumn(name="productNo")
    private Product product;
    *//*


    @Column(name="memNo")
    private Long memNo;

    @Column(name ="productno")
    private Integer productNo;
}
*/

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@EntityListeners(AuditingEntityListener.class)
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memNo", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productno", nullable = false)
    private Product product;

}
