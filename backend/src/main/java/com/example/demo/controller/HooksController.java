package com.example.demo.controller;

import com.example.demo.model.Course;
import com.example.demo.model.Receipt;
import com.example.demo.model.Transaction;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import com.example.demo.service.data_service.CourseService;
import com.example.demo.service.hook_service.PaymentService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/hooks")
@AllArgsConstructor
public class HooksController {
    private UserService userService;
    private CourseService courseService;
    private PaymentService paymentService;

    @PostMapping("/sepay-payment")
    public ResponseEntity<?> handleSepayPaymentWebhook(@RequestBody Map<String, Object> payload) {
        String transactionCode = (String) payload.get("code");
        Integer moneyReceived = (Integer) payload.get("transferAmount");
        System.out.println(transactionCode + " " + moneyReceived);
        Transaction transaction = paymentService.findTransactionById(transactionCode);
        if (transaction == null) {
            return ResponseEntity.badRequest().body("Transaction timed out!");
        }
        Receipt receipt = new Receipt();
        User user = transaction.getUser();
        StringBuilder courseName = new StringBuilder();
        for (int courseId : transaction.getCoursesID()) {
            Course course = courseService.findById(courseId);
            courseName.append(" ").append(course.getName());
            receipt.setCourseId(courseId);
        }
        receipt.setUserId(user.getId());
        receipt.setCourseName(courseName.toString().trim());
        receipt.setUsername(user.getUsername());
        receipt.setDate(LocalDateTime.now());
        receipt.setAmountPurchased(moneyReceived);

        paymentService.saveReceipt(receipt);
        if (moneyReceived == transaction.getMoney()) {

            Set<Course> courseList = user.getCourseSet();
            List<Course> courses = new ArrayList<>();
            for (int x : transaction.getCoursesID()) {
                System.out.println(x);
                courses.add(courseService.findById(x));
            }
            courseList.addAll(courses);
            user.setCourseSet(courseList);
            userService.save(user);
            System.out.println("success transferred");
        }
        return ResponseEntity.ok("Webhook received");
    }
}

