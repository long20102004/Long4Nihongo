package com.example.demo.dto;

import com.example.demo.model.Course;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDTO {
    private String transactionId;
    private int userId;
    private int money;
    private String qrCodeUrl;
    private List<CourseDTO> courses;
}
