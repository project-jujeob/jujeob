package com.jujeob.dto;

import com.jujeob.entity.Board;
import com.jujeob.entity.BoardComment;
import com.jujeob.entity.Member;
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
    private Long memNo;
    private int boardId;
    private String memNickname;
}
