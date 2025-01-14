package com.example.demo.repository;

import com.example.demo.model.Lesson;
import com.example.demo.model.Section;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface SectionRepository extends MongoRepository<Section, Integer> {
    @Query("{ 'lessonId' : ?0 }")
    public List<Section> findSectionByLessonId(int lessonId);
}

