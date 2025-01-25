package com.example.demo.controller;

import com.example.demo.model.Receipt;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import com.example.demo.service.hook_service.PaymentService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class PaymentController {
    private UserService userService;
    private PaymentService paymentService;
    @GetMapping("/my-receipts")
    public List<Receipt> getMyReceipt(HttpSession session){
        String username = (String) session.getAttribute("USERNAME");
        User user = userService.loadUserByUsername(username);
        return paymentService.findReceiptsByUserId(user.getId());
    }
}
