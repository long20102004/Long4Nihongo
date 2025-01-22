package com.example.demo.service.data_service;

import com.example.demo.model.Lesson;
import com.example.demo.model.Section;
import com.example.demo.repository.LessonRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class LessonService {
    private LessonRepository lessonRepository;
    private SectionService sectionService;
    public List<Lesson> findByCourseId(int courseId) {
        return lessonRepository.findByCourseId(courseId);
    }

    public List<Lesson> findAll() {
        return lessonRepository.findAll();
    }

    public Lesson save(Lesson lesson) {
        return lessonRepository.save(lesson);
    }


    public void deleteById(int lessonId) {
        for (Section section : sectionService.findSectionByLessonId(lessonId)){
            sectionService.deleteById(section.getId());
        }
        lessonRepository.deleteById(lessonId);
    }
    public Lesson findById(int id){
        return lessonRepository.findById(id).get();
    }
}