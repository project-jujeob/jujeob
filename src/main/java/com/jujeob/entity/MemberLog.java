//package com.jujeob.entity;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import java.time.LocalDateTime;
//
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//@Entity
//@Table(name = "MEMBER_LOG")
//public class MemberLog {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long logId;
//
//    @Column(name = "login_date", nullable = false)
//    private LocalDateTime loginDate = LocalDateTime.now();
//
//    @Column(name = "login_type", nullable = false)
//    private String loginType;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "mem_no")
//    private Member member;
//}