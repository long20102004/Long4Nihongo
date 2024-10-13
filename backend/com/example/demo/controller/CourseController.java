package com.example.demo.controller;

import com.example.demo.exception_handle.CourseInvalidException;
import com.example.demo.model.*;
import com.example.demo.repository.*;
import com.example.demo.security.JwtUtility;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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
    @Autowired
    private FlashCardRepository flashCardRepository;
    @Autowired
    private WordRepository wordRepository;
    @Autowired
    private JwtUtility jwtUtility;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/course/{courseId}")
    public Optional<Course> getCourse(@PathVariable int courseId){
        return courseRepository.findById(courseId);
    }
    @GetMapping("/courses")
    public List<Course> getAllCourse(){
        return courseRepository.findAll();
    }
    @GetMapping("/course/{courseId}/lessons")
    public List<Lesson> getLesson(@PathVariable int courseId){
        return lessonRepository.findByCourseId(courseId);
    }

    @GetMapping("/lessons/{lessonId}/sections")
    public List<LessonSection> getSection(@PathVariable int lessonId){
        return sectionRepository.findByLessonId(lessonId);
    }
    @GetMapping("/section/{sectionId}/content")
    public SectionContentResponse getSectionContent(HttpServletRequest request, @PathVariable int sectionId){
        LessonSection section = sectionRepository.findById(sectionId).get();
        Lesson lesson = sectionRepository.findLesson(sectionId);
        Course current = lessonRepository.findCourseByLessonId(lesson.getId());

        String token = request.getHeader("Authorization").substring(7);
        String currentUsername = jwtUtility.extractUserName(token);
        Set<Course> courses = userRepository.findCourseByUsername(currentUsername);
        String sectionType = section.getType();
        SectionContentResponse myResponse = new SectionContentResponse();
        myResponse.setSectionType(sectionType);
        for (Course course : courses){
            if (course.getId() == current.getId()){
                List<?> content = new ArrayList<>();
                switch (sectionType) {
                    case "question" -> content = questionRepository.findBySectionId(sectionId);
                    case "flashcard" -> content = flashCardRepository.findAllByLessonSectionId(sectionId);
                    case "content" ->content = wordRepository.findAllByLessonSectionId(sectionId);
                };
                myResponse.setContent(content);
                return myResponse;
            }
        }
        throw new CourseInvalidException("This course wasn't bought");
    }

    @PostMapping("/edit/add-course")
    public void addCourse(@RequestBody Course course){
        courseRepository.save(course);
    }
    @PostMapping("/edit/course/{courseId}/add-lesson")
    public void addLesson(@PathVariable int courseId, @RequestBody Lesson lesson){
        Course currentCourse = courseRepository.findById(courseId).get();
        lesson.setCourse(currentCourse);
        lessonRepository.save(lesson);
    }
    @PostMapping("/edit/lesson/{lessonId}/add-section")
    public void addLesson(@PathVariable int lessonId, @RequestBody LessonSection lessonSection){
        Lesson currentLesson = lessonRepository.findById(lessonId).get();
        lessonSection.setLesson(currentLesson);
        sectionRepository.save(lessonSection);
    }
    @PostMapping("edit/section/{sectionId}/add-flash-card")
    public void addFlashCard(@PathVariable int sectionId, @RequestBody FlashCard flashCard){
        LessonSection section = sectionRepository.findById(sectionId).get();
        flashCard.setLessonSection(section);
        flashCardRepository.save(flashCard);
    }
    @PostMapping("edit/section/{sectionId}/add-word")
    public void addWord(@PathVariable int sectionId, @RequestBody Word word){
        LessonSection section = sectionRepository.findById(sectionId).get();
        word.setLessonSection(section);
        wordRepository.save(word);
    }
    @PostMapping("edit/section/{sectionId}/add-question")
    public void addQuestion(@PathVariable int sectionId, @RequestBody Question question){
        LessonSection section = sectionRepository.findById(sectionId).get();
        question.setLessonSection(section);
        questionRepository.save(question);
    }
}
