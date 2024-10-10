package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "flash_cards")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class FlashCard {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "learning_section_id")
    private LessonSection lessonSection;
    @Column(name = "word")
    private String word;
    @Column(name = "meaning")
    private String meaning;
}