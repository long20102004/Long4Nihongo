package com.example.demo.model;

import com.example.demo.dto.WordDTO;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "words")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Word{
    private String id;
    private String sectionId;
    private String hiragana;
    private String kanji;
    private String meaning;
    private int isDeleted;
    public Word(WordDTO wordDTO) {
        this.sectionId = wordDTO.getSectionId().trim();
        this.hiragana = wordDTO.getHiragana().trim();
        this.kanji = wordDTO.getKanji().trim();
        this.meaning = wordDTO.getMeaning().trim();
    }
}