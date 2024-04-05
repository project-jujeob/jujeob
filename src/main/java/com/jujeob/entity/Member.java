package com.jujeob.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memNo;

    @NonNull
    private String memId;

    @NonNull
    private String memPw;

    @NonNull
    private String memNickname;

    @NonNull
    private String memName;

    @NonNull
    private String memEmail;

    @NonNull
    private String memPhone;

    private String memAddr;


    @NonNull
    @CreatedDate // 생성되는 시간을 자동으로 넣어줌
    private LocalDateTime createDate;

    @LastModifiedDate // 엔티티가 수정될 때 수정시간을 넣어줌
    private LocalDateTime updateDate;

    @NonNull
    private String memDeleted;

    private LocalDateTime deleteDate;

    private String memImage;

    @NonNull
    private String memRole;
}
