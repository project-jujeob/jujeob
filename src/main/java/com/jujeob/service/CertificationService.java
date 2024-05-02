package com.jujeob.service;

import com.jujeob.dto.CertificationResult;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

@Service
public class CertificationService {

    public CertificationResult processCertification(String impUid) throws Exception {
        // Obtain access token similar to previous examples
        // Then make a request to the IAMport certification API
        // Return the result or handle exceptions
        RestTemplate restTemplate = new RestTemplate();
        String accessToken = "your_access_token"; // This should be retrieved securely
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<CertificationResult> response = restTemplate.exchange(
                "https://api.iamport.kr/certifications/" + impUid,
                HttpMethod.GET,
                entity,
                CertificationResult.class
        );

        return response.getBody();
    }
}
