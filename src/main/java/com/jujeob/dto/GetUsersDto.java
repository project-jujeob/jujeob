package com.jujeob.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetUsersDto {
    private String userId;
    private String nickname;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String deleted;
    private LocalDateTime createDate;
}
