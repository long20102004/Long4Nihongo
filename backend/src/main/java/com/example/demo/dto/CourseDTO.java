package com.example.demo.dto;

import com.example.demo.model.Course;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class CourseDTO {
    private int id;
    private String name;
    private String authorName;
    private Date date;
    private String imageUrl;
    private Integer time;
    private Integer numberLessons;
    private Integer price;
    private boolean isSold;
    private String description;
    public CourseDTO(Course course){
        this.id = course.getId();
        this.name = course.getName();
        this.authorName = course.getAuthorName();
        this.date = course.getDate();
        this.imageUrl = course.getImageUrl();
        this.time = course.getTime();
        this.numberLessons = course.getNumberLessons();
        this.price = course.getPrice();
        this.isSold = false;
        this.description = course.getDescription();
    }
}
