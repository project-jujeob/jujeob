package com.jujeob.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ProfileUpdateRequest {

    private String password;
    private String nickname;
    private String name;
    private String phone;
    private String email;
    private String address;
    private String profileImage;
    private LocalDateTime updateDate;
}
