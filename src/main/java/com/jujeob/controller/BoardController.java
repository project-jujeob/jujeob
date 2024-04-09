package com.jujeob.controller;

import com.jujeob.dto.BoardDto;
import com.jujeob.entity.Board;
import com.jujeob.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/board")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @GetMapping("/boardData")
    public List<BoardDto> getAllBoards() {
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
}
