package com.jujeob.dto;

import com.jujeob.entity.Board;
import com.jujeob.entity.Member;
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
    private Long MemNo;
    private String MemNickname;
    private String BoardTitle;
    private String BoardContent;
    private LocalDateTime CreateDate;
    private LocalDateTime BoardUpdate;
    private String BoardViews;
    private String ImageUrl;
    private int Image_size;
    private int ImageId;
}
