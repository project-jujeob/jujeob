package com.jujeob.dto;

import com.jujeob.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardDto {
    private int BoardId;
    //    private Member Member;
    private User user;
    private String BoardTitle;
    private String BoardContent;
    private LocalDateTime CreateDate;
    private LocalDateTime BoardUpdate;
    private String BoardViews;
    private String ImageUrl;
    private int Image_size;
    private int ImageId;
}
