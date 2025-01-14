package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "words")
@Getter
@Setter
public class Word{
    private int id;
    private int sectionId;
    private String hiragana;
    private String kanji;
    private String meaning;
}