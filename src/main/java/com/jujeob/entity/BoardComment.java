package com.jujeob.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.time.LocalDate;
import java.util.Locale;

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

    @NonNull
    @Column(name = "Comment_CreateDate")
    private LocalDate CreateDate;

    @NonNull
    @Column(name = "Comment_Content")
    private String  CommentContent;

    @NonNull
    @Column(name = "Comment_Parent_No")
    private int CommentOriginal;

    @NonNull
    @Column(name = "Comment_Order")
    private int CommentOrder;

    @NonNull
    @Column(name = "Comment_depth")
    private int CommentDepth;

    @NonNull
    @Column(name = "Comment_isDeleted")
    private int isDeleted;

    @Column(name = "Comment_UpdateDate")
    private LocalDate UpdateDate;

    @ManyToOne
    @JoinColumn(name = "Board_Id")
    private Board Board;

    @ManyToOne
    @JoinColumn(name = "memNo")
    private Member member;
}