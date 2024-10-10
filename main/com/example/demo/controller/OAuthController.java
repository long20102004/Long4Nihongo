package com.example.demo.controller;

import com.example.demo.service.AuthService;
import com.example.demo.service.Oauth2Service;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
@RestController
public class OAuthController {

    @Autowired
    private Oauth2Service oAuthService;

    @GetMapping("/login/oauth2/code/google")
    public void handleGoogleCallback(@RequestParam String code, HttpServletResponse response) throws IOException {
        String token = oAuthService.exchangeCodeForToken(code);
        response.sendRedirect("http://localhost:3000/login?token=" + token);
    }

    @GetMapping("/login/oauth2/code/facebook")
    public void handleFacebookCallback(@RequestParam String code, HttpServletResponse response) throws IOException {
        String token = oAuthService.exchangeCodeForToken(code);
        response.sendRedirect("http://localhost:3000/login?token=" + token);
    }

}