//package com.jujeob.oauth2.service;
//
//import com.jujeob.entity.User;
//import com.jujeob.repository.UserRepository;
//import com.jujeob.security.jwt.JwtTokenProvider;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
//import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.stereotype.Service;
//
//import java.util.Map;
//
//@Service
//public class CustomOAuth2UserService extends DefaultOAuth2UserService {
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private JwtTokenProvider jwtTokenProvider;
//
//    @Override
//    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {
//
//        OAuth2User oAuth2User = super.loadUser(request);
//        // 사용자 정보 처리 로직 구현
//        Map<String, Object> attributes = oAuth2User.getAttributes();
//        String userId = extractUserId(attributes); // 소셜 서비스에 따라 userId 추출 로직 구현 필요
//        updateUserDetails(userId, attributes);
//        return oAuth2User;
//    }
//
//    private String extractUserId(Map<String, Object> attributes) {
//        // 예시: Google의 경우
//        return (String) attributes.get("sub");
//    }
//
//    private void updateUserDetails(String userId, Map<String, Object> attributes) {
//        User user = userRepository.findByUserId(userId).orElseGet(() -> new User(userId);
//        // 사용자 정보 업데이트 로직
//        userRepository.save(user);
//    }
//}
