package com.priyanshu.resume_analyser_backend.repository;

import com.priyanshu.resume_analyser_backend.entity.Resume;
import com.priyanshu.resume_analyser_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResumeRepository extends JpaRepository<Resume, Long> {

    List<Resume> findByUser(User user);

}