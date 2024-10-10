package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
@Table(name = "courses")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Course {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "author_name")
    private String authorName;
    @Column(name = "created_at")
    private Date date;
    @Column(name = "course_img_url")
    private String imageUrl;
    @Column(name = "learning_time")
    private Integer time;
    @Column(name = "number_lessons")
    private Integer numberLessons;
    @Column(name = "price")
    private Integer price;
}
