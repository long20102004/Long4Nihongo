package com.example.demo.model;

import com.example.demo.dto.CourseDTO;
import com.example.demo.dto.LessonDTO;
import com.example.demo.dto.TransactionDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "transactions")
public class Transaction {
    @Id
    @Column(name = "id")
    private String id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Column(name = "qr_code")
    private String qrCode;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "money")
    private int money;
    @ElementCollection
    @CollectionTable(name = "transactions_courses", joinColumns = @JoinColumn(name = "transaction_id"))
    @Column(name = "course_id")
    private List<Integer> coursesID;
    @PrePersist
    protected void onCreate(){
        createdAt = LocalDateTime.now();
    }


}
