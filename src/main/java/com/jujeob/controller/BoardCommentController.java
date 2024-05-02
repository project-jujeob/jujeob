package com.jujeob.controller;

import com.jujeob.dto.BoardCommentDto;
import com.jujeob.entity.Board;
import com.jujeob.service.BoardCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.xml.stream.events.Comment;
import java.util.List;

@Controller
@RestController
@RequestMapping("/boardComment")
public class BoardCommentController {
    @Autowired
    private BoardCommentService boardCommentService;

    @GetMapping("/CommentData/{boardId}")
    public List<BoardCommentDto> getCommentsByBoardId(@PathVariable int boardId) {
        return boardCommentService.getCommentsByBoardId(boardId);
    }

    @PostMapping("/Write")
    public ResponseEntity<String> CommentAdd( @RequestBody BoardCommentDto boardCommentDto){
        try{
            boardCommentService.Write(boardCommentDto);
            return ResponseEntity.ok("댓글 작성 완료.");
        } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("댓글 작성 중 오류가 발생했습니다.");
        }
    }
    @DeleteMapping("/Delete/{commentId}")
    public ResponseEntity<String> deleteBoard(@PathVariable int commentId){
        try{
            boardCommentService.deleteComment(commentId);
            return ResponseEntity.ok("게시물이 삭제되었습니다.");
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시물 삭제 중 오류가 발생했습니다.");
        }
    }
    @PatchMapping("/Update/{commentId}")
    public ResponseEntity<String> updateComment(@PathVariable int commentId, @RequestBody String updatedContent) {
        try {
            boardCommentService.updateComment(commentId, updatedContent);
            return ResponseEntity.ok("댓글이 성공적으로 수정되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("댓글 수정에 실패했습니다.");
        }
    }
    @PostMapping("/Reply/{commentId}")
    public ResponseEntity<String> ReplyAdd(@RequestBody BoardCommentDto boardCommentDto){
        try{
            boardCommentService.ReplyAdd(boardCommentDto);
            return ResponseEntity.ok("댓글 작성 완료.");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("댓글 작성 중 오류가 발생했습니다.");
        }
    }
    @GetMapping("/ReplyData/{commentParent}")
    public List<BoardCommentDto> getReplyByParentId(@PathVariable int commentParent) {
        return boardCommentService.getReplyByParentId(commentParent);
    }
}
