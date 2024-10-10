package com.example.demo.repository;

import com.example.demo.model.FlashCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface FlashCardRepository extends JpaRepository<FlashCard, Integer> {
//    @Query(value = "SELECT u from FlashCard u where u.id = ?1")
//    public FlashCard getFlashCardById(int id);
}
