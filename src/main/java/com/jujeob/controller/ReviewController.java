package com.jujeob.controller;

import com.jujeob.dto.ReviewDto;
import com.jujeob.entity.Review;
import com.jujeob.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @PostMapping("/ReviewWrite/createReview")
    public ResponseEntity<String> addReview(@RequestBody Review review) {
        // 리뷰를 추가하는 메서드 호출
        reviewService.addReview(review);
        return new ResponseEntity<>("Review added successfully", HttpStatus.CREATED);
    }

    /*@GetMapping("/Reviews")
    public List<Review> getAllReviews() {
        System.out.println("리뷰목록"+reviewService.getAllReviews());
        return reviewService.getAllReviews();
    }*/
    @GetMapping("/Reviews/{productNo}")
    public List<ReviewDto> getAllReviewsByProductNo(@PathVariable Integer productNo) {
        List<Review> reviews = reviewService.getAllReviewsByProductProductNoOrderByReviewDateDesc(productNo);
        List<ReviewDto> reviewDtos = new ArrayList<>();

        for(Review review : reviews){
            reviewDtos.add(reviewService.convertToDto(review));
        }

        System.out.println("리뷰디티오"+reviewDtos);
        return reviewDtos;
    }

}
