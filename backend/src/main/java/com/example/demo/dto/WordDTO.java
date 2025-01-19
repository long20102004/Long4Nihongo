package com.example.demo.dto;

import com.example.demo.model.Word;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WordDTO {
    private String id;
    private String sectionId;
    private String hiragana;
    private String kanji;
    private String meaning;
    public WordDTO(Word word) {
        this.id = word.getId();
        this.sectionId = word.getSectionId();
        this.hiragana = word.getHiragana();
        this.kanji = word.getKanji();
        this.meaning = word.getMeaning();
    }
}