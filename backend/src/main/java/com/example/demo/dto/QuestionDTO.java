package com.example.demo.dto;

import com.example.demo.model.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionDTO {
    private String id;
    private String sectionId;
    private String question;
    private List<String> answers;
    private String correctAnswer;

    public QuestionDTO(Question question) {
        this.id = question.getId();
        this.sectionId = question.getSectionId();
        this.question = question.getQuestion();
        this.answers = question.getAnswers();
        this.correctAnswer = question.getCorrectAnswer();
    }
}
