package com.jujeob.service;

import com.jujeob.dto.BoardCommentDto;
import com.jujeob.entity.BoardComment;
import com.jujeob.repository.BoardCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BoardCommentService {
    @Autowired
    private BoardCommentRepository boardCommentRepository;

    public void Write(BoardCommentDto boardCommentDto) {
        System.out.println("댓글 Write 서비스입니다 userNo은: "+boardCommentDto.getUserNo());
        BoardComment boardComment = new BoardComment();
        boardComment.setUserNo(boardCommentDto.getUserNo());

        boardComment.setCommentContent(boardCommentDto.getCommentContent());
        boardComment.setCreateDate(LocalDateTime.now());
        boardComment.setBoardId(boardCommentDto.getBoardId()); // 수정된 부분
        boardCommentRepository.save(boardComment);
    }

    private BoardCommentDto mapCommentDto(BoardComment entity){
        BoardCommentDto CommentDto = new BoardCommentDto();
        CommentDto.setCommentContent(entity.getCommentContent());
        CommentDto.setComment_Id(entity.getComment_Id());
        CommentDto.setCreateDate(entity.getCreateDate());
        CommentDto.setBoardId(entity.getBoard().getBoardId()); // 수정된 부분
        //CommentDto.setMemNickname(entity);
        return CommentDto;
    }

    public List<BoardCommentDto> getCommentsByBoardId(int boardId) {
        List<BoardComment> comments = boardCommentRepository.findByBoardId(boardId);
        List<BoardCommentDto> commentDtoList = new ArrayList<>();
        System.out.println("서비스에서 게시글 id에 해당하는 댓글 데이터 요청 받았습니다.");
        for (BoardComment comment : comments){
            BoardCommentDto commentDto = mapCommentDto(comment);

            String nickname = boardCommentRepository.findNicknameByUserNo(comment.getUserNo());
            commentDto.setNickname(nickname);
            commentDto.setUserNo(comment.getUserNo());
            commentDtoList.add(commentDto);
        }
        return commentDtoList;
    }
}
