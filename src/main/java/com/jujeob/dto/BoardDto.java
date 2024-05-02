package com.jujeob.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardDto {
    private int BoardId;
    private Long UserNo;
    private String Nickname;
    private String BoardTitle;
    private String BoardContent;
    private LocalDateTime CreateDate;
    private LocalDateTime BoardUpdate;
    private int isDeleted;
    private int BoardViews;
    private String imageUrl;
    private int Image_size;
    private int ImageId;
    private int commentCount;
    private String boardCategory;
}
