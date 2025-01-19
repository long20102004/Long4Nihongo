package com.example.demo.dto;

import com.example.demo.model.Course;
import com.example.demo.model.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class UserDTO {
    private int id;
    private String name;
    private String username;
    private String password;
    private String role;
    private List<CourseDTO> courses;

    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.role = user.getRole();
        List<CourseDTO> courseDTOS = new ArrayList<>();
        Set<Course> courses = user.getCourseSet();
        for (Course course : courses){
            courseDTOS.add(new CourseDTO(course));
        }
        this.courses = courseDTOS;
    }
}
