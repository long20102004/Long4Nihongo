package com.example.demo.controller;

import com.example.demo.dto.CourseDTO;
import com.example.demo.dto.FlashCardDTO;
import com.example.demo.dto.QuestionDTO;
import com.example.demo.dto.WordDTO;
import com.example.demo.model.*;
import com.example.demo.service.data_service.FlashCardService;
import com.example.demo.service.UserService;
import com.example.demo.service.data_service.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
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
        } else {
            List<Word> words = wordService.findBySectionId(sectionId);
            List<WordDTO> wordDTOList = new ArrayList<>();
            for (Word word : words) {
                wordDTOList.add(new WordDTO(word));
            }
            return wordDTOList;
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
    public List<Lesson> getLesson(@PathVariable int courseId) {
        return lessonService.findByCourseId(courseId);
    }

    @GetMapping("/lessons/{lessonId}/sections")
    public List<Section> getSection(@PathVariable int lessonId) {
        String usernamee = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println(usernamee);
        List<Section> sections = sectionService.findSectionByLessonId(lessonId);
        for (Section section : sections) {
            section.setWords(wordService.findBySectionId(section.getId()));
            section.setFlashCards(flashCardService.findBySectionId(section.getId()));
            section.setQuestions(questionService.findBySectionId(section.getId()));
        }
        return sections;
    }

}
