package com.jujeob.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardCommentDto {
    private int commentId;
    private String commentContent;
    private LocalDateTime createDate;
    private int boardId;
    private int commentParent;
    private int commentOrder;
    private int isDeleted;
    private int CommentCount;
    private String parentNickname;
    private Long userNo;
    private String nickname;
}
