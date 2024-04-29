package com.jujeob.repository;

import com.jujeob.entity.SocialType;
import com.jujeob.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUserId(String userId);

    boolean existsByEmail(String email);

    Optional<User> findByUserId(String userId);

    Optional<User> findBySocialTypeAndSocialId(SocialType socialType, String socialId);
}