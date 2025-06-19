package com.example.projectapi.controller;

import com.example.projectapi.model.Project;
import com.example.projectapi.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    // Tüm projeleri getir
    @GetMapping
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    // Yeni proje ekle
    @PostMapping
    public ResponseEntity<?> addProject(@Valid @RequestBody Project project, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(
                bindingResult.getFieldErrors().stream()
                    .map(e -> e.getField() + ": " + e.getDefaultMessage())
                    .toArray()
            );
        }
        projectRepository.save(project);
        System.out.println("✅ Yeni proje eklendi: " + project.getTitle());
        return ResponseEntity.ok("Proje başarıyla eklendi");
    }

    // Proje sil
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable Long id) {
        if (!projectRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        projectRepository.deleteById(id);
        return ResponseEntity.ok("Proje silindi");
    }

    // Proje güncelle
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(@PathVariable Long id, @Valid @RequestBody Project updatedProject, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(
                bindingResult.getFieldErrors().stream()
                    .map(e -> e.getField() + ": " + e.getDefaultMessage())
                    .toArray()
            );
        }
        Optional<Project> optionalProject = projectRepository.findById(id);
        if (optionalProject.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Project project = optionalProject.get();
        project.setTitle(updatedProject.getTitle());
        project.setDescription(updatedProject.getDescription());
        project.setImage(updatedProject.getImage());
        project.setCodeLink(updatedProject.getCodeLink());
        project.setLiveLink(updatedProject.getLiveLink());
        projectRepository.save(project);
        return ResponseEntity.ok(project);
    }
}
