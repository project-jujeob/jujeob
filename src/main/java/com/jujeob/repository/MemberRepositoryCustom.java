package com.jujeob.repository;

import com.jujeob.entity.Member;

import java.util.List;

public interface MemberRepositoryCustom {
    List<Member> findAllBySearchTypeAndKeyword(String searchType, String keyword);

}
