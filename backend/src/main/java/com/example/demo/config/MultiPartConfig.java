package com.example.demo.config;

import jakarta.servlet.MultipartConfigElement;
import org.springframework.context.annotation.Bean;

public class MultiPartConfig {
    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigElement multipartConfigElement = new MultipartConfigElement("", 52428800, 52428800, 0);
        return multipartConfigElement;
    }
}
