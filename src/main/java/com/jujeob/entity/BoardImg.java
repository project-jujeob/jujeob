package com.jujeob.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "BoardImg")
public class BoardImg {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BoardImg_Id")
    private int imageId;

    @Column(name = "BoardImg_Url")
    private String imageUrl;

    @Column(name = "BoardImg_Size")
    private int image_size;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Board_CreateDate")
    private Board Update;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Board_Id")
    private Board boardId;

}
