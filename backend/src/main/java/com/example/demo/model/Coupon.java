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
@Table(name = "coupons")
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "code")
    private String code;
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;
    @Column(name = "is_expired")
    private int isExpired;
    @Column(name = "value")
    private int value;
}
