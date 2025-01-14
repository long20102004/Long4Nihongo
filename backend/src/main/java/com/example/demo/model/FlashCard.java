package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "flashcards")
@Getter
@Setter
public class FlashCard{
    private int id;
    private int sectionId;
    private String word;
    private String meaning;
    private String example;
}