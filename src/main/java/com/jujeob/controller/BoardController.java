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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/board")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @GetMapping("/boardData")
    public List<BoardDto> getAllBoards() {
        System.out.println("나 컨트롤러 인데 서비스 요청 받았어?");
        return boardService.getAllBoards();
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
        System.out.println("요청 보냈다");
        System.out.println("보드 아이디:" + boardId);

        return boardService.getBoardById(boardId);
    }

    @GetMapping("/TitleAndContent/{boardId}")
    public Board getBoardTitleAndContent(@PathVariable  Integer boardId) {
        System.out.println("요청 보냈다");
        System.out.println("보드 아이디:" + boardId);

        return boardService.getBoardTitleAndContent(boardId);
    }

    @PatchMapping("/Update/{boardId}")
    public ResponseEntity<String> updateBoard(@PathVariable int boardId, @RequestBody UpdatedBoardDto updatedBoardDto) {
 /*       System.out.println( "컨트롤러에서 요청 받았습니다 아이디는 : " + boardId);
        System.out.println( "컨트롤러에서 요청 받았습니다 제목은 : " + updatedBoardDto.getTitle());
        System.out.println( "컨트롤러에서 요청 받았습니다 내용은 : " + updatedBoardDto.getContent());*/
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
/*        System.out.println( "컨트롤러에서 요청 받았습니다 아이디는 : " + boardId);*/
        try{
            boardService.deleteBoard(boardId);
            return ResponseEntity.ok("게시물이 삭제되었습니다.");
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시물 삭제 중 오류가 발생했습니다.");
        }
    }
    @PostMapping("/IncreaseViews/{boardId}")
    public ResponseEntity<String> increaseViews(@PathVariable("boardId") Integer boardId) {
        System.out.println("뷰요청받음");
        try {
            boardService.increaseViews(boardId);
            return new ResponseEntity<>("조회수 증가 완료", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("조회수 증가 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
