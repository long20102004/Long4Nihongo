package com.example.demo.controller;

import com.example.demo.dto.CourseDTO;
import com.example.demo.dto.TransactionDTO;
import com.example.demo.model.Receipt;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import com.example.demo.service.hook_service.PaymentService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
        User user = userService.findByUserName(username);
        return paymentService.findReceiptsByUserId(user.getId());
    }

//    @PostMapping("/check-coupon")
//    public String checkCoupon(HttpSession session, @RequestBody String coupon){
//
//    }
    @PostMapping("/handle-checkout")
    public TransactionDTO handleCheckout(HttpSession session, @RequestBody List<CourseDTO> courseDTOS){
        User user = userService.findByUserName((String) session.getAttribute("USERNAME"));
        return paymentService.handleCheckout(user, courseDTOS);
    }
}
