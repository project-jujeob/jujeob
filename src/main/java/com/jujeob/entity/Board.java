package com.jujeob.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table (name = "Board")
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Board_Id")
    private int boardId;

    @NonNull
    @Column(name = "Board_Category")
    private String boardCategory;

    @NonNull
    @Column(name = "Board_Title")
    private String boardTitle;

    @NonNull
    @Column(name = "Board_Content")
    private String boardContent;

    @NonNull
    @Column(name = "Board_CreateDate")
    private LocalDate CreateDate;

    @Column(name = "Board_Views")
    private String boardViews;

    @Column(name = "Board_Update" )
    private LocalDate boardUpdate;

    @NonNull
    @Column(name = "Board_isDeleted" )
    private int isDeleted;


    @ManyToOne
    @JoinColumn(name = "memNo")
    private Member member;



}
