package com.jujeob.controller;

import com.jujeob.dto.PasswordVerifyRequest;
import com.jujeob.dto.Profile;
import com.jujeob.dto.ProfileUpdateRequest;
import com.jujeob.security.service.CustomUserDetailsService;
import com.jujeob.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<?> profile() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userId = authentication.getName();
            System.out.println("Logged in user ID: " + userId);
            Profile profile = userDetailsService.loadUserProfile(userId);
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            System.out.println("Error during profile fetch: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching profile");
        }
    }


    @PatchMapping("/profileUpdate")
    public ResponseEntity<?> profileUpdate(@RequestBody ProfileUpdateRequest profileUpdateRequest) {

        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userId = authentication.getName();
            System.out.println("Updating profile for user ID: " + userId);

            // 서비스 메소드를 통해 프로필 업데이트 수행
            boolean isUpdated = userDetailsService.updateUserProfile(userId, profileUpdateRequest);
            if (!isUpdated) {
                System.out.println("Update failed for user ID: " + userId);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Update failed");
            }
            return ResponseEntity.ok("Profile updated successfully");
        } catch (Exception e) {
            System.out.println("Error during profile update: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating profile");
        }
    }


    @PostMapping("/verify-password")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> verifyPassword(@RequestBody PasswordVerifyRequest passwordVerifyRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName(); // or get it from authentication principal

        boolean isPasswordCorrect = userService.verifyUserPassword(currentUsername, passwordVerifyRequest.getPassword());


        if (isPasswordCorrect) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("비밀번호가 일치하지 않습니다.");
        }
    }

//    @PatchMapping("/{userId}")
//    @PreAuthorize("hasAuthority('MEMBER') or hasAuthority('ADMIN')")
//    public ResponseEntity<?> userUpdate(@PathVariable String userId, @RequestBody ProfileUpdateRequest profileUpdateRequest) {
//        try {
//            // 현재 인증된 사용자의 ID 검증
//            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//            String authenticatedUserId = authentication.getName(); // 이 부분은 사용자 ID를 문자열로 추정하고 있으며, 필요에 따라 타입을 조정해야 할 수 있습니다.
//
////            if (!userId.equals(Long.valueOf(authenticatedUserId)) && !authentication.getAuthorities().contains(new SimpleGrantedAuthority("ADMIN"))) {
////                System.out.println("Unauthorized update attempt for user ID: " + userId);
////                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not authorized to update this profile.");
////            }
//
//            // 서비스 메소드를 통해 프로필 업데이트 수행
//            boolean isUpdated = userDetailsService.updateUserProfile(userId, profileUpdateRequest);
//            if (!isUpdated) {
//                System.out.println("Update failed for user ID: " + userId);
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Update failed");
//            }
//            return ResponseEntity.ok("Profile updated successfully");
//        } catch (Exception e) {
//            System.out.println("Error during profile update: " + e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating profile");
//        }
//    }

    @DeleteMapping("/delete-account")
    public ResponseEntity<?> deleteAccount(Authentication authentication) {
        String userId = authentication.getName();

        boolean isDeleted = userService.deleteUser(userId);
        if (!isDeleted) {
            return ResponseEntity.badRequest().body("Failed to delete user or user already deleted");
        }
        return ResponseEntity.ok("User deleted successfully");
    }

//    @DeleteMapping("/{userId}")
//    @PreAuthorize("hasAuthority('MEMBER') or hasAuthority('ADMIN')")
//    public ResponseEntity<?> userDelete(@PathVariable String userId) {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        String authenticatedUserId = auth.getName();
//
//        // Check if the request is from the user or an admin
//        if (!userId.equals(String.valueOf(authenticatedUserId)) && auth.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ADMIN"))) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
//        }
//
//        boolean isDeleted = userService.deleteUser(userId);
//        if (!isDeleted) {
//            return ResponseEntity.badRequest().body("Failed to delete user or user already deleted");
//        }
//        return ResponseEntity.ok("User deleted successfully");
//    }

}


