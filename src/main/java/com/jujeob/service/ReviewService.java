package com.jujeob.service;

import com.jujeob.dto.ReviewDto;
import com.jujeob.entity.Review;
import com.jujeob.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    ReviewRepository reviewRepository;

    public void addReview(Review review) {
        // 리뷰를 저장하는 메서드
        reviewRepository.save(review);
    }

    public List<Review> getAllReviewsByProductProductNoOrderByReviewDateDesc(Integer productNo) {
        return reviewRepository.findReviewsByProductProductNoOrderByReviewDateDesc(productNo);
    }
    public ReviewDto convertToDto(Review review) {
        ReviewDto dto = new ReviewDto();
        dto.setReviewNo(review.getReviewNo());
        dto.setReviewContent(review.getReviewContent());
        dto.setStar(review.getStar());
        dto.setReviewDate(review.getReviewDate());
        dto.setUserNo(review.getUser().getUserNo());
        dto.setNickname(review.getUser().getNickname());
        dto.setProductNo(review.getProduct().getProductNo());
        dto.setProductName(review.getProduct().getName());

        return dto;
    }
}
