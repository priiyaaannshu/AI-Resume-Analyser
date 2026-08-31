package com.priyanshu.resume_analyser_backend.service;

import org.springframework.web.multipart.MultipartFile;

public interface ResumeService {

    String uploadResume(MultipartFile file);

}