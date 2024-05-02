//package com.jujeob.entity;
//
//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.Setter;
//
//import java.time.LocalDateTime;
//
//@Setter
//@Getter
//@Entity
//public class UserVerification {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long verifiedNo;
//
//    // userId는 연결된 User 엔티티의 ID를 참조할 수 있습니다. 인증 후 회원가입 시 연결.
//    @Column(nullable = true)
//    private Long userNo;
//
//    @Column(nullable = false, unique = true)
//    private String impUid; // 아임포트에서 제공하는 고유 ID
//
//    @Column(nullable = false)
//    private Boolean verified; // 인증 성공 여부
//
//    @Column(nullable = false)
//    private LocalDateTime verifiedAt; // 인증 시각
//
//    @Column(nullable = true)
//    private String phoneNumber; // 사용자 전화번호
//
//    @Column(nullable = true)
//    private String birthDate; // 사용자 생년월일
//
//    @Column(nullable = true)
//    private String name; // 사용자 이름
//
//    @Column(nullable = true)
//    private Boolean isAdult;
//
//    public UserVerification() {
//    }
//
//    public UserVerification(Long userNo, String impUid, Boolean verified, LocalDateTime verifiedAt, String phoneNumber, String birthDate, String name) {
//        this.userNo= userNo;
//        this.impUid = impUid;
//        this.verified = verified;
//        this.verifiedAt = verifiedAt;
//        this.phoneNumber = phoneNumber;
//        this.birthDate = birthDate;
//        this.name = name;
//    }
//}
