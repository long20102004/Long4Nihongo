package com.example.demo.controller;

import com.example.demo.model.JwtResponse;
import com.example.demo.model.User;
import com.example.demo.security.JwtUtility;
import com.example.demo.service.AuthService;
import com.example.demo.service.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {
    private AuthService authService;
    private JwtUtility jwtUtility;

    @Autowired
    public UserController(AuthService authService, JwtUtility jwtUtility) {
        this.authService = authService;
        this.jwtUtility = jwtUtility;
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> signIn(@RequestBody JwtResponse signInRequest) {
        return ResponseEntity.ok(authService.signIn(signInRequest));
    }

    @PostMapping("/register")
    public ResponseEntity<JwtResponse> signUp(@RequestBody JwtResponse signUpRequest) {
        return ResponseEntity.ok(authService.signUp(signUpRequest));
    }

    @GetMapping("/valid")
    public ResponseEntity<String> getProfile(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        try {
            jwtUtility.isTokenExpired(token);
        } catch (ExpiredJwtException | SignatureException e) {
            SecurityContextHolder.getContext().setAuthentication(null);
            return new ResponseEntity<>("Token is invalid", HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>("User is valid", HttpStatus.OK);
    }
}
