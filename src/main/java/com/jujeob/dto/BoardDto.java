package com.jujeob.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardDto {
    private int boardId;
    private String boardTitle;
    private String boardContent;
    private LocalDate CreateDate;
}
