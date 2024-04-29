package com.jujeob.repository;

import com.jujeob.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    // 로그인
    Optional<Member> findByMemId(String memId);

    // 아이디 중복검사
    boolean existsByMemId(String memId);

    @Query("SELECT m FROM Member m WHERE m.memRole = 'user'")
    List<Member> findAllNonAdminUsers();

}
