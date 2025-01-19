package com.example.demo.model;

import com.example.demo.dto.CourseDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import java.sql.Date;
import java.util.Set;

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
    @Column(name = "description")
    private String description;
    @Getter(AccessLevel.NONE)
    @ManyToMany(mappedBy = "courseSet", cascade = CascadeType.ALL)
    private Set<User> userSet;
    @Column(name = "is_deleted")
    private int isDeleted;
    public Course(CourseDTO courseDTO) {
        this.name = courseDTO.getName();
        this.price = courseDTO.getPrice();
        this.description = courseDTO.getDescription();
        this.imageUrl = courseDTO.getImageUrl();
    }
}
