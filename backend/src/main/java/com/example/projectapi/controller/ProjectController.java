package com.example.projectapi.controller;

import com.example.projectapi.model.Project;
import com.example.projectapi.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import io.swagger.v3.oas.annotations.Operation;

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
    @Operation(summary = "Tüm projeleri getir", description = "Tüm projelerin listesini döner.")
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    // Yeni proje ekle
    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Operation(summary = "Yeni proje ekle", description = "Sadece admin tarafından yeni proje eklenir.")
    public ResponseEntity<?> addProject(@Valid @RequestBody Project project, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(
                bindingResult.getFieldErrors().stream()
                    .map(e -> e.getField() + ": " + e.getDefaultMessage())
                    .toArray()
            );
        }
        projectRepository.save(project);
        return ResponseEntity.ok("Proje başarıyla eklendi");
    }

    // Proje sil
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Operation(summary = "Proje sil", description = "Sadece admin tarafından proje silinir.")
    public ResponseEntity<String> deleteProject(@PathVariable Long id) {
        if (!projectRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        projectRepository.deleteById(id);
        return ResponseEntity.ok("Proje silindi");
    }

    // Proje güncelle
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Operation(summary = "Proje güncelle", description = "Sadece admin tarafından proje güncellenir.")
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
