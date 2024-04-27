package com.jujeob.dto;

import com.jujeob.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdatedBoardDto {
    private String title;
    private String content;
}