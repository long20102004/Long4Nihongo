package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
public class AuthController {
    @Autowired
    private UserService userService;
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        User existingUser = userService.loadUserByUsername(user.getUsername());
        if (existingUser != null) {
            return ResponseEntity.badRequest().body("User already exists");
        }
        User registeredUser = userService.registerUser(user);
        return ResponseEntity.ok(registeredUser);
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user, HttpSession session) {
        User authenticatedUser = userService.authenticateUser(user.getUsername(), user.getPassword());
        if (authenticatedUser != null) {
            session.setAttribute("USERNAME", authenticatedUser.getUsername());
            return ResponseEntity.ok(authenticatedUser);
        }
        return ResponseEntity.badRequest().body("Invalid credentials");
    }

    @PostMapping("/user")
    public ResponseEntity<?> getUser(HttpSession session) {
        String username = (String) session.getAttribute("USERNAME");
        if (username != null) {
            User user = userService.loadUserByUsername(username);
            System.out.println("valid: " + user.getUsername());
            return ResponseEntity.ok(user);
        }                                           
        return ResponseEntity.badRequest().body("Not authenticated");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out successfully");
    }
}