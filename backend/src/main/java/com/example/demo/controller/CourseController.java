package com.example.demo.controller;

import com.example.demo.dto.CourseDTO;
import com.example.demo.model.*;
import com.example.demo.repository.*;
import com.example.demo.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
public class CourseController {
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private LessonRepository lessonRepository;
    @Autowired
    private SectionRepository sectionRepository;
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private FlashCardRepository flashCardRepository;
    @Autowired
    private WordRepository wordRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    @GetMapping("/course/{courseId}")
    public Optional<Course> getCourse(@PathVariable int courseId) {
        return courseRepository.findById(courseId);
    }

    @GetMapping("/courses")
    public List<CourseDTO> getAllCourse(HttpServletRequest request) {
        List<Course> courses = courseRepository.findAll();
        List<CourseDTO> courseDTOList = new ArrayList<>();
        for (Course course : courses) {
            CourseDTO courseDTO = new CourseDTO(course);
            courseDTOList.add(courseDTO);
        }
        return courseDTOList;
    }


    @GetMapping("/course/{courseId}/lessons")
    public List<Lesson> getLesson(@PathVariable int courseId) {
        return lessonRepository.findByCourseId(courseId);
    }

    @GetMapping("/lessons/{lessonId}/sections")
    public List<Section> getSection(@PathVariable int lessonId) {
        List<Section> sections = sectionRepository.findSectionByLessonId(lessonId);
        for (Section section : sections) {
            section.setWords(wordRepository.findAllByLessonSectionId(section.getId()));
            section.setFlashCards(flashCardRepository.findAllByLessonSectionId(section.getId()));
            section.setQuestions(questionRepository.findBySectionId(section.getId()));
        }
        return sections;
    }

    @PostMapping("/edit/add-course")
    public void addCourse(@RequestBody Course course) {
        courseRepository.save(course);
    }

    @PostMapping("/edit/course/{courseId}/add-lesson")
    public void addLesson(@PathVariable int courseId, @RequestBody Lesson lesson) {
        Course currentCourse = courseRepository.findById(courseId).get();
        lesson.setCourse(currentCourse);
        lessonRepository.save(lesson);
    }

    @PostMapping("/edit/lesson/{lessonId}/add-section")
    public void addLesson(@PathVariable int lessonId, @RequestBody Section section) {
        section.setLessonId(lessonId);
        sectionRepository.save(section);
    }

    @PostMapping("edit/section/{sectionId}/add-flash-card")
    public void addFlashCard(@PathVariable int sectionId, @RequestBody FlashCard flashCard) {
        flashCard.setSectionId(sectionId);
        flashCardRepository.save(flashCard);
    }

    @PostMapping("edit/section/{sectionId}/add-word")
    public void addWord(@PathVariable int sectionId, @RequestBody Word word) {
        word.setSectionId(sectionId);
        wordRepository.save(word);
    }

    @PostMapping("edit/section/{sectionId}/add-question")
    public void addQuestion(@PathVariable int sectionId, @RequestBody Question question) {
        question.setSectionId(sectionId);
        questionRepository.save(question);
    }
}
