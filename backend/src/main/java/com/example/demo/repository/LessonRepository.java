package com.example.demo.repository;
import com.example.demo.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Integer> {
    @Query(value = "SELECT u FROM Lesson u WHERE u.course.id = ?1 and u.isDeleted = 0")
    public List<Lesson> findByCourseId(int courseId);
    @Modifying
    @Transactional
    @Query(value = "UPDATE Lesson u SET u.isDeleted = 1 WHERE u.id = ?1")
    public void deleteById(int lessonId);
    @Query("SELECT u FROM Lesson u WHERE u.isDeleted = 0 AND u.id = ?1")
    public Optional<Lesson> findById(int id);
}
