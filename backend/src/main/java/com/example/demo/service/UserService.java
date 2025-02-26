package com.example.demo.service;


import com.example.demo.model.Course;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {
    private UserRepository userRepository;
    private JdbcTemplate jdbcTemplate;

    public UserService(UserRepository userRepository, JdbcTemplate jdbcTemplate) {
        this.userRepository = userRepository;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), user.getAuthorities());
    }
    public User findByUserName(String username) {
        return userRepository.findByUsername(username);
    }

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public User authenticateUser(String username, String password) {
        String sql = "SELECT * FROM users WHERE username = ? AND password = ?";
        try {
            return jdbcTemplate.queryForObject(sql, new Object[]{username, password}, (rs, rowNum) -> {
                User user = new User();
                user.setId(rs.getInt("id"));
                user.setUsername(rs.getString("username"));
                user.setPassword(rs.getString("password"));
                user.setName(rs.getString("name"));
                user.setRole(rs.getString("role"));
                return user;
            });
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public Set<Course> findCourseByUsername(String username) {
        return userRepository.findCourseByUsername(username);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Integer userId) {
        return userRepository.findById(userId).get();
    }

    public void save(User user) {
        userRepository.save(user);
    }

    public void deleteById(Integer userId) {
        User user = userRepository.findById(userId).get();
        user.setIsDeleted(1);
        userRepository.save(user);
    }

    public boolean checkIfUserHasCourse(HttpSession session, int courseId) {
        String username = (String) session.getAttribute("USERNAME");
        User user = findByUserName(username);
        if (user == null) {
            return false;
        }
        for (Course course : user.getCourseSet()) {
            if (course.getId() == courseId) {
                return true;
            }
        }
        return false;
    }
}
