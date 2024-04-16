package com.jujeob.service;

import com.jujeob.entity.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    @Autowired
    ReviewRepository reviewRepository;

    public void addReview(Review review) {
        // 리뷰를 저장하는 메서드
        reviewRepository.save(review);
    }
}
