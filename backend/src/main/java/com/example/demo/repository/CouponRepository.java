package com.example.demo.repository;

import com.example.demo.model.Coupon;
import com.example.demo.model.Course;
import com.example.demo.model.Question;
import com.example.demo.model.User;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
@Repository
public interface CouponRepository extends JpaRepository<Coupon, Integer> {
    @Query(value = "SELECT c from Coupon c where c.isExpired = 0")
    @NonNull
    public List<Coupon> findAll();
    @Modifying
    @Transactional
    @Query(value = "UPDATE Coupon u SET u.isExpired = 1 WHERE u.id = ?1")
    public void deleteById(int courseId);
    @Query("SELECT u FROM Coupon u WHERE u.isExpired = 0 AND u.code = ?1")
    public Optional<Coupon> findByCouponCode(String code);
}
