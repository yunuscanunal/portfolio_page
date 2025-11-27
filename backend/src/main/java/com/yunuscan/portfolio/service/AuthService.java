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

    // AuthenticationManager'ı kaldırdık, manuel kontrol yapacağız.
    public AuthService(UserRepository userRepository, 
                       PasswordEncoder passwordEncoder, 
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public String login(String username, String password) {
        // 1. Kullanıcıyı Veritabanında Bul
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        // 2. Şifreyi Kontrol Et (Hash'li şifre ile gelen şifreyi kıyasla)
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Hatalı şifre");
        }

        // 3. Her şey doğruysa Token üret
        return jwtUtil.generateToken(username);
    }
}