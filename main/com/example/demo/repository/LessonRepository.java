package com.example.demo.repository;

import com.example.demo.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Integer> {
    @Query(value = "SELECT u FROM Lesson u WHERE u.course.id = ?1")
    public List<Lesson> findByCourseId(int courseId);
}
