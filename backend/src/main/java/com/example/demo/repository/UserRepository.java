package com.example.demo.repository;

import com.example.demo.model.Course;
import com.example.demo.model.User;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query(value = "SELECT u FROM User u where u.username = ?1 and u.isDeleted = 0")
    public User findByUsername(String username);
    @Query(value = "SELECT u.courseSet from User u where u.username = ?1 and u.isDeleted = 0")
    public Set<Course> findCourseByUsername(String username);
    @Query(value = "SELECT u from User u where u.isDeleted = 0")
    @NonNull
    public List<User> findAll();
    @Query(value = "SELECT u from User u where u.isDeleted = 0 AND u.id = ?1")
    public Optional<User> findById(Integer id);
}
