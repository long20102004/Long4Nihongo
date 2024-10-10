package com.example.demo.repository;

import com.example.demo.model.LessonSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SectionRepository extends JpaRepository<LessonSection, Integer> {
    @Query(value = "SELECT u from LessonSection u WHERE u.lesson.id = ?1")
    public List<LessonSection> findByLessonId(int lessonId);
}
