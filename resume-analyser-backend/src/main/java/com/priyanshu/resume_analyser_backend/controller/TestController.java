package com.priyanshu.resume_analyser_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
public class TestController {

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> root() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "AI Resume Analyser Backend API",
                "version", "1.0.0",
                "timestamp", Instant.now().toString()
        ));
    }

    @GetMapping({"/health", "/api/health"})
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "message", "Service is healthy and ready to process requests"
        ));
    }

    @GetMapping("/api/test")
    public String test() {
        return "Resume Analyser Backend is Running 🚀";
    }

    @GetMapping("/hello")
    public String hello() {
        return "JWT Authentication Working!";
    }
}