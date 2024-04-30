package com.jujeob.repository;

import com.jujeob.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserRepositoryCustom {
    List<User> findAllBySearchTypeAndKeyword(String searchType, String keyword);
}
