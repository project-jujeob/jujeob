/*
package com.jujeob.controller;

import com.jujeob.service.MyPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyPageControllerBackup {

    @Autowired
    MyPageService myPageService;

    // 비밀번호 확인 ver1
//    @PostMapping("/api/verifyPassword")
//    public ResponseEntity<?> verifyPassword(@RequestBody PasswordVerificationDto passwordVerificationDto) {
//        Member m = myPageService.findByMemId(passwordVerificationDto.getMemId());
//        if (m != null && myPageService.checkPassword(passwordVerificationDto.getMemPw(), m.getMemPw())) {
//            return ResponseEntity.ok().body(new ApiResponse(true, "비밀번호 확인!"));
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(false, "비밀번호가 일치하지 않습니다"));
//        }
//    }

    // 비밀번호 확인 ver2
//    @PostMapping("/api/verifyPassword")
//    public ResponseEntity<?> verifyPassword(@RequestBody PasswordVerificationDto passwordVerificationDto) {
//        boolean isPasswordMatch = myPageService.verifyPassword(passwordVerificationDto);
//        if (isPasswordMatch) {
//            System.out.println("MyPageController 비번확인 성공");
//            return ResponseEntity.ok(new ApiResponse(true, "컨트롤러 : 비밀번호 확인 성공"));
//        } else {
//            System.out.println("MyPageController 비번확인 실패");
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(false, "컨트롤러 : 비밀번호가 불일치임"));
//        }
//    }

    //비밀번호 확인 ver3
//    @PostMapping("/api/verifyPassword")
//    public ResponseEntity<ApiResponse> verifyPassword(@RequestBody PasswordVerificationDto passwordDto) {
//        try {
//            Long memId = Long.parseLong(passwordDto.getMemId());  // String to Long 변환
//            ApiResponse response = myPageService.verifyPassword(memId, passwordDto.getMemPw());
//            return ResponseEntity.ok(response);
//        } catch (NumberFormatException e) {
//            return ResponseEntity.badRequest().body(new ApiResponse(false, "Invalid member ID format"));
//        } catch (Exception e) {
//            return ResponseEntity.internalServerError().body(new ApiResponse(false, "Error verifying password"));
//        }
//    }



    // 회원정보수정
//    @GetMapping("/api/showProfile")
//    public List<RegisterDto> memberProfileInfo(){
//        return myPageService.getMemberProfileInfo();
//    }

//    // 회원정보 조회
//    @GetMapping("/api/getMemberProfile")
//    public ResponseEntity<RegisterDto> getMemberProfile(){
//        RegisterDto registerDto = myPageService.getMemberProfile();
//        return ResponseEntity.ok(registerDto);
//    }

}
*/
