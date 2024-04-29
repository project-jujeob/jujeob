package com.jujeob.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardCommentDto {
    private int comment_Id;
    private String commentContent;
    private LocalDateTime createDate;
    private int boardId;
//    private Long memNo;
//    private String memNickname;
    private Long userNo;
    private String nickname;
}
