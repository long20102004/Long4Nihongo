package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.joda.time.DateTime;

import java.sql.Date;
import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "receipts")
@NoArgsConstructor
public class Receipt {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "user_id")
    private int userId;
    @Column(name = "course_id")
    private int courseId;
    @Column(name = "created_at")
    private LocalDateTime date;
    @Column(name = "is_deleted")
    private int isDeleted;
    @Column(name = "username")
    private String username;
    @Column(name = "course_name")
    private String courseName;
    @Column(name = "amount_purchased")
    private int amountPurchased;

}
