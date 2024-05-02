package com.jujeob.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class VerfiedAccessTokenResponse {
    private Response response;

    public static class Response {
        private String Verified_AccessToken;

        public String getVerifiedAccessToken() {
            return Verified_AccessToken;
        }

        public void setVerifedAccessToken(String Verified_AccessToken) {
            this.Verified_AccessToken = Verified_AccessToken;
        }
    }
}
