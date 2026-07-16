package com.priyanshu.resume_analyser_backend.repository;

import com.priyanshu.resume_analyser_backend.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}