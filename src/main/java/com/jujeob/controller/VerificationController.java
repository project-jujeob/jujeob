package com.jujeob.controller;

import com.jujeob.dto.VerificationResult;
import com.jujeob.service.VerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class VerificationController {

    @Autowired
    private VerificationService verificationService;

    @PostMapping("/verify")
    public ResponseEntity<?> verifyImpUid(@RequestBody Map<String, String> data) {
        try {
            String impUid = data.get("imp_uid");
            VerificationResult result = verificationService.verifyUser(impUid);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Verification failed: " + e.getMessage());
        }
    }
}

