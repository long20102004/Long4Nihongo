package com.example.demo.controller;

import com.example.demo.model.FlashCard;
import com.example.demo.repository.FlashCardRepository;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class FlashCardController {
    public FlashCardRepository flashCardRepository;
    @Autowired
    public FlashCardController(FlashCardRepository flashCardRepository) {
        this.flashCardRepository = flashCardRepository;
    }
    @GetMapping("/flashcard/{id}")
    public Optional<FlashCard> getFlashCard(@PathVariable("id") Integer id){
        return flashCardRepository.findById(id);
    }
}
