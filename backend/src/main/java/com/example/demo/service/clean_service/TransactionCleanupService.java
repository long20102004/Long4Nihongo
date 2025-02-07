package com.example.demo.service.clean_service;

import com.example.demo.model.Transaction;
import com.example.demo.repository.TransactionRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class TransactionCleanupService {
    private TransactionRepository transactionRepository;

    @Scheduled(fixedRate = 60000) // Run every minute
    public void deleteOldTransactions() {
        LocalDateTime tenMinutesAgo = LocalDateTime.now().minusMinutes(10);
        List<Transaction> oldTransactions = transactionRepository.findByCreatedAtBefore(tenMinutesAgo);
        transactionRepository.deleteAll(oldTransactions);
    }
}