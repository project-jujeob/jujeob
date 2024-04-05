package com.jujeob.controller;

import com.jujeob.entity.Board;
import com.jujeob.repository.BoardRepository;
import com.jujeob.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping
public class BoardController {

    @Autowired
    private BoardService boardService;

    @GetMapping("/api/boardData")
    public List<Board> getAllBoards() {
        return boardService.getAllBoards();
    }


}