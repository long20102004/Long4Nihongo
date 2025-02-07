package com.example.demo.service.hook_service;

import com.example.demo.dto.CouponDTO;
import com.example.demo.dto.CourseDTO;
import com.example.demo.dto.TransactionDTO;
import com.example.demo.model.*;
import com.example.demo.repository.ReceiptRepository;
import com.example.demo.repository.TransactionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class PaymentService {
    private ReceiptRepository receiptRepository;
    private TransactionRepository transactionRepository;
    public List<Receipt> findReceiptsByUserId(int userId){
        return receiptRepository.findByUserId(userId);
    }
    public void deleteReceiptByReceiptId(int receiptIt){
        receiptRepository.deleteById(receiptIt);
    }
    public void saveReceipt(Receipt receipt){
        receiptRepository.save(receipt);
    }
    public TransactionDTO handleCheckout(User user, List<CourseDTO> courseDTOS){
        int price = 0;
        for (CourseDTO courseDTO : courseDTOS){
            price += courseDTO.getPrice();
        }
        List<Integer> coursesId = new ArrayList<>();
        for (CourseDTO courseDTO : courseDTOS){
            coursesId.add(courseDTO.getId());
        }
        String transactionId = "LNG" + System.currentTimeMillis();
        String qrCodeUrl = "https://img.vietqr.io/image/970422-0981952931-qr_only.png?amount=" + price + "&addInfo=" + transactionId + "&accountName=HOANG HAI LONG";

        TransactionDTO transactionDTO = new TransactionDTO();
        transactionDTO.setUserId(user.getId());
        transactionDTO.setMoney(price);
        transactionDTO.setQrCodeUrl(qrCodeUrl);
        transactionDTO.setTransactionId(transactionId);
        transactionDTO.setCourses(courseDTOS);

        Transaction transaction = new Transaction();
        transaction.setId(transactionId);
        transaction.setMoney(price);
        transaction.setUser(user);
        transaction.setCoursesID(coursesId);
        transaction.setQrCode(qrCodeUrl);
        transaction.setCreatedAt(LocalDateTime.now());
        if (transactionRepository.findById(transactionId).isEmpty()) {
            transactionRepository.save(transaction);
        }

        return transactionDTO;
    }
    public Transaction findTransactionById(String id){
        return transactionRepository.getReferenceById(id);
    }
}
