package com.example.demo.controller;

import com.example.demo.model.Course;
import com.example.demo.model.Lesson;
import com.example.demo.model.LessonSection;
import com.example.demo.model.Question;
import com.example.demo.repository.CourseRepository;
import com.example.demo.repository.LessonRepository;
import com.example.demo.repository.QuestionRepository;
import com.example.demo.repository.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class CourseController {
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private LessonRepository lessonRepository;
    @Autowired
    private SectionRepository sectionRepository;
    @Autowired
    private QuestionRepository questionRepository;


    @GetMapping("/course/{courseId}")
    public Optional<Course> getCourse(@PathVariable int courseId){
        return courseRepository.findById(courseId);
    }
    @GetMapping("/courses")
    public List<Course> getAllCourse(){
        return courseRepository.findAll();
    }
    @GetMapping("/{courseId}/lessons")
    public List<Lesson> getLesson(@PathVariable int courseId){
        return lessonRepository.findByCourseId(courseId);
    }

    @GetMapping("/lessons/{lessonId}/sections")
    public List<LessonSection> getSection(@PathVariable int lessonId){
        return sectionRepository.findByLessonId(lessonId);
    }
    @GetMapping("/section/{sectionId}/content")
    public List<Question> getSectionContent(@PathVariable int sectionId){
        return questionRepository.findBySectionId(sectionId);
    }
}
