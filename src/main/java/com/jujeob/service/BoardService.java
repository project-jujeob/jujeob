package com.jujeob.service;

import com.jujeob.Exception.BoardNotFoundException;
import com.jujeob.dto.BoardDto;
import com.jujeob.dto.UpdatedBoardDto;
import com.jujeob.entity.Board;
import com.jujeob.entity.BoardComment;
import com.jujeob.repository.BoardCommentRepository;
import com.jujeob.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private BoardCommentRepository boardCommentRepository;
    private BoardDto mapBoardToDto(Board entity) {
        BoardDto dto = new BoardDto();
        dto.setIsDeleted(entity.getIsDeleted());
        dto.setBoardId(entity.getBoardId());
        dto.setBoardTitle(entity.getBoardTitle());
        dto.setBoardContent(entity.getBoardContent());
        dto.setBoardViews(entity.getBoardViews());
        dto.setCreateDate(entity.getCreateDate());
        dto.setNickname(entity.getUser().getNickname());
        dto.setCommentCount(boardCommentRepository.countByBoardId(entity.getBoardId()));
        dto.setBoardCategory(entity.getBoardCategory());
        dto.setImageUrl(entity.getImageUrl());
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
    public List<BoardDto> getAllBoardsByCategory(String category) {
        List<Board> boards = boardRepository.findByBoardCategory(category);
        List<BoardDto> boardDtos = new ArrayList<>();

        for (Board entity : boards) {
            boardDtos.add(mapBoardToDto(entity));
        }

        return boardDtos;
    }
    public void boardWrite(BoardDto boardDto) {
        Board board = new Board();
        board.setUserNo(boardDto.getUserNo());
        board.setBoardTitle(boardDto.getBoardTitle());
        board.setBoardContent(boardDto.getBoardContent());
        board.setCreateDate(LocalDateTime.now());
        board.setBoardCategory(boardDto.getBoardCategory());
        board.setImageUrl(boardDto.getImageUrl());
        boardRepository.save(board);
    }
    public BoardDto getBoardById(Integer boardId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
        String nickname = board.getUser().getNickname();
        System.out.println(board.getBoardId());
        BoardDto boardDto = new BoardDto();
        boardDto.setUserNo(board.getUserNo());
        boardDto.setBoardId(board.getBoardId());
        boardDto.setBoardTitle(board.getBoardTitle());
        boardDto.setBoardContent(board.getBoardContent());
        boardDto.setNickname(nickname);
        boardDto.setBoardUpdate(board.getBoardUpdate());
        boardDto.setCreateDate(board.getCreateDate());
        boardDto.setBoardViews(board.getBoardViews());
        boardDto.setImageUrl(board.getImageUrl());
        return boardDto;
    }
    public Board getBoardTitleAndContent(Integer boardId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
        return boardRepository.save(board);
    }
    public void updateBoard(int boardId, UpdatedBoardDto updatedBoardDto) {
        Board existingBoard = boardRepository.findById(boardId)
                .orElseThrow(() -> new BoardNotFoundException("게시물을 찾을 수 없습니다."));
        existingBoard.setBoardTitle(updatedBoardDto.getTitle());
        existingBoard.setBoardContent(updatedBoardDto.getContent());
        existingBoard.setBoardUpdate(LocalDateTime.now());
        boardRepository.save(existingBoard);
    }
    public void deleteBoard(int boardId) {
        Board deleteBoard = boardRepository.findById(boardId)
                .orElseThrow(() -> new BoardNotFoundException("게시물을 찾을 수 없습니다."));

        List<BoardComment> comments = boardCommentRepository.findByBoardId(boardId);
        for (BoardComment comment : comments) {
            comment.setIsDeleted(1);
        }
        boardCommentRepository.saveAll(comments);
        deleteBoard.setIsDeleted(1);
        boardRepository.save(deleteBoard);
    }
    public void increaseViews(Integer boardId) throws ChangeSetPersister.NotFoundException {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(ChangeSetPersister.NotFoundException::new);
        board.setBoardViews(board.getBoardViews() + 1);
        boardRepository.save(board);
    }

}