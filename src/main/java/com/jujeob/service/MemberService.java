package com.jujeob.service;


import com.jujeob.dto.GetUsersDto;
import com.jujeob.entity.User;
import com.jujeob.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MemberService {

    @Autowired
    UserRepository userRepository;

    public List<GetUsersDto> getUserInfoByKeyword(String searchType, String keyword) {
        List <User> userList = userRepository.findAllBySearchTypeAndKeyword(searchType, keyword);
        List<GetUsersDto> memberDto = new ArrayList<>();
        for (User user : userList) {
            GetUsersDto dto = new GetUsersDto(user.getUserId(), user.getNickname(), user.getName(),
                    user.getEmail(), user.getPhone(), user.getAddress(),
                    user.getDeleted(), user.getCreateDate());
            memberDto.add(dto);
        }
        return memberDto;
    }
}
