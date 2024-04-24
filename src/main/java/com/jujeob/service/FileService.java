package com.jujeob.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class FileService {
    public String uploadImage(MultipartFile file, Long memIdx) throws IOException {

        // 1. Null 또는 빈 파일 확인
        if (file.isEmpty()) {
            throw new IllegalArgumentException("파일이 비어 있습니다");
        }

        // 2. 파일 유형 확인 (이미지인지)
        if (!file.getContentType().startsWith("image/")) {
            throw new IllegalArgumentException("잘못된 파일 유형입니다. 이미지를 업로드하세요");
        }

        //프로필사진 추가
        String projectPath = System.getProperty("user.dir")
                + "\\src\\main\\resources\\static\\productImg";

        UUID uuid = UUID.randomUUID();

        // 3. 파일 이름 충돌 처리
        String fileName = uuid+"_"+file.getOriginalFilename();

        // 4. 파일을 저장할 디렉토리 생성
        File saveDirectory = new File(projectPath);
        if (!saveDirectory.exists()) {
            saveDirectory.mkdirs();
        }

        File saveFile = new File(projectPath, fileName);
        file.transferTo(saveFile);

        return "/files/"+fileName;

    }
}
