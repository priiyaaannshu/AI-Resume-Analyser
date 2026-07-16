package com.priyanshu.resume_analyser_backend.controller;
import com.priyanshu.resume_analyser_backend.dto.LoginResponse;
import com.priyanshu.resume_analyser_backend.dto.RegisterUserRequest;
import com.priyanshu.resume_analyser_backend.entity.User;
import com.priyanshu.resume_analyser_backend.service.UserService;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import com.priyanshu.resume_analyser_backend.dto.LoginRequest;
import com.priyanshu.resume_analyser_backend.dto.AuthResponse;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User registerUser(@Valid @RequestBody RegisterUserRequest request) {
        return userService.registerUser(request);
    }

    @PostMapping("/login")
    public AuthResponse loginUser(@RequestBody LoginRequest request) {
        return userService.loginUser(request);
    }
}