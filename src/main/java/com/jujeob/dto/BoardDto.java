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
    private String boardContext;
    private LocalDate CreateDate;
}
