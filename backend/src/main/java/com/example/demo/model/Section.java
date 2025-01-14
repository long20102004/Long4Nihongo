package com.example.demo.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "sections")
@Getter
@Setter
public class Section {
    private int lessonId;
    private int id;
    private String name;
    private String content;
    @DBRef
    private List<Word> words;
    @DBRef
    private List<FlashCard> flashCards;
    @DBRef
    private List<Question> questions;
}
