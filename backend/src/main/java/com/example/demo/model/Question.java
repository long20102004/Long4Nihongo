package com.example.demo.model;

import com.example.demo.dto.QuestionDTO;
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
@NoArgsConstructor
public class Question{
    private String id;
    private String sectionId;
    private String question;
    private List<String> answers;
    private String correctAnswer;
    private int isDeleted;
    public Question(QuestionDTO questionDTO) {
        this.sectionId = questionDTO.getSectionId();
        this.question = questionDTO.getQuestion();
        this.answers = questionDTO.getAnswers();
        this.correctAnswer = questionDTO.getCorrectAnswer();
    }
}
