package com.jujeob.prop;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/*해당 클래스는 Spring Boot의 `@ConfigurationProperties`
어노테이션을 사용하여, application.yml(속성 설정 파일)로부터
JWT 관련 프로퍼티를 관리하는 프로퍼티 클래스*/

// application.properties의 시크릿 키를 가져와 사용
@Data
@Component
@ConfigurationProperties("com.jujeob") // com.jujeob의 하위 속성들을 지정해서 설정하겠다
public class JwtProp {

    // com.jujeob.secretKey로 지정된 프로퍼티 값을 주입받는 필드
    // ✅ com.jujeob.secret-key ➡ secretKey : {인코딩된 시크릿 키}
    private String secretKey;
}
