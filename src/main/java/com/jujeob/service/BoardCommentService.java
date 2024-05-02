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
        //CommentDto.setMemNickname(entity);
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
        // 부모 댓글에 해당하는 답글을 데이터베이스에서 조회합니다.
        List<BoardComment> replyComments = boardCommentRepository.findByCommentParent(commentParent);

        // 조회된 답글 목록을 DTO 목록으로 변환하여 반환합니다.
        return replyComments.stream()
                .map(this::convertToDto) // 각 답글을 DTO로 변환합니다.
                .collect(Collectors.toList()); // 변환된 DTO들을 리스트로 모아 반환합니다.
    }

    // BoardComment를 BoardCommentDto로 변환하는 메서드
    private BoardCommentDto convertToDto(BoardComment comment) {
        // 새로운 BoardCommentDto 객체를 생성합니다.
        BoardCommentDto dto = new BoardCommentDto();

        // BoardComment의 속성 값을 BoardCommentDto에 설정합니다.
        dto.setCommentId(comment.getCommentId()); // 댓글 ID 설정
        dto.setCommentContent(comment.getCommentContent()); // 댓글 내용 설정
        dto.setCreateDate(comment.getCreateDate()); // 작성일 설정
        dto.setUserNo(comment.getUserNo()); // 회원 번호 설정
        dto.setBoardId(comment.getBoardId()); // 게시글 ID 설정
        dto.setCommentParent(comment.getCommentParent()); // 부모 댓글 ID 설정
        dto.setCommentOrder(comment.getCommentOrder()); // 댓글 순서 설정
        dto.setIsDeleted(comment.getIsDeleted()); // 삭제 여부 설정

        if (comment.getCommentParent() != 0) {
            // 부모 댓글을 찾습니다.
            BoardComment parentComment = boardCommentRepository.findById(comment.getCommentParent())
                    .orElseThrow(() -> new BoardNotFoundException("부모 댓글을 찾을 수 없습니다."));

            // 부모 댓글의 작성자 회원 번호를 사용하여 닉네임을 가져옵니다.
            Long parentCommentWriterUserNo = parentComment.getUserNo();
            String parentCommentWriterNickname = boardCommentRepository.findNicknameByUserNo(parentCommentWriterUserNo);
            System.out.println("parentCommentWriterNickname: " + parentCommentWriterNickname);
            dto.setParentNickname(parentCommentWriterNickname); // 부모 댓글 작성자 닉네임 설정
        }

        String nickname = boardCommentRepository.findNicknameByUserNo(comment.getUserNo());
        dto.setNickname(nickname);

        return dto;
    }


}
