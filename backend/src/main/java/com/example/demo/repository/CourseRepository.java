package com.example.demo.repository;

import com.example.demo.model.Course;
import com.example.demo.model.Question;
import com.example.demo.model.User;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {
    @Query(value = "SELECT u.userSet from Course u where u.id = ?1 and u.isDeleted = 0")
    Set<User> findUsersByCourseId(int courseId);
    @Query(value = "SELECT c from Course c where c.isDeleted = 0")
    @NonNull
    public List<Course> findAll();
    @Modifying
    @Transactional
    @Query(value = "UPDATE Course u SET u.isDeleted = 1 WHERE u.id = ?1")
    public void deleteById(int courseId);
    @Query("SELECT u FROM Course u WHERE u.isDeleted = 0 AND u.id = ?1")
    public Optional<Course> findById(int id);
}
