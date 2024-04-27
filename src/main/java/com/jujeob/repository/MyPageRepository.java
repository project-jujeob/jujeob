package com.jujeob.repository;

import com.jujeob.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyPageRepository extends JpaRepository<Member, Long> {

}
