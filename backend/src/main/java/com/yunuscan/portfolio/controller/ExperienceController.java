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
    @PutMapping("/{id}")
    public ResponseEntity<Experience> updateExperience(@PathVariable Long id, @RequestBody Experience experienceDetails) {
        return experienceRepository.findById(id)
        .map(experience -> {
            experience.setCompany(experienceDetails.getCompany());
            experience.setRole(experienceDetails.getRole());
            experience.setPeriod(experienceDetails.getPeriod());
            experience.setDescription(experienceDetails.getDescription());
            experience.setTechStack(experienceDetails.getTechStack());
            return ResponseEntity.ok(experienceRepository.save(experience));
        })
        .orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExperience(@PathVariable Long id) {
        experienceRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
    
}