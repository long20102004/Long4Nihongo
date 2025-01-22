// src/main/java/com/example/demo/controller/FileController.java
package com.example.demo.controller;

import com.example.demo.model.Section;
import com.example.demo.service.cloud_service.CloudflareR2Service;
import com.example.demo.service.data_service.SectionService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.model.Bucket;
import software.amazon.awssdk.services.s3.model.S3Object;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/files")
@AllArgsConstructor
public class FileController {
    public static final String imageBucketUrl = "https://cdn.long4nihongo.online/";
    public static final String videoBucketUrl = "https://cdn.course-content.video.long4nihongo.online/";
    private final CloudflareR2Service cloudflareR2Service;
    private SectionService sectionService;

    @PostMapping("/upload/{sectionId}")
    public void uploadFile(@RequestParam("file") MultipartFile file, @PathVariable String sectionId) throws IOException {
        String bucketName = "";
        String key = file.getOriginalFilename();
        File tempFile = File.createTempFile("upload-", file.getOriginalFilename());
        file.transferTo(tempFile);
        String url = "";
        if (Objects.equals(file.getContentType(), "video/mp4")) {
            url = videoBucketUrl + key;
            bucketName = "long4nihongo-video";
        }
        else {
            url = imageBucketUrl + key;
            bucketName = "long4nihongo-image";
        }
        cloudflareR2Service.uploadFile(bucketName, key, tempFile.getAbsolutePath());
        Section section = sectionService.findById(sectionId);
        section.setVideoUrl(url);
        sectionService.save(section);
    }

    @GetMapping("/download/{key}")
    public S3Object downloadFile(@PathVariable String key) {
        String bucketName = "your-bucket-name";
        return cloudflareR2Service.downloadFile(bucketName, key);
    }
    @GetMapping("/buckets")
    public List<String> listBuckets() {
        return cloudflareR2Service.listBuckets();
    }
}