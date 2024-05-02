package com.jujeob.controller;

import com.jujeob.Exception.BoardNotFoundException;
import com.jujeob.dto.BoardDto;
import com.jujeob.dto.UpdatedBoardDto;
import com.jujeob.entity.Board;
import com.jujeob.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/board")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @GetMapping("/boardBest")
    public List<BoardDto> getBest() {
        return boardService.getAllBoards();
    }

    @GetMapping("/boardData")
    public List<BoardDto> getAllBoards(@RequestParam(required = false) String category) {
        if (category == null || category.isEmpty() || category.equals("전체")) {
            return boardService.getAllBoards();
        } else {
            return boardService.getAllBoardsByCategory(category);
        }
    }
    @PostMapping("/Write")
    public ResponseEntity<String> boardWrite(@RequestBody BoardDto boardDto) {
        try {
            boardService.boardWrite(boardDto);
            return ResponseEntity.ok("게시물이 성공적으로 작성되었습니다!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시물 작성 중 오류가 발생했습니다.");
        }
    }

    @PostMapping("/uploadImage")
    public void uploadImage(){

    }

    @GetMapping("/Detail/{boardId}")
    public BoardDto getBoardDetail(@PathVariable  Integer boardId) {
        return boardService.getBoardById(boardId);
    }

    @GetMapping("/TitleAndContent/{boardId}")
    public Board getBoardTitleAndContent(@PathVariable  Integer boardId) {
        return boardService.getBoardTitleAndContent(boardId);
    }

    @PatchMapping("/Update/{boardId}")
    public ResponseEntity<String> updateBoard(@PathVariable int boardId, @RequestBody UpdatedBoardDto updatedBoardDto) {
        try {
            boardService.updateBoard(boardId, updatedBoardDto);
            return ResponseEntity.ok("게시물이 성공적으로 업데이트되었습니다!");
        } catch (BoardNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("게시물을 찾을 수 없습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시물 업데이트 중 오류가 발생했습니다.");
        }
    }
    @DeleteMapping("/Delete/{boardId}")
    public ResponseEntity<String> deleteBoard(@PathVariable int boardId){
        try{
            boardService.deleteBoard(boardId);
            return ResponseEntity.ok("게시물이 삭제되었습니다.");
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시물 삭제 중 오류가 발생했습니다.");
        }
    }
    @PostMapping("/IncreaseViews/{boardId}")
    public ResponseEntity<String> increaseViews(@PathVariable("boardId") Integer boardId) {
        try {
            boardService.increaseViews(boardId);
            return new ResponseEntity<>("조회수 증가 완료", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("조회수 증가 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
