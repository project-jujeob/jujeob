package com.jujeob.controller;

import com.jujeob.entity.LikeProduct;
import com.jujeob.repository.LikeProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class LikeProductController {

    @Autowired
    LikeProductRepository likeProductRepository;

    // 상품 좋아요 버튼
    @PostMapping("/api/likeProduct")
    public ResponseEntity<String> likeProduct(@RequestBody LikeProduct likeProduct) {
        return likeProductRepository
                .findByUserNoAndProductId(likeProduct.getUserNo(), likeProduct.getProductId())
                .map(existingLike -> {
                    existingLike.setLikeStatus(likeProduct.getLikeStatus());
                    likeProductRepository.save(existingLike);
                    return ResponseEntity.ok(existingLike.getLikeStatus().equals("Y") ? "좋아요 성공🙂" : "좋아요 취소😭");
                })
                .orElseGet(() -> {
                    likeProductRepository.save(likeProduct);
                    return ResponseEntity.ok("좋아요 성공🙂");
                });
    }


    @PostMapping("api/checkedUserLikes")
    public List<LikeProduct> getLikeProduct(@RequestParam long userNo) {
        return likeProductRepository.findAllByUserNo(userNo);
    }

    @GetMapping("/api/getLikeCount")
    public long getLikeCount(@RequestParam int productNo) {
        return likeProductRepository.getLikeCount(productNo);
    }

}
