package com.example.demo.dto;

import com.example.demo.model.Course;
import com.example.demo.model.Lesson;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class CourseAdminDTO extends CourseDTO {
    private List<LessonAdminDTO> lessons;
    public CourseAdminDTO(Course course){
        super(course);
    }
}
