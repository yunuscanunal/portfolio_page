package com.yunuscan.portfolio.service;

import com.yunuscan.portfolio.model.User;
import com.yunuscan.portfolio.repository.UserRepository;
import com.yunuscan.portfolio.util.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, 
                       PasswordEncoder passwordEncoder, 
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public String login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Hatalı şifre");
        }
        return jwtUtil.generateToken(username);
    }
}