package com.yunuscan.portfolio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @PostMapping
    public ResponseEntity<Map<String, String>> submitContact(@RequestBody ContactRequest request) {
        // TODO: Email gönderme servisi entegre et (MailGun, SendGrid, AWS SES)

        // Basit validasyon
        if (request.name() == null || request.email() == null || request.message() == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "All fields are required"));
        }

        // Log the message (Production'da email servisi kullan)
        System.out.println("Contact Form Submission:");
        System.out.println("Name: " + request.name());
        System.out.println("Email: " + request.email());
        System.out.println("Message: " + request.message());

        return ResponseEntity.ok(Map.of("message", "Thank you! Your message has been received."));
    }

    public record ContactRequest(String name, String email, String message) {
    }
}