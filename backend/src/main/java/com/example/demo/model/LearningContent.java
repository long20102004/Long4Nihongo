package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Table(name = "learning_contents")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class LearningContent {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "learning_section_id")
    private LessonSection lessonSection;
    @Column(name = "content")
    private byte[] content;
}