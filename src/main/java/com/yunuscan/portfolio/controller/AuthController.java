package com.yunuscan.portfolio.controller;

import com.yunuscan.portfolio.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
        String token = authService.login(request.username(), request.password());
        return ResponseEntity.ok(Map.of("token", token));
    }

    // DTO (Data Transfer Object) için basit bir record kullanalım
    public record LoginRequest(String username, String password) {}
}