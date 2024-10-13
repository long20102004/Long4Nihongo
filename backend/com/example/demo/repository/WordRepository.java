package com.example.demo.repository;

import com.example.demo.model.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordRepository extends JpaRepository<Word, Integer> {
    @Query(value = "SELECT u from Word u where u.lessonSection.id = ?1")
    public List<Word> findAllByLessonSectionId(int sectionId);
}
