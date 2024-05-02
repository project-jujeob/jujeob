package com.jujeob.service;

import com.jujeob.Exception.BoardNotFoundException;
import com.jujeob.dto.BoardCommentDto;
import com.jujeob.entity.BoardComment;
import com.jujeob.repository.BoardCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BoardCommentService {
    @Autowired
    private BoardCommentRepository boardCommentRepository;

    public void Write(BoardCommentDto boardCommentDto) {
        BoardComment boardComment = new BoardComment();
        boardComment.setUserNo(boardCommentDto.getUserNo());
        boardComment.setCommentContent(boardCommentDto.getCommentContent());
        boardComment.setCreateDate(LocalDateTime.now());
        boardComment.setBoardId(boardCommentDto.getBoardId());
        boardCommentRepository.save(boardComment);
    }
    private BoardCommentDto mapCommentDto(BoardComment entity){
        BoardCommentDto CommentDto = new BoardCommentDto();
        CommentDto.setCommentContent(entity.getCommentContent());
        CommentDto.setCommentId(entity.getCommentId());
        CommentDto.setCreateDate(entity.getCreateDate());
        CommentDto.setBoardId(entity.getBoard().getBoardId());
        return CommentDto;
    }
    public List<BoardCommentDto> getCommentsByBoardId(int boardId) {
        List<BoardComment> comments = boardCommentRepository.findByBoardId(boardId);
        List<BoardCommentDto> commentDtoList = new ArrayList<>();
        for (BoardComment comment : comments) {
            if (comment.getIsDeleted() == 0) {
                BoardCommentDto commentDto = mapCommentDto(comment);
                String nickname = boardCommentRepository.findNicknameByUserNo(comment.getUserNo());
                commentDto.setNickname(nickname);
                commentDto.setUserNo(comment.getUserNo());
                commentDto.setCommentId(comment.getCommentId());
                commentDto.setCommentParent(comment.getCommentParent());
                commentDto.setIsDeleted(comment.getIsDeleted());
                long replyCount = boardCommentRepository.countByCommentParentAndIsDeleted(comment.getCommentId(), 0);
                commentDto.setCommentCount((int) replyCount);
                commentDtoList.add(commentDto);
            }
        }
        return commentDtoList;
    }
    public void deleteComment(int commentId) {
        BoardComment deleteComment = boardCommentRepository.findById(commentId)
                .orElseThrow(() -> new BoardNotFoundException("게시물을 찾을 수 없습니다."));

        deleteComment.setIsDeleted(1);
        boardCommentRepository.save(deleteComment);
    }
    public void updateComment(int commentId, String updatedContent) {
        System.out.println("업콘 반응 : " + updatedContent);
        BoardComment boardComment = boardCommentRepository.findById(commentId)
                        .orElseThrow(() -> new BoardNotFoundException("댓글 Not Found"));
        boardComment.setCommentContent(updatedContent);
        boardComment.setUpdateDate(LocalDateTime.now());

        boardCommentRepository.save(boardComment);
    }
    public void ReplyAdd(BoardCommentDto boardCommentDto) {
        int parentCommentId = boardCommentDto.getCommentParent();

        List<BoardComment> comments = boardCommentRepository.findByCommentParent(parentCommentId);

        int commentOrder = 1;
        if (!comments.isEmpty()) {
            commentOrder = comments.get(comments.size() - 1).getCommentOrder() + 1;
        }
        BoardComment boardComment = new BoardComment();
        boardComment.setUserNo(boardCommentDto.getUserNo());
        boardComment.setCommentContent(boardCommentDto.getCommentContent());
        boardComment.setCreateDate(LocalDateTime.now());
        boardComment.setBoardId(boardCommentDto.getBoardId());
        boardComment.setCommentParent(boardCommentDto.getCommentParent());
        boardComment.setCommentOrder(commentOrder);
        boardCommentRepository.save(boardComment);
    }
    public List<BoardCommentDto> getReplyByParentId(int commentParent) {
        List<BoardComment> replyComments = boardCommentRepository.findByCommentParent(commentParent);

        return replyComments.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    private BoardCommentDto convertToDto(BoardComment comment) {
        BoardCommentDto dto = new BoardCommentDto();
        dto.setCommentId(comment.getCommentId());
        dto.setCommentContent(comment.getCommentContent());
        dto.setCreateDate(comment.getCreateDate());
        dto.setUserNo(comment.getUserNo());
        dto.setBoardId(comment.getBoardId());
        dto.setCommentParent(comment.getCommentParent());
        dto.setCommentOrder(comment.getCommentOrder());
        dto.setIsDeleted(comment.getIsDeleted());
        if (comment.getCommentParent() != 0) {
            BoardComment parentComment = boardCommentRepository.findById(comment.getCommentParent())
                    .orElseThrow(() -> new BoardNotFoundException("부모 댓글을 찾을 수 없습니다."));

            Long parentCommentWriterUserNo = parentComment.getUserNo();
            String parentCommentWriterNickname = boardCommentRepository.findNicknameByUserNo(parentCommentWriterUserNo);
            System.out.println("parentCommentWriterNickname: " + parentCommentWriterNickname);
            dto.setParentNickname(parentCommentWriterNickname);
        }

        String nickname = boardCommentRepository.findNicknameByUserNo(comment.getUserNo());
        dto.setNickname(nickname);

        return dto;
    }


}
