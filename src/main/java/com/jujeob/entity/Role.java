package com.jujeob.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor    // 필드를 초기화하는 생성자를 자동으로 생성
public enum Role {

    // 시큐리티6.1 부터는 ROLE_ 을 붙이면 안돼서 빼야할수도
    GUEST("ROLE_GUEST"), USER("ROLE_USER"), ADMIN("ROLE_ADMIN");
    private final String key;
}
