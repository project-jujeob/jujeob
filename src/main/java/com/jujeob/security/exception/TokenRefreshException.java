package com.jujeob.security.exception;

import lombok.Getter;

@Getter
public class TokenRefreshException extends RuntimeException {
    // Getter and Setter
    private final String token;
    private final String message;

    public TokenRefreshException(String token, String message) {
        super(String.format("Failed for [%s]: %s", token, message));
        this.token = token;
        this.message = message;
    }

}
