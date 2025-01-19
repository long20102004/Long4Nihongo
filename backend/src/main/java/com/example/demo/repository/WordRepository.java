package com.example.demo.repository;

import com.example.demo.model.Question;
import com.example.demo.model.Word;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WordRepository extends MongoRepository<Word, String> {
    @Query("{'sectionId' : ?0, 'isDeleted' :  0}")
    public List<Word> findAllByLessonSectionId(String sectionId);
    @Query("{'isDeleted' :  '0', '_id' :  ?0}")
    @NonNull
    public Optional<Word> findById(String id);
}
