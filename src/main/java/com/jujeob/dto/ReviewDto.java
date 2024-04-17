package com.jujeob.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDto {
    private Long reviewNo;
    private String reviewContent;
    private double star;
    private LocalDateTime reviewDate;

    // product
    private Integer productNo;
    private String productName;

    // member
    private Long memNo;
    private String memNickname;
}
