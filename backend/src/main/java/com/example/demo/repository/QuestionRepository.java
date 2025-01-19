package com.example.demo.repository;

import com.example.demo.model.Question;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {
    @Query("{'sectionId' : ?0, 'isDeleted' :  0}")
    public List<Question> findBySectionId(String sectionId);
    @Query("{'isDeleted' : 0, '_id' : ?0}")
    @NonNull
    public Optional<Question> findById(String id);
}
