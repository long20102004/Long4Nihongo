package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.model.*;
import com.example.demo.service.data_service.FlashCardService;
import com.example.demo.service.UserService;
import com.example.demo.service.data_service.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor
public class AdminController {
    private UserService userService;
    private CourseService courseService;
    private LessonService lessonService;
    private SectionService sectionService;
    private WordService wordService;
    private FlashCardService flashCardService;
    private QuestionService questionService;

    @GetMapping("/users")
    public List<UserDTO> getAllUsers() {
        List<UserDTO> data = new ArrayList<>();
        List<User> users = userService.findAll();
        for (User u : users) {
            data.add(new UserDTO(u));
        }
        return data;
    }

    @GetMapping("/courses")
    public List<CourseAdminDTO> getAllCoursesAndData() {
        List<Course> courses = courseService.findAll();
        List<CourseAdminDTO> courseAdminDTOS = new ArrayList<>();
        for (Course course : courses) {
            List<Lesson> lessonList = lessonService.findByCourseId(course.getId());
            List<LessonAdminDTO> lessonAdminDTOS = new ArrayList<>();
            for (Lesson lesson : lessonList) {
                List<Section> sections = sectionService.findSectionByLessonId(lesson.getId());
                for (Section section : sections) {
                    section.setWords(wordService.findBySectionId(section.getId()));
                    section.setFlashCards(flashCardService.findBySectionId(section.getId()));
                    section.setQuestions(questionService.findBySectionId(section.getId()));
                }
                LessonAdminDTO lessonAdminDTO = new LessonAdminDTO(lesson);
                lessonAdminDTO.setSections(sections);
                lessonAdminDTOS.add(lessonAdminDTO);
            }
            CourseAdminDTO courseAdminDTO = new CourseAdminDTO(course);
            courseAdminDTO.setLessons(lessonAdminDTOS);
            courseAdminDTOS.add(courseAdminDTO);
        }
        System.out.println(courseAdminDTOS.size());
        return courseAdminDTOS;
    }

    @PostMapping("/add-course")
    public CourseDTO addCourse(@RequestBody CourseDTO courseDTO) {
        Course course = new Course(courseDTO);
        courseService.save(course);
        return courseDTO;
    }

    @PostMapping("/add-lesson")
    public LessonDTO addLesson(@RequestBody LessonDTO lessonDTO) {
        Lesson lesson = new Lesson(lessonDTO);
        Course course = courseService.findById(lessonDTO.getCourseId());
        lesson.setCourse(course);
        lessonService.save(lesson);
        return lessonDTO;
    }

    @PostMapping("/add-section")
    public SectionDTO addSection(@RequestBody SectionDTO sectionDTO) {
        Section section = new Section(sectionDTO);
        sectionService.save(section);
        return sectionDTO;
    }

    @PostMapping("/add-question")
    public QuestionDTO addQuestion(@RequestBody QuestionDTO questionDTO) {
        Question question = new Question(questionDTO);
        questionService.save(question);
        return questionDTO;
    }

    @PostMapping("/add-word")
    public WordDTO addWord(@RequestBody WordDTO wordDTO) {
        Word word = new Word(wordDTO);
        wordService.save(word);
        return wordDTO;
    }

    @PostMapping("/add-flashcard")
    public FlashCardDTO addFlashCard(@RequestBody FlashCardDTO flashCardDTO) {
        FlashCard flashCard = new FlashCard(flashCardDTO);
        flashCardService.save(flashCard);
        return flashCardDTO;
    }

    @DeleteMapping("/delete-course/{id}")
    @Transactional
    public void deleteCourse(@PathVariable int id) {
        courseService.deleteById(id);
    }

    @DeleteMapping("/delete-lesson/{id}")
    public void deleteLesson(@PathVariable int id) {
        lessonService.deleteById(id);
    }

    @DeleteMapping("/delete-section/{id}")
    public void deleteSection(@PathVariable String id) {
        sectionService.deleteById(id);
    }
    // src/main/java/com/example/demo/controller/AdminController.java

    @PutMapping("/update-flashcard/{id}")
    public FlashCardDTO updateFlashCard(@PathVariable String id, @RequestBody FlashCardDTO flashCardDTO) {
        FlashCard flashCard = flashCardService.findById(id);
        BeanUtils.copyProperties(flashCardDTO, flashCard, "id");
        flashCardService.save(flashCard);
        return flashCardDTO;
    }

    @PutMapping("/update-word/{id}")
    public WordDTO updateWord(@PathVariable String id, @RequestBody WordDTO wordDTO) {
        Word word = wordService.findById(id);
        BeanUtils.copyProperties(wordDTO, word, "id");
        wordService.save(word);
        return wordDTO;
    }

    @PutMapping("/update-question/{id}")
    public QuestionDTO updateQuestion(@PathVariable String id, @RequestBody QuestionDTO questionDTO) {
        Question question = questionService.findById(id);
        BeanUtils.copyProperties(questionDTO, question, "id");
        questionService.save(question);
        return questionDTO;
    }

    @PostMapping("/add-multiple-questions")
    public void addMultipleQuestions(@RequestBody List<QuestionDTO> questionDTOS) {
        for (QuestionDTO questionDTO : questionDTOS) {
            questionService.save(new Question(questionDTO));
        }
    }

    @DeleteMapping("/delete-word/{id}")
    public void deleteWord(@PathVariable String id) {
        wordService.deleteById(id);
    }

    @DeleteMapping("/delete-flashcard/{id}")
    public void deleteFlashCard(@PathVariable String id) {
        flashCardService.deleteById(id);
    }

    @DeleteMapping("/delete-question/{id}")
    public void deleteQuestion(@PathVariable String id) {
        questionService.deleteById(id);
    }

    @PostMapping("/update-course")
    public void updateCourse(@RequestBody CourseDTO courseDTO) {
        Course course = courseService.findById(courseDTO.getId());
        BeanUtils.copyProperties(courseDTO, course, "id");
        courseService.save(course);
    }

    @PostMapping("/update-lesson")
    public LessonDTO updateLesson( @RequestBody LessonDTO lessonDTO) {
        Lesson lesson = lessonService.findById(lessonDTO.getId());
        BeanUtils.copyProperties(lessonDTO, lesson, "id");
        lessonService.save(lesson);
        return lessonDTO;
    }

    @PostMapping("/update-section")
    public SectionDTO updateSection( @RequestBody SectionDTO sectionDTO) {
        Section section = sectionService.findById(sectionDTO.getId());
        BeanUtils.copyProperties(sectionDTO, section, "id");
        sectionService.save(section);
        return sectionDTO;
    }
}
