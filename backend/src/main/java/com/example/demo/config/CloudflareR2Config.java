// src/main/java/com/example/demo/config/CloudflareR2Config.java
package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;

import java.net.URI;

@Configuration
public class CloudflareR2Config {

    @Bean
    public S3Client s3Client() {
        return S3Client.builder()
                .region(Region.of("auto")) // Use "auto" for Cloudflare R2
                .endpointOverride(URI.create("https://21122b02632a05e76511fa5e62741219.r2.cloudflarestorage.com"))
                .credentialsProvider(StaticCredentialsProvider.create(
                        AwsBasicCredentials.create("295d6052306f6586f2f8a7360eedc911", "c5396033c3e81965571c48e9183b87e16772f0c3d8ea655f17f982d56896bbcc")
                ))
                .serviceConfiguration(S3Configuration.builder()
                        .pathStyleAccessEnabled(true)
                        .build())
                .build();
    }
}