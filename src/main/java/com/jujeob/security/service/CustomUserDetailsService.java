package com.jujeob.security.service;

import com.jujeob.dto.Profile;
import com.jujeob.dto.ProfileUpdateRequest;
import com.jujeob.entity.User;
import com.jujeob.repository.UserRepository;
import com.jujeob.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + userId));

        if ("Y".equals(user.getDeleted())) {
            throw new UsernameNotFoundException("해당 계정은 탈퇴된 계정입니다.");
        }

        return new CustomUserDetails(user);
//        return org.springframework.security.core.userdetails.User.builder()
//                .username(user.getUserId())
//                .password(user.getPassword())
//                .roles(user.getRole().name())
//                .build();

//        return new org.springframework.security.core.userdetails.User(user.getUserId(), user.getPassword(), user.getRoles());
    }

    public Profile loadUserProfile(String userId) {
        Optional<User> userOptional = userRepository.findByUserId(userId);
        if (userOptional.isEmpty()) {
            System.out.println("User ID " + userId + " not found in database.");
            throw new RuntimeException("User not found");
        }
        User user = userOptional.get();
        return new Profile(user.getUserNo(),
                user.getUserId(),
                user.getNickname(),
                user.getName(),
                user.getPhone(),
                user.getEmail(),
                user.getAddress(),
                user.getCreateDate(),
                user.getProfileImage());
    }

    public boolean updateUserProfile(String userId, ProfileUpdateRequest updateRequest) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + userId));

        // 프로필 정보 업데이트
        updateUserInfoFromRequest(user, updateRequest);
        user.setUpdateDate(LocalDateTime.now()); // 서버의 현재 시간을 설정


        try {
            userRepository.save(user); // 업데이트된 사용자 정보 저장
            return true;
        } catch (Exception e) {
            // 로깅 등 오류 처리 로직을 적절히 추가
            return false;
        }
    }

    private void updateUserInfoFromRequest(User user, ProfileUpdateRequest request) {
        user.setNickname(request.getNickname());
        user.setName(request.getName());
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());
        user.setAddress(request.getAddress());
        user.setProfileImage(request.getProfileImage());
        user.setUpdateDate(request.getUpdateDate()); // 일반적으로는 서버 시간을 사용할 것을 권장
    }
}
