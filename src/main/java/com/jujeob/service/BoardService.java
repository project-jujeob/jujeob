package com.jujeob.service;

import com.jujeob.Exception.BoardNotFoundException;
import com.jujeob.dto.BoardDto;
import com.jujeob.dto.UpdatedBoardDto;
import com.jujeob.entity.Board;
import com.jujeob.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
        dto.setBoardViews(entity.getBoardViews());
        dto.setCreateDate(entity.getCreateDate());

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
    public void boardWrite(BoardDto boardDto) {
        // BoardDto를 이용하여 Board 객체를 생성
        Board board = new Board();
        board.setBoardTitle(boardDto.getBoardTitle());
        board.setBoardContent(boardDto.getBoardContent());
        board.setCreateDate(LocalDateTime.now()); // 현재 날짜 설정

        // 게시글 저장
        boardRepository.save(board);
    }
    //    게시글용
    public Board getBoardById(Integer boardId) {
        System.out.println("서비스에서 요청 받았어!!!!");
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));

        int views = Integer.parseInt(board.getBoardViews());
        views++;
        board.setBoardViews(String.valueOf(views));
        return boardRepository.save(board);
    }
    // 업데이트용
    public Board getUpdateById(Integer boardId) {
        System.out.println("서비스에서 요청 받았어!!!!");
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));

        return boardRepository.save(board);
    }

    public Board getBoardTitleAndContent(Integer boardId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
        return boardRepository.save(board);
    }


    public void updateBoard(int boardId, UpdatedBoardDto updatedBoardDto) {
/*        System.out.println("서비스입니다 아이디는 : "+ boardId);
        System.out.println("서비스입니다 입력된 제목은 : " + updatedBoardDto.getTitle());
        System.out.println("서비스입니다 입력된 내용은 : " + updatedBoardDto.getContent());*/
        Board existingBoard = boardRepository.findById(boardId)
                .orElseThrow(() -> new BoardNotFoundException("게시물을 찾을 수 없습니다."));
/*        System.out.println("서비스입니다 게시물의 아이디는 : " + existingBoard.getBoardId());*/
        existingBoard.setBoardTitle(updatedBoardDto.getTitle());
        existingBoard.setBoardContent(updatedBoardDto.getContent());
        existingBoard.setBoardUpdate(LocalDateTime.now());

        System.out.println("서비스입니다 저장된 제목은 : " + existingBoard.getBoardTitle());
        boardRepository.save(existingBoard);
    }


    public void deleteBoard(int boardId) {
        Board deleteBoard = boardRepository.findById(boardId)
                .orElseThrow(() -> new BoardNotFoundException("게시물을 찾을 수 없습니다."));
        boardRepository.delete(deleteBoard);
    }
}