// src/main/java/com/example/demo/controller/FileController.java
package com.example.demo.controller;

import com.example.demo.model.Course;
import com.example.demo.model.Lesson;
import com.example.demo.model.Section;
import com.example.demo.service.cloud_service.CloudflareR2Service;
import com.example.demo.service.data_service.CourseService;
import com.example.demo.service.data_service.LessonService;
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
    public static final String imageBucketUrl = "https://cdn.longnihongo.com/";
    private final CloudflareR2Service cloudflareR2Service;
    private SectionService sectionService;
    private LessonService lessonService;
    private CourseService courseService;

    @PostMapping("/upload/{sectionId}")
    public void uploadFile(@RequestParam("file") MultipartFile file, @PathVariable String sectionId) throws IOException {
        String bucketName = "longnihongo-data";  // Ensure correct bucket name
        Section section = sectionService.findById(sectionId);
        Lesson lesson = lessonService.findById(section.getLessonId());
        Course course = lesson.getCourse();
        // Generate key and remove invalid filename characters
        String key = System.currentTimeMillis() + getFileExtension(file.getOriginalFilename());
        File tempFile = File.createTempFile("upload-", key.replace("/", "_"));  // Fix temp file creation

        file.transferTo(tempFile);

        // Upload with correct "video/" prefix
        String cloudKey = "video/" + course.getName() + "/" + lesson.getName() + "/" + section.getName() + "/" + key;
        String url = imageBucketUrl + cloudKey;
        cloudflareR2Service.uploadFile(bucketName, cloudKey, tempFile.getAbsolutePath());
        // Update section with video URL
        section.setVideoUrl(url);
        sectionService.save(section);
    }

    private String getFileExtension(String filename) {
        int index = filename.lastIndexOf('.');
        return (index > 0) ? filename.substring(index) : "";
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