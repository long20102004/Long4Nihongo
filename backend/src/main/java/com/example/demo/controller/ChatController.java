package com.example.demo.controller;

import com.example.demo.service.AIResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private AIResponseService aiResponseService;

    @PostMapping
    public String chat(@RequestBody String userMessage) {
        return aiResponseService.getAIResponse(userMessage);
    }
}
