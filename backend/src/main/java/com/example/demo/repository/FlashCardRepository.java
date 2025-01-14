package com.example.demo.repository;

import com.example.demo.model.FlashCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlashCardRepository extends MongoRepository<FlashCard, Integer> {
    @Query("{'sectionId' : ?0}")
    public List<FlashCard> findAllByLessonSectionId(int sectionId);
}
