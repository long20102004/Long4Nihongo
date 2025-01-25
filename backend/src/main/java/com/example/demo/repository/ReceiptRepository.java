package com.example.demo.repository;

import com.example.demo.model.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReceiptRepository extends JpaRepository <Receipt, Integer> {
    @Query(value = "SELECT u from Receipt u where u.isDeleted = 0 AND  u.userId = ?1")
    public List<Receipt> findByUserId(int userId);
    @Query(value = "UPDATE Receipt u SET u.isDeleted = 1 WHERE u.id = ?1")
    public void deleteById(int receiptId);
}
