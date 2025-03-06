package com.example.demo.service.cloud_service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.net.URL;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CloudflareR2Service {

    private final S3Client s3Client;

    public void uploadFile(String bucketName, String key, String filePath) {
        s3Client.putObject(PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build(), Paths.get(filePath));
    }


    public S3Object downloadFile(String bucketName, String key) {
        return convertToS3Object(s3Client.getObject(GetObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build()));
    }
    public S3Object convertToS3Object(ResponseInputStream<GetObjectResponse> responseInputStream) {
        GetObjectResponse getObjectResponse = responseInputStream.response();

        return S3Object.builder()
                .key(getObjectResponse.metadata().get("key"))
                .eTag(getObjectResponse.eTag())
                .size(getObjectResponse.contentLength())
                .lastModified(getObjectResponse.lastModified())
                .build();
    }
    public List<String> listBuckets() {
        ListBucketsResponse listBucketsResponse = s3Client.listBuckets();
        return listBucketsResponse.buckets().stream()
                .map(Bucket::name)
                .collect(Collectors.toList());
    }
}