package com.example.demo.dto;

import com.example.demo.model.Lesson;
import com.example.demo.model.Section;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class LessonAdminDTO extends LessonDTO{
    private List<Section> sections;
    public LessonAdminDTO(Lesson lesson){
        super(lesson);
    }
}
