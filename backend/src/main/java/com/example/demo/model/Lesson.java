package com.example.demo.model;

import com.example.demo.dto.LessonDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "lessons")
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "name")
    private String name;
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;
    @Column(name = "is_deleted")
    private int isDeleted;
    public Lesson(LessonDTO lessonDTO) {
        this.name = lessonDTO.getName();
    }
}
