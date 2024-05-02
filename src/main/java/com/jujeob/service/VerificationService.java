package com.jujeob.service;

import com.jujeob.dto.VerfiedAccessTokenResponse;
import com.jujeob.dto.VerificationResult;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
public class VerificationService {

    @Value("${iamport.key}")
    private String iamportKey;

    @Value("${iamport.secret}")
    private String iamportSecret;

    public VerificationResult verifyUser(String impUid) throws Exception {
        RestTemplate restTemplate = new RestTemplate();
        String accessToken = getAccessToken(restTemplate);

        // Call IAMport Certifications API
        String url = String.format("https://api.iamport.kr/certifications/%s", impUid);
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<VerificationResult> response = restTemplate.exchange(url, HttpMethod.GET, entity, VerificationResult.class);

        return processVerificationResult(response.getBody());
    }

    private String getAccessToken(RestTemplate restTemplate) {
        String url = "https://api.iamport.kr/users/getToken";
        Map<String, String> request = new HashMap<>();
        request.put("imp_key", iamportKey);
        request.put("imp_secret", iamportSecret);
        HttpEntity<Map<String, String>> entity = new HttpEntity<>(request);
        ResponseEntity<VerfiedAccessTokenResponse> response = restTemplate.postForEntity(url, entity, VerfiedAccessTokenResponse.class);
        return Objects.requireNonNull(response.getBody()).getResponse().getVerifiedAccessToken();
    }

    private VerificationResult processVerificationResult(VerificationResult data) {
        // Implement logic to process the verification result
        return data;
    }
}
