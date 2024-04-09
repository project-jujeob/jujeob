
package com.jujeob.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ProductControllerTest {
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void testGetProductDetails() {
        ResponseEntity<String> response = restTemplate.getForEntity("http://localhost:" + port + "/api/productDetail/1", String.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        // 여기서 응답 본문을 확인하여 필요한 테스트를 추가할 수 있습니다.
    }
}

