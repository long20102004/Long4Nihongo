package com.example.demo.model;

import com.example.demo.dto.FlashCardDTO;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "flashcards")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FlashCard{
    private String id;
    private String sectionId;
    private String word;
    private String meaning;
    private String example;
    private String imgUrl;
    private int isDeleted;
    private Integer order;
    public FlashCard(FlashCardDTO flashCardDTO) {
        this.imgUrl = flashCardDTO.getImgUrl();
        this.sectionId = flashCardDTO.getSectionId();
        this.word = flashCardDTO.getWord();
        this.meaning = flashCardDTO.getMeaning();
        this.example = flashCardDTO.getExample();
    }
}