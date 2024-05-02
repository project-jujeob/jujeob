package com.jujeob.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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


    @Column(name = "Board_Category")
    private String boardCategory;


    @Column(name = "Board_Title")
    private String BoardTitle;


    @Column(name = "Board_Content")
    private String BoardContent;


    @Column(name = "Board_CreateDate")
    private LocalDateTime CreateDate;

    @Column(name = "Board_Views")
    private int BoardViews = 0;

    @Column(name = "Board_Update" )
    private LocalDateTime BoardUpdate;


    @Column(name = "Board_isDeleted" )
    private int IsDeleted = 0; ;

    @Column(name = "userNo")
    private Long userNo;

    @Column(name = "imageUrl")
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "userNo" , insertable = false, updatable = false)
    private User user;
}
