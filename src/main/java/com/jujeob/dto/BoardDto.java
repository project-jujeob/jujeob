package com.jujeob.dto;

import com.jujeob.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardDto {
    private int boardId;
    private Member member;
    private String boardTitle;
    private String boardContent;
    private LocalDate CreateDate;
    private String imageUrl;
    private int image_size;
    private int imageId;
}
