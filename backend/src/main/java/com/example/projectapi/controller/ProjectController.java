package com.example.projectapi.controller;

import com.example.projectapi.model.Project;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:3000") // React için CORS açıldı
public class ProjectController {

    @GetMapping
    public List<Project> getAllProjects() {
        return List.of(
                new Project("Portfolio Website", "Kişisel web portfolyo projesi", "https://yunuscan.dev"),
                new Project("Restaurant App", "Yemek seçme ve sipariş sistemi", "https://github.com/yunuscanunal/restaurant-app"),
                new Project("E-commerce Frontend", "Sepet, ürün filtreleme, arama vs.", "https://github.com/yunuscanunal/ecommerce-app")
        );
    }
}
