package com.jujeob.service;

import com.jujeob.dto.BoardDto;
import com.jujeob.entity.Board;
import com.jujeob.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        System.out.println("나 Dto인데 6번 보내줄게 서비스야");
        return dto;
    }

    public List<BoardDto> getAllBoards() {
        List<Board> Boards = boardRepository.findAll();
        List<BoardDto> BoardsDtos = new ArrayList<>();
        System.out.println("어 받았어 이제 Dto차례야");
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
    public Board getBoardById(Integer boardId) {
        System.out.println("서비스에서 요청 받았어!!!!");
        return boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
    }
}