package com.priyanshu.resume_analyser_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/test")
    public String test() {
        return "Resume Analyser Backend is Running 🚀";
    }
    @GetMapping("/hello")
    public String hello() {
        return "JWT Authentication Working!";
    }
}