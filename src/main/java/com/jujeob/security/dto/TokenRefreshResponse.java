package com.jujeob.security.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TokenRefreshResponse {
    // Getter and Setter
    private String accessToken;
    private String tokenType = "Bearer";

    public TokenRefreshResponse(String accessToken) {
        this.accessToken = accessToken;
    }

}
