package com.jujeob.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/api/reactTest")
    public String hello() {
        return "테스트 입니다";
    }
}