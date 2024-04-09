package com.jujeob.service;

import com.jujeob.entity.Member;
import com.jujeob.repository.MyPageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyPageService {

    @Autowired
    MyPageRepository myPageRepository;

    public List<Member> getMemberProfileInfo() {
        return myPageRepository.findAll();
    }
}
