package com.jujeob.repository;

import com.jujeob.entity.MemberLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberLogRepository extends JpaRepository<MemberLog, Long> {
}