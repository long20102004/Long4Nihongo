package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "questions")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Question {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "lesson_section_id")
    private LessonSection lessonSection;
    @Column(name = "question")
    private String question;
}
