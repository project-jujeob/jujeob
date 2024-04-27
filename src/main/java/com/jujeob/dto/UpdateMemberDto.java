package com.jujeob.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateMemberDto {

    private String memPw;
    private String memNickname;
    private String memName;
    private String memEmail;
    private String memPhone;
    private String memAddr;
}
