package com.example.demo.repository;

import com.example.demo.model.FlashCard;
import com.example.demo.model.Question;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface FlashCardRepository extends MongoRepository<FlashCard, String> {
    @Query("{'sectionId' : ?0, 'isDeleted' :  0}")
    public List<FlashCard> findAllByLessonSectionId(String sectionId);
    @Query("{'isDeleted' :  0}")
    public List<FlashCard> findAll();
    @Query("{'isDeleted' :  0, '_id' : ?0}")
    @NonNull
    public Optional<FlashCard> findById(String id);
}
