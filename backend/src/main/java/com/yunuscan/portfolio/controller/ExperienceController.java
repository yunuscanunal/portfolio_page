package com.yunuscan.portfolio.controller;

import com.yunuscan.portfolio.model.Experience;
import com.yunuscan.portfolio.repository.ExperienceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experiences")
public class ExperienceController {

    private final ExperienceRepository experienceRepository;

    public ExperienceController(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    @GetMapping
    public List<Experience> getAllExperiences() {
        // İsterseniz burada tarihe göre sıralama (sort) yapabilirsiniz
        return experienceRepository.findAll();
    }

    @PostMapping
    public Experience addExperience(@RequestBody Experience experience) {
        return experienceRepository.save(experience);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExperience(@PathVariable Long id) {
        experienceRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}