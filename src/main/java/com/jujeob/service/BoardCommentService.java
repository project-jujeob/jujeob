package com.jujeob.service;

import com.jujeob.Exception.BoardNotFoundException;
import com.jujeob.dto.BoardCommentDto;
import com.jujeob.entity.Board;
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
        System.out.println("댓글 Write 서비스입니다 memNo은: "+boardCommentDto.getMemNo());
        BoardComment boardComment = new BoardComment();
        boardComment.setMemNo(boardCommentDto.getMemNo());
        boardComment.setCommentContent(boardCommentDto.getCommentContent());
        boardComment.setCreateDate(LocalDateTime.now());
        boardComment.setBoardId(boardCommentDto.getBoardId()); // 수정된 부분
        boardCommentRepository.save(boardComment);
    }

    private BoardCommentDto mapCommentDto(BoardComment entity){
        BoardCommentDto CommentDto = new BoardCommentDto();
        CommentDto.setCommentContent(entity.getCommentContent());
        CommentDto.setCommentId(entity.getCommentId());
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
            String nickname = boardCommentRepository.findNicknameByMemNo(comment.getMemNo());
            commentDto.setMemNickname(nickname);
            commentDto.setMemNo(comment.getMemNo());
            commentDto.setCommentId(comment.getCommentId()); // 코멘트의 ID 설정
            commentDtoList.add(commentDto);
        }
        return commentDtoList;
    }


    public void deleteComment(int commentId) {
        BoardComment deleteComment = boardCommentRepository.findById(commentId)
                .orElseThrow(() -> new BoardNotFoundException("게시물을 찾을 수 없습니다."));
        System.out.println(deleteComment);
        boardCommentRepository.delete(deleteComment);

    }
}
