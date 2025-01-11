package com.example.demo.repository;

import com.example.demo.model.Course;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface CourseRepository extends JpaRepository<Course, Integer> {
    @Query(value = "SELECT u.userSet from Course u where u.id = ?1")
    Set<User> findUsersByCourseId(int courseId);
}
