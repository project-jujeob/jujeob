package com.jujeob.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PasswordChangeRequest {

    private String currentPassword;
    private String newPassword;

}
