package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "questions")
@Getter
@Setter
public class Question{
    private int id;
    private int sectionId;
    private String question;
    private List<String> answers;
    private String correctAnswer;
}
