package com.priyanshu.resume_analyser_backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.priyanshu.resume_analyser_backend.dto.Content;
import com.priyanshu.resume_analyser_backend.dto.GeminiRequest;
import com.priyanshu.resume_analyser_backend.dto.Part;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class GeminiServiceImpl implements GeminiService {

    private final RestTemplate restTemplate;

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    public GeminiServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public String analyzeResume(String resumeText) {

        String prompt = """
You are an expert ATS (Applicant Tracking System) and Technical Recruiter.

Analyze the following resume.

Return ONLY valid JSON.

Do not return markdown.
Do not use ```json.
Do not add explanation.

Return exactly in this format:

{
  "atsScore": 0,
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "skills": []
}

Resume:

""" + resumeText;

        Part part = new Part(prompt);
        Content content = new Content(List.of(part));
        GeminiRequest request = new GeminiRequest(List.of(content));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<GeminiRequest> entity = new HttpEntity<>(request, headers);

        String response = restTemplate.postForObject(
                apiUrl + "?key=" + apiKey,
                entity,
                String.class
        );

        try {

            ObjectMapper mapper = new ObjectMapper();

            JsonNode root = mapper.readTree(response);

            String json = root
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

            json = json
                    .replace("```json", "")
                    .replace("```", "")
                    .trim();

            System.out.println("========== CLEAN GEMINI RESPONSE ==========");
            System.out.println(json);
            System.out.println("===========================================");

            return json;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to parse Gemini response", e);
        }
    }
}