package com.jujeob.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LogoutRequest {

    private String accessToken;
    private String refreshToken;

}
