package com.jujeob.service;

import com.jujeob.dto.BoardDto;
import com.jujeob.entity.Board;
import com.jujeob.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;


    private BoardDto mapBoardToDto(Board entity) {
        BoardDto dto = new BoardDto();
        dto.setBoardId(entity.getBoardId());
        dto.setBoardTitle(entity.getBoardTitle());
        dto.setBoardContent(entity.getBoardContent());
        dto.setCreateDate(entity.getCreateDate());
        return dto;
    }

    public List<BoardDto> getAllBoards() {
        List<Board> Boards = boardRepository.findAll();
        List<BoardDto> BoardsDtos = new ArrayList<>();

        for (Board entity : Boards) {
            BoardsDtos.add(mapBoardToDto(entity));
        }

        return BoardsDtos;
    }
    public Board boardWrite(BoardDto boardDto) {
        // BoardDto를 이용하여 Board 객체를 생성
        Board board = new Board();
        board.setBoardTitle(boardDto.getBoardTitle());
        board.setBoardContent(boardDto.getBoardContent());
        board.setCreateDate(LocalDate.now()); // 현재 날짜 설정

        // 게시글 저장
        return boardRepository.save(board);
    }

}