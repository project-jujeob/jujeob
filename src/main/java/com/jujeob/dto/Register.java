package com.jujeob.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.logging.log4j.core.config.plugins.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Register {

    @NotBlank(message = "아이디를 적어주세요")
    private String userId;

    @NotBlank(message = "비번을 적어주세요")
    private String password;

    @NotBlank(message = "닉네임을 적어주세요")
    private String nickname;

    @NotBlank(message = "이름을 적어주세요")
    private String name;

    @NotBlank(message = "이메일을 적어주세요")
    private String email;

    @NotBlank(message="핸드폰 번호를 입력해주세요")
    private String phone;

    private String address;


}
