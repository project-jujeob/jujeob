package com.jujeob.controller;

import com.jujeob.dto.BoardCommentDto;
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
        System.out.println("컨트롤러에서 Comment 데이터 요청 받음");
        return boardCommentService.getCommentsByBoardId(boardId);
    }

    @PostMapping("/Write")
    public ResponseEntity<String> CommentAdd( @RequestBody BoardCommentDto boardCommentDto){
        System.out.println("댓글 Write 응답 받았음");
        try{
            boardCommentService.Write(boardCommentDto);
            return ResponseEntity.ok("댓글 작성 완료.");
        } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("댓글 작성 중 오류가 발생했습니다.");
        }
    }

}
