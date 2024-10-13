package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "words")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Word {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "learning_section_id")
    @Getter(AccessLevel.NONE)
    private LessonSection lessonSection;
    @Column(name = "hiragana")
    private String hiragana;
    @Column(name = "kanji")
    private String kanji;
    @Column(name = "meaning")
    private String meaning;
}