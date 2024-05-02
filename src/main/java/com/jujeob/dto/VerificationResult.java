package com.jujeob.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class VerificationResult {
    private boolean success;
    private String name;
    private String phoneNumber;
    private String birthDate;
    private boolean isAdult;

    public boolean isAdult() {
        return isAdult;
    }

    public void setAdult(boolean adult) {
        isAdult = adult;
    }

    // Override toString() for easy logging
    @Override
    public String toString() {
        return "VerificationResult{" +
                "success=" + success +
                ", name='" + name + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", birthDate='" + birthDate + '\'' +
                ", isAdult=" + isAdult +
                '}';
    }
}
