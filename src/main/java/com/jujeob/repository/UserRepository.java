package com.jujeob.repository;

import com.jujeob.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> , UserRepositoryCustom {
    boolean existsByUserId(String userId);

    Optional<User> findByUserId(String userId);

    @Query("SELECT u FROM User u WHERE u.name = :name AND u.phone = :phone")
    Optional<User> findMemIdByNameAndPhone(String name, String phone);
}