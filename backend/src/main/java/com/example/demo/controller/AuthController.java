package com.example.demo.controller;

import com.example.demo.dto.UserDTO;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class AuthController {
    private UserService userService;
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        User existingUser = userService.findByUserName(user.getUsername());
        if (existingUser != null) {
            return ResponseEntity.badRequest().body("User already exists");
        }
        User registeredUser = userService.registerUser(user);
        return ResponseEntity.ok(registeredUser);
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDTO user, HttpSession session) {
        User authenticatedUser = userService.authenticateUser(user.getUsername(), user.getPassword());
        if (authenticatedUser != null) {
            session.setAttribute("USERNAME", authenticatedUser.getUsername());
            UserDTO userDTO = new UserDTO(authenticatedUser);
            return ResponseEntity.ok(userDTO);
        }
        return ResponseEntity.badRequest().body("Invalid credentials");
    }

    @PostMapping("/user")
    public ResponseEntity<?> getUser(HttpSession session) {
        String username = (String) session.getAttribute("USERNAME");
        if (username != null) {
            User user = userService.findByUserName(username);
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

    @PostMapping("/auth/google")
    public ResponseEntity<?> authenticate(@RequestBody Map<String, String> body) {
        String idToken = body.get("token");

        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList("your-google-client-id"))
                    .build();

            GoogleIdToken googleIdToken = verifier.verify(idToken);
            if (googleIdToken != null) {
                GoogleIdToken.Payload payload = googleIdToken.getPayload();
                String email = payload.getEmail();
                String name = (String) payload.get("name");

                // Process the user (e.g., save in the database)
                // ...

                return ResponseEntity.ok("Authentication successful");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during authentication");
        }
    }
}