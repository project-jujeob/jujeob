package com.jujeob.repository;

import com.jujeob.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    // 로그인
    Optional<Member> findByMemId(String memId);

    // 아이디 중복검사
    boolean existsByMemId(String memId);
}
