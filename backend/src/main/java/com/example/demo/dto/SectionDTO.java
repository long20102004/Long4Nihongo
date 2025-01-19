package com.example.demo.dto;

import com.example.demo.model.Section;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class SectionDTO {
    private String id;
    private String name;
    private int lessonId;

    public SectionDTO(Section section) {
        this.id = section.getId();
        this.name = section.getName();
        this.lessonId = getLessonId();
    }
}
