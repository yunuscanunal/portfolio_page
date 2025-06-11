package com.example.projectapi.controller;

import com.example.projectapi.model.Project;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    // Mock list for now – ileride database'e bağlayabiliriz
    private final List<Project> projects = new ArrayList<>();

    @GetMapping
    public List<Project> getAllProjects() {
        return projects;
    }

    @PostMapping
    public ResponseEntity<String> addProject(@RequestBody Project project) {
        projects.add(project);
        System.out.println("✅ Yeni proje eklendi: " + project.getTitle());
        return ResponseEntity.ok("Proje başarıyla eklendi");
    }
}
