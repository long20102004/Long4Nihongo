package com.example.demo.dto;

import com.example.demo.model.Lesson;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LessonDTO {
    private int id;
    private String name;
    private int courseId;
    public LessonDTO(Lesson lesson) {
        this.id = lesson.getId();
        this.name = lesson.getName();
    }
}
