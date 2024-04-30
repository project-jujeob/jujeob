package com.jujeob.repository;

import com.jujeob.entity.BoardComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardCommentRepository extends JpaRepository<BoardComment, Integer> {
    List<BoardComment> findByBoardId(int boardId);

    int countByBoardId(int boardId);

    List<BoardComment> findByCommentParent(int parentCommentId);

    long countByCommentParentAndIsDeleted(int commentId, int isDeleted);

    @Query("SELECT nickname FROM User WHERE userNo = :userNo")
    String findNicknameByUserNo(Long userNo);
}
