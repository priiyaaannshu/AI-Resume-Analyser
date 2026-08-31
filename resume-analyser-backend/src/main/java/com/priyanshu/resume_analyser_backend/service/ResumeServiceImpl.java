package com.priyanshu.resume_analyser_backend.service;

import com.priyanshu.resume_analyser_backend.entity.Resume;
import com.priyanshu.resume_analyser_backend.entity.User;
import com.priyanshu.resume_analyser_backend.repository.ResumeRepository;
import com.priyanshu.resume_analyser_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

import java.time.LocalDateTime;

@Service
public class ResumeServiceImpl implements ResumeService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    private final ResumeRepository resumeRepository;
    private final GeminiService geminiService;
    private final UserRepository userRepository;

    public ResumeServiceImpl(ResumeRepository resumeRepository,
                             UserRepository userRepository,
                             GeminiService geminiService) {

        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
        this.geminiService = geminiService;
    }

    @Override
    public String uploadResume(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new RuntimeException("Please upload a valid resume.");
        }

        String originalFileName = file.getOriginalFilename();

        if (originalFileName == null ||
                !originalFileName.toLowerCase().endsWith(".pdf")) {
            throw new RuntimeException("Only PDF files are allowed.");
        }

        try {

            Path uploadPath = Paths.get(uploadDir);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String uniqueFileName =
                    UUID.randomUUID() + "_" + originalFileName;

            Path filePath = uploadPath.resolve(uniqueFileName);

            Files.copy(
                    file.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING
            );

            PDDocument document = Loader.loadPDF(filePath.toFile());

            PDFTextStripper pdfTextStripper = new PDFTextStripper();

            String resumeText = pdfTextStripper.getText(document);

            document.close();

            String aiResponse = geminiService.analyzeResume(resumeText);

            System.out.println("========== GEMINI RESPONSE ==========");
            System.out.println(aiResponse);
            System.out.println("=====================================");

            System.out.println("========== Resume Text ==========");
            System.out.println(resumeText);
            System.out.println("=================================");

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            String email = authentication.getName();

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Resume resume = new Resume();

            resume.setFileName(uniqueFileName);
            resume.setFilePath(filePath.toString());
            resume.setUploadedAt(LocalDateTime.now());
            resume.setUser(user);

            resumeRepository.save(resume);

            return aiResponse;

        } catch (IOException e) {
            throw new RuntimeException("Failed to upload resume.");
        }
    }
}