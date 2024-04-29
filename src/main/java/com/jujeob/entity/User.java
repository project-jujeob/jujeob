package com.jujeob.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@EntityListeners(AuditingEntityListener.class) // JPA Auditing 활성화
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userNo;

//    @Column(nullable = false, unique = true)
    private String userId;

    @Column(nullable = false)
    private String password;

//    @Column(nullable = false, unique = true)
    private String nickname;

    @Column(nullable = false)
    private String name;

//    @Column(nullable = false, unique = true)
    private String phone;

//    @Column(nullable = false, unique = true)
    private String email;

    private String address;

    @CreatedDate
//    @Column(nullable = false, updatable = false)
    private LocalDateTime createDate;

    @LastModifiedDate
    private LocalDateTime updateDate;

    @Builder.Default
    private String deleted = "N";

    private LocalDateTime deleteDate;

    private String profileImage;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private SocialType socialType;

    private String socialId;
}

