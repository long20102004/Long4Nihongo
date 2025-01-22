package com.example.demo.repository;

import com.example.demo.model.Section;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SectionRepository extends MongoRepository<Section, String> {
    @Query("{ 'lessonId' : ?0, 'isDeleted' :  0}")
    public List<Section> findSectionByLessonId(int lessonId);

    @Query("{ '_id' : ?0, 'isDeleted' :  0}")
    public Optional<Section> findById(String sectionId);
}

