package com.example.demo.dto;

import com.example.demo.model.FlashCard;
import com.example.demo.model.Question;
import com.example.demo.model.Section;
import com.example.demo.model.Word;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class SectionDTO {
    private String id;
    private String name;
    private int lessonId;
    private List<Word> words;
    private List<FlashCard> flashCards;
    private List<Question> questions;
    private String videoUrl;
    private int isDemo;

    public SectionDTO(Section section) {
        this.id = section.getId();
        this.name = section.getName();
        this.lessonId = section.getLessonId();
        this.videoUrl = section.getVideoUrl();
        this.isDemo = section.getIsDemo();
    }
}
