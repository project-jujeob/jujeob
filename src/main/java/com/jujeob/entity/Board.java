package com.jujeob.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table (name = "Board")
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Board_Id")
    private int BoardId;

    @NonNull
    @Column(name = "Board_Category")
    private String BoardCategory;

    @NonNull
    @Column(name = "Board_Title")
    private String BoardTitle;

    @NonNull
    @Column(name = "Board_Content")
    private String BoardContent;

    @NonNull
    @Column(name = "Board_CreateDate")
    private LocalDateTime CreateDate;

    @Column(name = "Board_Views")
    private String BoardViews = "0";

    @Column(name = "Board_Update" )
    private LocalDateTime BoardUpdate;

    @NonNull
    @Column(name = "Board_isDeleted" )
    private int IsDeleted = 0; ;

    @ManyToOne
    @JoinColumn(name = "memNo")
    private Member Member;

}