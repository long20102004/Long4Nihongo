package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.model.*;
import com.example.demo.service.cloud_service.CloudflareR2Service;
import com.example.demo.service.data_service.FlashCardService;
import com.example.demo.service.UserService;
import com.example.demo.service.data_service.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

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
    private ObjectMapper objectMapper;
    public static final String imageBucketUrl = "https://cdn.longnihongo.com/";
    private final CloudflareR2Service cloudflareR2Service;

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
            CourseAdminDTO courseAdminDTO = new CourseAdminDTO(course);
            courseAdminDTOS.add(courseAdminDTO);
        }
        System.out.println(courseAdminDTOS.size());
        return courseAdminDTOS;
    }

    @GetMapping("/course/{courseId}")
    public CourseAdminDTO getCourseData(@PathVariable("courseId") Integer courseId) {
        Course course = courseService.findById(courseId);
        CourseAdminDTO courseAdminDTO = new CourseAdminDTO(course);
        List<Lesson> lessons = lessonService.findByCourseId(courseId);
        List<LessonDTO> lessonDTOS = new ArrayList<>();
        for (Lesson lesson : lessons) {
            LessonDTO lessonDTO = new LessonDTO(lesson);
            lessonDTOS.add(lessonDTO);
        }
        courseAdminDTO.setLessons(lessonDTOS);
        return courseAdminDTO;
    }

    @GetMapping("/lessons/{lessonId}")
    public LessonAdminDTO getLessonData(@PathVariable("lessonId") Integer lessonId) {
        List<Section> sections = sectionService.findSectionByLessonId(lessonId);
        Lesson lesson = lessonService.findById(lessonId);
        LessonAdminDTO lessonAdminDTO = new LessonAdminDTO(lesson);
        lessonAdminDTO.setSections(sections);
        return lessonAdminDTO;
    }
    @GetMapping("/sections/{sectionId}")
    public SectionDTO getSectionData(@PathVariable("sectionId") String sectionId) {
        Section section = sectionService.findById(sectionId);
        SectionDTO sectionDTO = new SectionDTO(section);
        sectionDTO.setWords(wordService.findBySectionId(section.getId()));
        sectionDTO.setFlashCards(flashCardService.findBySectionId(section.getId()));
        sectionDTO.setQuestions(questionService.findBySectionId(section.getId()));
        return sectionDTO;
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

    @PostMapping("/update-multiple-flashcard")
    public List<FlashCardDTO> addFlashCard(@RequestParam("flashcards") String flashcardJsons,
                                           @RequestParam(required = false) Map<String, MultipartFile> files) {
        try {
            // Parse JSON data into DTO list
            List<FlashCardDTO> flashCardDTOs = objectMapper.readValue(flashcardJsons, new TypeReference<List<FlashCardDTO>>() {});
            if (flashCardDTOs.isEmpty()){
                return new ArrayList<>();
            }
            String sectionId = flashCardDTOs.get(0).getSectionId();
            Section section = sectionService.findById(sectionId);
            Lesson lesson = lessonService.findById(section.getLessonId());
            Course course = lesson.getCourse();
            // Delete existing flashcards
            flashCardService.deleteAllBySectionId(sectionId);
            for (FlashCardDTO flashCardDTO : flashCardDTOs){
                if (flashCardDTO.getImgUrl() != null){
                    flashCardService.save(new FlashCard(flashCardDTO));
                }
            }
            String bucketName = "longnihongo-data";  // Ensure correct bucket name

            if (files != null) {
                files.forEach((key, file) -> {
                    if (key.startsWith("flashcard_image_")) {
                        try {
                            String fileExtension = getFileExtension(file.getOriginalFilename());
                            String newKey = "flashcard-images/" + course.getName() + "/" + lesson.getName() + "/" + section.getName() + "/" + System.currentTimeMillis() + fileExtension;
                            File tempFile = File.createTempFile("upload-", UUID.randomUUID().toString());
                            file.transferTo(tempFile);
                            String numberStr = key.substring("flashcard_image_".length());
                            int number = Integer.parseInt(numberStr);
                            String url = imageBucketUrl + newKey;
                            FlashCardDTO flashCardDto = flashCardDTOs.get(number);
                            flashCardDto.setImgUrl(url);
                            flashCardService.save(new FlashCard(flashCardDto));
                            cloudflareR2Service.uploadFile(bucketName, newKey, tempFile.getAbsolutePath());
                        } catch (IOException e) {
                            throw new RuntimeException("Error handling file upload", e);
                        }
                    }
                });
            }

            return flashCardDTOs;

        } catch (JsonProcessingException e) {
            throw new RuntimeException("Cannot parse flashcard data", e);
        }
    }

    // Helper method to extract file extension
    private String getFileExtension(String filename) {
        if (filename == null) return "";
        int index = filename.lastIndexOf('.');
        return (index > 0) ? filename.substring(index) : "";
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

    @PostMapping("/update-multiple-question")
    public List<QuestionDTO> addMultipleQuestions(@RequestBody List<QuestionDTO> questionDTOS) {
        String sectionId = questionDTOS.getFirst().getSectionId();
        questionService.deleteAllBySectionId(sectionId);
        for (QuestionDTO questionDTO : questionDTOS) {
            questionService.save(new Question(questionDTO));
        }
        return questionDTOS;
    }

    @PostMapping("/update-multiple-word")
    public List<WordDTO> addMultipleWords(@RequestBody List<WordDTO> wordDTOS) {
        String sectionId = wordDTOS.getFirst().getSectionId();
        wordService.deleteAllBySectionId(sectionId);
        for (WordDTO wordDTO : wordDTOS) {
            wordService.save(new Word(wordDTO));
        }
        return wordDTOS;
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
    public LessonDTO updateLesson(@RequestBody LessonDTO lessonDTO) {
        Lesson lesson = lessonService.findById(lessonDTO.getId());
        BeanUtils.copyProperties(lessonDTO, lesson, "id");
        lessonService.save(lesson);
        return lessonDTO;
    }

    @PostMapping("/update-section")
    public SectionDTO updateSection(@RequestBody SectionDTO sectionDTO) {
        Section section = sectionService.findById(sectionDTO.getId());
        BeanUtils.copyProperties(sectionDTO, section, "id");
        sectionService.save(section);
        return sectionDTO;
    }

    @PostMapping("/add-course/{userId}/{courseId}")
    public void addCourseToUser(@PathVariable Integer userId, @PathVariable Integer courseId) {
        User user = userService.findById(userId);
        Set<Course> currentCourses = user.getCourseSet();
        currentCourses.add(courseService.findById(courseId));
        user.setCourseSet(currentCourses);
        userService.save(user);
    }

    @DeleteMapping("/delete-course/{userId}/{courseId}")
    public void deleteCourseFromUser(@PathVariable Integer userId, @PathVariable Integer courseId) {
        User user = userService.findById(userId);
        Set<Course> currentCourses = user.getCourseSet();
        Course courseToRemove = courseService.findById(courseId);
        currentCourses.remove(courseToRemove);
        user.setCourseSet(currentCourses);
        userService.save(user);
    }

    @DeleteMapping("/delete-user/{userId}")
    public void deleteUser(@PathVariable Integer userId) {
        userService.deleteById(userId);
    }



}
