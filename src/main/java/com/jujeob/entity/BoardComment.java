package com.jujeob.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "BoardComment")
public class BoardComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Comment_Id")
    private int Comment_Id;


    @Column(name = "Comment_CreateDate")
    private LocalDateTime CreateDate;


    @Column(name = "Comment_Content")
    private String  CommentContent;


    @Column(name = "Comment_Parent_No")
    private int CommentOriginal;


    @Column(name = "Comment_Order")
    private int CommentOrder;


    @Column(name = "Comment_depth")
    private int CommentDepth;


    @Column(name = "Comment_isDeleted")
    private int isDeleted;

    @Column(name = "Comment_UpdateDate")
    private LocalDateTime UpdateDate;

    @Column(name = "board_id")
    private int boardId;


//    @Column(name = "mem_no")
//    private Long memNo;

    @Column(name = "user_no")
    private Long userNo;


    @ManyToOne
    @JoinColumn(name = "board_id", insertable = false, updatable = false)
    private Board board;

//    @ManyToOne
//    @JoinColumn(name = "mem_no", insertable = false, updatable = false)
//    private Member member;

    @ManyToOne
    @JoinColumn(name = "user_no", insertable = false, updatable = false)
    private User user;

}