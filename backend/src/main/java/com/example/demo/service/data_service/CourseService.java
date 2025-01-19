package com.example.demo.service.data_service;

import com.example.demo.model.Course;
import com.example.demo.model.Lesson;
import com.example.demo.model.User;
import com.example.demo.repository.CourseRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class CourseService {
    private CourseRepository courseRepository;
    private LessonService lessonService;
    public Set<User> findUsersByCourseId(int courseId) {
        return courseRepository.findUsersByCourseId(courseId);
    }

    public List<Course> findAll() {
        return courseRepository.findAll();
    }

    public Course save(Course course) {
        return courseRepository.save(course);
    }

    public void deleteById(int courseId) {
        for (Lesson lesson : lessonService.findAll()){
            lessonService.deleteById(lesson.getId());
        }
        courseRepository.deleteById(courseId);
    }
    public Course findById(int courseId){
        return courseRepository.findById(courseId).get();
    }
}