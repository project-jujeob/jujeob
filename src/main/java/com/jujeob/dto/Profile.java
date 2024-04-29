package com.jujeob.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class Profile {

    private Long userNo;
    private String userId;
    private String nickname;
    private String name;
    private String phone;
    private String email;
    private String address;
    private LocalDateTime createDate;
    private String profileImage;

}
