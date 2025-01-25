package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.model.*;
import com.example.demo.service.data_service.FlashCardService;
import com.example.demo.service.UserService;
import com.example.demo.service.data_service.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class CourseController {
    private CourseService courseService;
    private LessonService lessonService;
    private SectionService sectionService;
    private FlashCardService flashCardService;
    private QuestionService questionService;
    private WordService wordService;
    private UserService userService;

    @GetMapping("/course/{courseId}")
    public CourseDTO getCourse(@PathVariable int courseId) {
        Course course = courseService.findById(courseId);
        return new CourseDTO(course);
    }

    @GetMapping("/my-courses")
    public List<CourseDTO> getMyCourse(HttpSession session) {
        String username = (String) session.getAttribute("USERNAME");
        Set<Course> myCourse = userService.findCourseByUsername(username);
        List<CourseDTO> courseDTOList = new ArrayList<>();
        System.out.println("Courses of user: " + username);
        for (Course course : myCourse) {
            CourseDTO courseDTO = new CourseDTO(course);
            System.out.println("url: " + courseDTO.getImageUrl());
            courseDTOList.add(courseDTO);
            System.out.println(courseDTO.getName());
        }
        return courseDTOList;
    }

    @GetMapping("/section/{sectionId}/{type}")
    public List<?> getSection(@PathVariable String sectionId, @PathVariable String type) {
        if (type.equals("flashcards")) {
            List<FlashCard> flashCards = flashCardService.findBySectionId(sectionId);
            List<FlashCardDTO> flashCardDTOList = new ArrayList<>();
            for (FlashCard flashCard : flashCards) {
                flashCardDTOList.add(new FlashCardDTO(flashCard));
            }
            return flashCardDTOList;
        } else if (type.equals("questions")) {
            List<Question> questions = questionService.findBySectionId(sectionId);
            List<QuestionDTO> questionDTOList = new ArrayList<>();
            for (Question question : questions) {
                questionDTOList.add(new QuestionDTO(question));
            }
            return questionDTOList;
        } else if (type.equals("words")){
            List<Word> words = wordService.findBySectionId(sectionId);
            List<WordDTO> wordDTOList = new ArrayList<>();
            for (Word word : words) {
                wordDTOList.add(new WordDTO(word));
            }
            return wordDTOList;
        }
        else{
            return Collections.singletonList(sectionService.findById(sectionId).getVideoUrl());
        }
    }

    @GetMapping("/courses")
    public List<CourseDTO> getAllCourse(HttpServletRequest request) {
        List<Course> courses = courseService.findAll();
        List<CourseDTO> courseDTOList = new ArrayList<>();
        for (Course course : courses) {
            CourseDTO courseDTO = new CourseDTO(course);
            courseDTOList.add(courseDTO);
        }
        return courseDTOList;
    }

    @GetMapping("/course/{courseId}/lessons")
    public List<LessonDTO> getLessons(@PathVariable int courseId, HttpSession session) {
        boolean userHasCourse = userService.checkIfUserHasCourse(session, courseId);
        List<Lesson> lessons = lessonService.findByCourseId(courseId);
        List<LessonDTO> lessonDTOs = new ArrayList<>();
        for (Lesson lesson : lessons) {
            LessonDTO lessonDTO = new LessonDTO(lesson);
            if (!userHasCourse && lesson.getIsDemo() == 0) {
                lessonDTO.setName("Mua khóa học để xem chi tiết");
            }
            lessonDTOs.add(lessonDTO);
        }
        return lessonDTOs;
    }

    @GetMapping("/lessons/{lessonId}/sections")
    public List<SectionDTO> getSection(@PathVariable int lessonId, HttpSession session) {
        Lesson lesson = lessonService.findById(lessonId);
        boolean userHasCourse = userService.checkIfUserHasCourse(session, lesson.getCourse().getId());
        List<Section> sections = sectionService.findSectionByLessonId(lessonId);
        List<SectionDTO> sectionDTOS = new ArrayList<>();
        for (Section section : sections) {
            SectionDTO sectionDTO = new SectionDTO(section);
            if (userHasCourse || section.getIsDemo() == 1) {
                sectionDTO.setWords(wordService.findBySectionId(section.getId()));
                sectionDTO.setFlashCards(flashCardService.findBySectionId(section.getId()));
                sectionDTO.setQuestions(questionService.findBySectionId(section.getId()));
            } else {
                sectionDTO.setName("Mua khóa học để xem chi tiết");
            }
            sectionDTOS.add(sectionDTO);
        }
        return sectionDTOS;
    }
    @PostMapping("/check-course/{courseId}")
    public ResponseEntity<Boolean> checkUserCourse(@PathVariable int courseId, HttpSession session) {
        System.out.println("check has course");
        boolean userHasCourse = userService.checkIfUserHasCourse(session, courseId);
        if (!userHasCourse) return ResponseEntity.badRequest().body(false);
        return ResponseEntity.ok(true);
    }

}
