package com.jujeob.controller;

import com.jujeob.dto.BoardDto;
import com.jujeob.entity.Board;
import com.jujeob.entity.Product;
import com.jujeob.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
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
    public void boardWrite(@RequestBody BoardDto boardDto) {
        // BoardDto를 이용하여 Board 객체를 생성
        Board board = new Board();
        board.setBoardTitle(boardDto.getBoardTitle());
        board.setBoardContent(boardDto.getBoardContent());
        board.setCreateDate(LocalDate.now()); // 현재 날짜 설정

        // 생성된 Board 객체를 서비스로 전달하여 저장
        boardService.boardWrite(boardDto);
    }
    @PostMapping("/uploadImage")
    public void uploadImage(){

    }

    @GetMapping("/Detail/{boardId}")
    public Board getBoardDetail(@PathVariable  Integer boardId) {
        System.out.println("요청 보냈다");
        System.out.println("보드 아이디:" + boardId);

        return boardService.getBoardById(boardId);
    }
}
