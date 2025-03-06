package com.example.demo.dto;

import com.example.demo.model.FlashCard;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FlashCardDTO {
    private String imageReference;
    private String id;
    private String sectionId;
    private String word;
    private String meaning;
    private String example;
    private String imgUrl;
    public FlashCardDTO(FlashCard flashCard){
        this.id = flashCard.getId();
        this.sectionId = flashCard.getSectionId();
        this.word = flashCard.getWord();
        this.meaning = flashCard.getMeaning();
        this.example = flashCard.getExample();
        this.imgUrl = flashCard.getImgUrl();
    }
}