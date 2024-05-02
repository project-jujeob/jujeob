package com.jujeob.controller;

import com.jujeob.dto.CertificationResult;
import com.jujeob.service.CertificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class CertificationController {

    @Autowired
    private CertificationService certificationService;

    @PostMapping("/certifications")
    public ResponseEntity<?> createCertification(@RequestBody Map<String, String> payload) {
        try {
            String impUid = payload.get("imp_uid");
            CertificationResult result = certificationService.processCertification(impUid);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error in certification: " + e.getMessage());
        }
    }
}
