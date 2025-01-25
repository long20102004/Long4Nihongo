package com.example.demo.service.hook_service;

import com.example.demo.model.Receipt;
import com.example.demo.repository.ReceiptRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PaymentService {
    private ReceiptRepository receiptRepository;
    public List<Receipt> findReceiptsByUserId(int userId){
        return receiptRepository.findByUserId(userId);
    }
    public void deleteReceiptByReceiptId(int receiptIt){
        receiptRepository.deleteById(receiptIt);
    }
    public void saveReceipt(Receipt receipt){
        receiptRepository.save(receipt);
    }
}
