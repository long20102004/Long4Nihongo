package com.example.demo.model;

import com.example.demo.dto.SectionDTO;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "sections")
@Getter
@Setter
@NoArgsConstructor
public class Section {
    private int lessonId;
    private String id;
    private String name;
    private String content;
    @DBRef
    private List<Word> words;
    @DBRef
    private List<FlashCard> flashCards;
    @DBRef
    private List<Question> questions;
    private int isDeleted;
    public Section(SectionDTO sectionDTO) {
        this.name = sectionDTO.getName();
        this.lessonId = sectionDTO.getLessonId();
    }
}
