package com.example.demo.controller;

import com.example.demo.exception_handle.CourseInvalidException;
import com.example.demo.model.*;
import com.example.demo.repository.*;
import com.example.demo.security.JwtUtility;
import com.example.demo.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private JwtUtility jwtUtility;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    @GetMapping("/course/{courseId}")
    public Optional<Course> getCourse(@PathVariable int courseId){
        return courseRepository.findById(courseId);
    }

    @GetMapping("/courses")
    public List<CourseDTO> getAllCourse(HttpServletRequest request){
        List<Course> courses = courseRepository.findAll();
        List<CourseDTO> courseDTOList = new ArrayList<>();
        User currentUser = userService.getCurrentUser(request);
        Set<Course> boughtCourse = new HashSet<>();
        if (currentUser != null) boughtCourse = currentUser.getCourseSet();

        for (Course course : courses) {
            CourseDTO courseDTO = new CourseDTO(course);
            for (Course bought : boughtCourse){
                if (bought.getId() == course.getId()){
                    courseDTO.setSold(true);
                }
            }
            courseDTOList.add(courseDTO);
        }
        return courseDTOList;
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
    public List<Data> getSectionContent(@PathVariable int sectionId){
        List<Data> data = new ArrayList<>();
        List<FlashCard> flashCards = flashCardRepository.findAllByLessonSectionId(sectionId);
        List<Question> questions = questionRepository.findBySectionId(sectionId);
        List<Word> words = wordRepository.findAllByLessonSectionId(sectionId);
        data.addAll(flashCards);
        data.addAll(questions);
        data.addAll(words);
        return data;
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
