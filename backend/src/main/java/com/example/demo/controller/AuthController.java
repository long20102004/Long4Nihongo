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
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String googleClientSecret;
    @PostMapping("/register")
    @Transactional
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        System.out.println("username:" + userDTO.getUsername());
        User existingUser = userService.findByUserName(userDTO.getUsername());
        if (existingUser != null) {
            return ResponseEntity.badRequest().body("User already exists");
        }
        User user = new User(userDTO);
        User registeredUser = userService.registerUser(user);
        return ResponseEntity.ok(registeredUser);
    }
    @PostMapping("/login")
    @Transactional
    public ResponseEntity<?> loginUser(@RequestBody UserDTO user, HttpSession session) {
        User authenticatedUser = userService.authenticateUser(user.getUsername(), user.getPassword());
        System.out.println("logging in ");
        if (authenticatedUser != null) {
            // Set authentication in Spring Security context
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    authenticatedUser, null, authenticatedUser.getAuthorities()
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

//            // Store authentication in session
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
            session.setAttribute("USERNAME", authenticatedUser.getUsername());
            System.out.println("Authenticated user role: " + authenticatedUser.getRole());
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

    @PostMapping("/login/google")
    public ResponseEntity<?> authenticate(@RequestBody Map<String, String> body, HttpSession session) {
        String idToken = body.get("token");
        System.out.println("receive google login");
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken googleIdToken = verifier.verify(idToken);
            if (googleIdToken == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
            }

            GoogleIdToken.Payload payload = googleIdToken.getPayload();

            // Check token expiration
            if (payload.getExpirationTimeSeconds() < (System.currentTimeMillis() / 1000)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token expired");
            }

            String email = payload.getEmail();
            String name = (String) payload.get("name");

            // Check if user already exists
            User authenticatedUser = userService.findByUserName(email);
            if (authenticatedUser == null) {
                authenticatedUser = new User();
                authenticatedUser.setName(name);
                authenticatedUser.setUsername(email);
                authenticatedUser.setRole("USER");

                // No need to set a password for OAuth users
                userService.save(authenticatedUser);
            }

            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    authenticatedUser, null, authenticatedUser.getAuthorities()
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
            session.setAttribute("USERNAME", authenticatedUser.getUsername());
            UserDTO userDTO = new UserDTO(authenticatedUser);
            return ResponseEntity.ok(userDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during authentication");
        }
    }

}