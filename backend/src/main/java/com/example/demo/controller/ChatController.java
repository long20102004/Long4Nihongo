package com.example.demo.controller;

import com.example.demo.service.AIResponseService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@AllArgsConstructor
public class ChatController {
    private AIResponseService aiResponseService;
    @PostMapping
    public String chat(@RequestBody String userMessage) {
        return aiResponseService.getAIResponse(userMessage);
    }
}
