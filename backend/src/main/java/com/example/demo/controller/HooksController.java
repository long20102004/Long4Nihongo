package com.example.demo.controller;

import com.example.demo.model.Course;
import com.example.demo.model.Receipt;
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
import java.util.Map;
import java.util.Objects;
import java.util.Set;
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
        // Log the payload for debugging
        System.out.println("Received webhook: " + payload);

        // Extract the content field
        String content = (String) payload.get("content");

        // Define a regular expression to match user and course information
        Pattern pattern = Pattern.compile("([A-Za-z0-9 ]+) dang ky khoa ([A-Za-z0-9]+)");

        Matcher matcher = pattern.matcher(content);
        int userId = 0;
        int courseId = 0 ;
        if (matcher.find()) {
            userId = Integer.parseInt(matcher.group(1).trim());
            courseId = Integer.parseInt(matcher.group(2).trim());
            // Log the extracted information
            System.out.println("User ID: " + userId);
            System.out.println("Course ID: " + courseId);
        } else {
            System.out.println("Content format not recognized: " + content);
        }

        // Verify the payload (e.g., check signature, transaction status)
        Integer moneyReceived = (Integer) payload.get("transferAmount");
        Course course = courseService.findById(courseId);
        User user = userService.findById(userId);
        Receipt receipt = new Receipt();
        receipt.setCourseId(courseId);
        receipt.setUserId(userId);
        receipt.setUsername(user.getUsername());
        receipt.setCourseName(course.getName());
        receipt.setDate(LocalDateTime.now());
        receipt.setAmountPurchased(moneyReceived);
        paymentService.saveReceipt(receipt);
        if (Objects.equals(course.getPrice(), moneyReceived)){
            Set<Course> courseSet = user.getCourseSet();
            courseSet.add(course);
            user.setCourseSet(courseSet);
            userService.save(user);
        }
        // Return a 200 OK response to acknowledge the webhook
        return ResponseEntity.ok("Webhook received");
    }
}

