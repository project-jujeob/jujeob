package com.jujeob.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/image")
public class ImageUploadController {

    private static final String UPLOAD_DIR = "src/main/resources/static/public/boardImg";

    @PostMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile image) {
        try {
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            Path imagePath = uploadPath.resolve(image.getOriginalFilename());
            Files.copy(image.getInputStream(), imagePath);
            String imageUrl = "/boardImg/"+ image.getOriginalFilename();
            return ResponseEntity.ok().body(imageUrl);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to upload image");
        }
    }
}