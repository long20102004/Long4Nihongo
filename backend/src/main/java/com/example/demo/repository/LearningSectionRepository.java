package com.example.demo.repository;

import com.example.demo.model.LessonSection;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LearningSectionRepository extends JpaRepository<LessonSection, Integer> {
}
