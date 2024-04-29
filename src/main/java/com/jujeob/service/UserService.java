package com.jujeob.service;

import com.jujeob.entity.User;
import com.jujeob.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


@Service
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    public boolean deleteUser(String userId) {
        User user = userRepository.findByUserId(userId).orElse(null);
        if (user == null || "Y".equals(user.getDeleted())) {
            return false; // 이미 삭제 처리된 사용자이거나 존재하지 않는 사용자
        }
        user.setDeleted("Y");
        user.setDeleteDate(LocalDateTime.now());
        userRepository.save(user);
        return true;
    }

    public boolean verifyUserPassword(String userId, String password) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + userId));

        return passwordEncoder.matches(password, user.getPassword());
    }
}
