package com.jujeob.repository;

import com.jujeob.entity.BoardComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardCommentRepository extends JpaRepository<BoardComment, Integer> {
    List<BoardComment> findByBoardId(int boardId);
    //    @Query("SELECT m.memNickname FROM Member m WHERE m.memNo = :memNo")
//    String findNicknameByMemNo(Long memNo);
    @Query("SELECT nickname FROM User WHERE userNo = :userNo")
    String findNicknameByUserNo(Long userNo);


}


