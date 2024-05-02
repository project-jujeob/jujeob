package com.jujeob.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CertificationResult {
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
}
