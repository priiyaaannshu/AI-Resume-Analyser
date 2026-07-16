package com.priyanshu.resume_analyser_backend.service;
import com.priyanshu.resume_analyser_backend.jwt.JwtService;
import com.priyanshu.resume_analyser_backend.entity.User;
import com.priyanshu.resume_analyser_backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.priyanshu.resume_analyser_backend.dto.RegisterUserRequest;
import com.priyanshu.resume_analyser_backend.dto.LoginRequest;
import java.util.Optional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.priyanshu.resume_analyser_backend.dto.AuthResponse;


@Service
public class UserService {
    private final BCryptPasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    private final JwtService jwtService;


    public UserService(UserRepository userRepository,
                       BCryptPasswordEncoder passwordEncoder,
                       JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public User registerUser(RegisterUserRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        return userRepository.save(user);

    }
    public AuthResponse loginUser(LoginRequest request){

        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = optionalUser.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(token);
    }

}