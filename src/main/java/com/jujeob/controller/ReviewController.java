package com.jujeob.controller;

import com.jujeob.entity.Review;
import com.jujeob.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
//@RequestMapping("/api")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @PostMapping("/api/ReviewWrite/createReview")
    public ResponseEntity<String> addReview(@RequestBody Review review) {
        // 리뷰를 추가하는 메서드 호출
        reviewService.addReview(review);
        return new ResponseEntity<>("Review added successfully", HttpStatus.CREATED);
    }
}
