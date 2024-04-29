package com.jujeob.service;

import com.jujeob.Exception.BoardNotFoundException;
import com.jujeob.dto.BoardDto;
import com.jujeob.dto.UpdatedBoardDto;
import com.jujeob.entity.Board;
import com.jujeob.entity.BoardComment;
import com.jujeob.repository.BoardCommentRepository;
import com.jujeob.repository.BoardRepository;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.xml.stream.events.Comment;
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
        dto.setMemNickname(entity.getMember().getMemNickname());
        dto.setCommentCount(boardCommentRepository.countByBoardId(entity.getBoardId()));
        System.out.println("댓글개수: "  + boardCommentRepository.countByBoardId(entity.getBoardId()));
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
        board.setMemNo(boardDto.getMemNo());
        board.setBoardTitle(boardDto.getBoardTitle());
        board.setBoardContent(boardDto.getBoardContent());
        board.setCreateDate(LocalDateTime.now()); // 현재 날짜 설정

        // 게시글 저장
        boardRepository.save(board);
    }
    //    게시글용
    public BoardDto getBoardById(Integer boardId) {
        System.out.println("서비스에서 요청 받았어!!!!");
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
        String nickname = board.getMember().getMemNickname();

        // Board 엔티티에서 필요한 데이터를 추출하여 BoardDTO 객체로 변환
        System.out.println(board.getBoardId());
        BoardDto boardDto = new BoardDto();
        boardDto.setMemNo(board.getMemNo());
        boardDto.setBoardId(board.getBoardId());
        boardDto.setBoardTitle(board.getBoardTitle());
        boardDto.setBoardContent(board.getBoardContent());
        boardDto.setMemNickname(nickname);
        boardDto.setBoardUpdate(board.getBoardUpdate());
        boardDto.setCreateDate(board.getCreateDate());
        boardDto.setBoardViews(board.getBoardViews());

        return boardDto;
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
        // 게시물 찾기
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
    public void increaseViews(Integer boardId) throws NotFoundException {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new NotFoundException("게시물을 찾을 수 없습니다."));
        board.setBoardViews(board.getBoardViews() + 1); // 조회수 증가
        boardRepository.save(board); // 변경된 조회수를 데이터베이스에 저장
    }

}